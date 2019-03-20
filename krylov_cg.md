+++
title = "Gradient Conjugué"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  issue = "https://github.com/Bertbk/course_4m053/issues"
  prose = "https://prose.io/#Bertbk/course_4m053/edit/master/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "krylov_solvers"
  name = "Gradient Conjugué"
  weight = 10

+++

## Objectifs

- Implémenter la méthode du Gradient Conjugué
- Ajouter un éventuel préconditionneur
- Comparer les performances


## Méthode du Gradient Conjugué

### Pseudo-code

```
x_0 = 0
r_0 = b - A*x_0
p_0 = r_0
k = 0
while (|r| / |b| > tolerance && k < nmax)
  k++
  alpha_k = |r_k|²/|p_k|²
  x_{k+1} = x_k + alpha_k * p_k
  r_{k+1} = r_k - alpha_k*(A*p_k)
  beta_k  = |r_{k+1}|²/|r_k|²
  p_{k+1} = r_{k+1} + beta_k*p_k
end
return x_{k+1}
```

### Implémentation

Implémentez la méthode du Gradient Conjugué. Validez ensuite votre code la sur la [matrice du Laplacien]({{<relref "dense_matrices_test.md">}}).

### Comparaison  des performances


{{% alert exercise %}}
Pour une tolérance de 0.01 et une taille N = 1000, affichez les historiques de convergence du gradient conjugué et des autres méthodes itératives sur une même figure. Comparez également le temps CPU entre les différentes méthodes.
{{% /alert %}}

## Préconditionnement

### Principe 

Le nombre d'itérations nécessaire pour la méthode du Gradient Conjugué peut être diminué. Nous savons que la convergence de la méthode  dépendant du conditionnement de la matrice du système linéaire. Or, pour la matrice du Laplacien, ce conditionnement tend vers l'infini quand la taille $N$ du système tend également vers l'infini. Cela nous amène à étudier la notion de préconditionnement.

Prenons un système linéaire $Ax = b$. Préconditionner ce système revient à multiplier le système par une matrice $P^{-1}$ et à résoudre le système linéaire suivant:
$$
P^{-1}Ax = P^{-1}b.
$$
Le vecteur $x$ est également solution du système original. La matrice $P$ doit être choisie de telle sorte que :

1. Elle soit "facilement" inversible, au sens où le coût de calcul de $P^{-1}$ doit rester faible
2. Le conditionnement de la matrice $P^{-1}A$ soit le plus proche possible de 1 ($P^{-1}A$ doit être proche de l'identité).
3. Si l'on souhaite utiliser la méthode du Gradient Conjugué pour résoudre le nouveau système, $P^{-1}A$ soit toujours symétrique et définie positive.

Notez que le meilleur préconditionneur possible, au sens du critère 2, est bien entendu $P^{-1} = A^{-1}$, mais cela ne respecterait pas le critère 1.

### Pseudo-code

Le gradient conjugué préconditionné est modifié ainsi (`(z,r)` représente le produit scalaire en `z` et `r`)

```
x_0 = 0
r_0 = b - A*x_0
z_0 = P^{-1}*r0
p_0 = z_0
k = 0
while (|r| / |b| > tolerance && k < nmax)
  k++
  alpha_k = (r_k, zk)/(p_k, A*p_k)
  x_{k+1} = x_k + alpha_k * p_k
  r_{k+1} = r_k - alpha_k*(A*p_k)
  z_{k+1} = P^{-1}*r_{k+1}
  beta_k  = (z_{k+1}, r_{k+1})/(z_k,r_k)
  p_{k+1} = z_{k+1} + beta_k*p_k
end
return x_{k+1}
```

## Préconditionneur simple : Jacobi

Un préconditionneur très simple est celui de Jacobi, $P\_J := \text{diag}(A)$. Dans le cas d'une matrice à coefficients diagonaux identiques, comme la [matrice du Laplacien]({{<relref "dense_matrices_test.md##matrice-du-laplacien">}}), ce préconditionneur n'a aucune influence sur la convergence. 

### Matrice test

Nous proposons de travailler sur une autre matrice symétrique définie positive $H_n$, de taille $n\times n$, telle que les seuls coefficients non nuls sont donnés par :
$$
\forall i = 0,\ldots, n-1, \qquad
\left\\{
  \begin{array}{r c l l}
    H_n(i,i) &=& i+1,\\\\\\
    H_n(i,i+2) &=& 1 & \text{ si } i+2 \leq n\\\\\\
    H_n(i,i-2) &=& 1 & \text{ si } i-2 \geq 0
  \end{array}
\right.
$$

{{% alert exercise %}}
Comme pour la [matrice du Laplacien]({{<relref "dense_matrices_test.md##matrice-du-laplacien">}}), implémentez une méthode de la classe `Matrice` permettant d'obtenir la matrice $H_n$ très rapidement.
{{% /alert %}}

### Historique de convergence

Soit $b\_n$ le vecteur de taille $n$ rempli de 1, nous considérons le problème linéaire suivant
\begin{equation}
\label{eq:hnsystem}
H\_n x = b\_n,
\end{equation}
et sa version préconditionnée par Jacobi (où $P\_n = \text{diag}(H\_n)$)
\begin{equation}
\label{eq:pnhnsystem}
P\_n^{-1}H\_n x = P\_n^{-1}b\_n.
\end{equation}

{{% alert exercise %}}
Pour une tolérance de 0.01 et une taille N = 1000, résolvez les système \eqref{eq:hnsystem} ainsi que sa variante préconditionnée \eqref{eq:pnhnsystem} à l'aide des méthodes itératives standards et du gradient conjugué. 

Comparez le nombre d'itérations pour chaque méthodes et affichez, sur une même courbe, l'historique de convergence de chaque méthode.
{{% /alert %}}

{{% alert note %}}
Pour les méthodes itératives standards, vous devez calculer la matrice $P\_n^{-1}H\_n$, cependant pour le gradient conjugué, vous devez utiliser la version préconditionnée de l'algorithme.
{{% /alert %}}