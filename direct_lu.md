+++
title = "Factorisation LU"

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
  parent = "direct_solvers"
  name = "Factorisation LU"
  weight = 10

+++

## Objectifs

1. Calculer la factorisation LU d'une matrice
2. Résoudre le système linéaire une fois la factorisation effectuée
<!--3. Comparer le temps d'exécution de ces méthodes en fonction de la taille des matrices-->

## Principe

Cette méthode permet de transformer une matrice carré $A$ en un produit d'une matrice triangulaire inférieur $L$ et d'une matrice triangulaire supérieur $U$. Cette décomposition permet notamment de résoudre des problèmes d'algèbre linéaire du type
$$
AX=b \iff LUX = B
$$
où $X$ et $B$ sont les vecteurs solution et second membre respectivement. En introduisant la quantité $Y = L^{-1}B$, nous remarquons que nous avons $X = U^{-1}Y$. Ainsi, pour calculer $X$, il suffit de résoudre successivement deux systèmes linéaires triangulaires, l'un inférieur et l'autre supérieur. C'est parfait, nous venons tout juste d'implémenter ces fonctions !

## Factorisations partielle et complète

### Factorisation partielle

Notons $a\_{i,j}$ le coefficient $(i,j)$ de la matrice $A$. Nous allons tout d'abord faire une **factorisation partielle** de la matrice

\begin{equation}
  A=\begin{pmatrix}
    a\_{0,0} & A\_{0,1} \\\\\\
    A\_{1,0}  & A\_{1,1}
  \end{pmatrix} =
    \begin{pmatrix}
      1 & 0 \\\\\\
      L\_{1,0} & I
    \end{pmatrix}
    \begin{pmatrix}
      u\_{0,0} & U\_{0,1} \\\\\\
      0 & S\_{1,1}
    \end{pmatrix}
\label{eq:factorisation_partielle}
\end{equation}
où $I$ est la matrice identité, les $A\_{I,J}$ sont des sous-blocs de $A$ (notons que $A\_{0,0} = a\_{0,0}$ est un coefficient). Le bloc $S\_{1,1}=A\_{1,1}-A\_{1,0}A\_{0,0}^{-1}A\_{0,1}$ est appelé le complément de Schur.

{{% alert exercise %}}
Vérifiez que :

- $L\_{1,0} = U\_{0,0}^{-1}A\_{1,0} = A\_{1,0} / u\_{0,0}$
- $U\_{0,1} = A\_{0,1}$
- $S\_{1,1}=A\_{1,1}-A\_{1,0}A\_{0,0}^{-1}A\_{0,1} = A\_{1,1} - L\_{1,0}U\_{0,1}$
{{% /alert %}}


{{% alert note %}}
Afin d'éviter toute confusion, nous utilisons des lettres et des indices minuscules pour les coefficients (*e.g.* $a\_{i,j}$) et des lettres et indices majuscules pour les blocs (*e.g* $A\_{I,J}$).
{{% /alert %}}

{{% alert note %}}
La factorisation partielle peut aussi être opérérée par bloc :
$$
A=\begin{pmatrix}
  A\_{0,0} & A\_{0,1} \\\\\\
  A\_{1,0}  & A\_{1,1}
\end{pmatrix} =
  \begin{pmatrix}
    I & 0 \\\\\\
    L\_{1,0} & I
  \end{pmatrix}
  \begin{pmatrix}
    U\_{0,0} & U\_{0,1} \\\\\\
    0 & S\_{1,1}
  \end{pmatrix}
$$
{{% /alert %}}



### Factorisation complète

Le lien entre factorisation partielle et factorisation complète est donné par le théorème suivant :

{{% thm theorem %}}
La matrice $A$ admet une factorisation $LU$ si et seulement si le bloc $A\_{0,0}$ et le complément de Schur $S\_{1,1}$ sont eux-mêmes factorisables. La décomposition $LU$ de la matrice est déterminée par les factorisations des blocs $A\_{0,0}=L\_{0,0}U\_{0,0} (=u\_{0,0})$ et $S\_{1,1} = L\_{1,1}U\_{1,1}$ selon la formule :
$$
    \begin{pmatrix}
      A\_{0,0} & A\_{0,1} \\\\\\
      A\_{1,0}  & A\_{1,1}
    \end{pmatrix}=
     \begin{pmatrix}
       L\_{0,0} & 0 \\\\\\
       L\_{1,0} & L\_{1,1}
     \end{pmatrix}
     \begin{pmatrix}
       U\_{0,0} & U\_{0,1} \\\\\\
       0 & U\_{1,1}
     \end{pmatrix}
$$
  où $L\_{1,0}$ et $U\_{0,1}$ sont ceux de la **factorisation partielle** \eqref{eq:factorisation_partielle}.
{{% /thm %}}

Ce théorème nous dit que dès lors qu'on arrive à décomposer un bloc de la diagonale $A\_{0,0}$ sous forme $LU$, nous n'avons plus qu'à calculer $L\_{1,0}$, $U\_{0,1}$ et $S\_{1,1}$ puis on cherche la décomposition $LU$ de $S\_{1,1}$. Autrement dit, si nous disposons d'une fonction permettant de réaliser une **factorisation partielle** d'une matrice donnée, nous pouvons envisager un algorithme itératif pour obtenir la **factorisation complète** de la matrice.

## Algorithme

### Principe

Pour obtenir la factorisation complète, un algorithme itératif possible consiste à appliquer la factorisation partiellement successivement sur les compléments de Schur $S\_{k,k}$ :
$$
A = L^{(0)} U^{(0)}= \ldots = L^{(k)} U^{(k)} = \ldots = L^{(N-1)} U^{(N-1)}.
$$
où les matrices $L^{(k)}$ et $U^{(k)}$ sont obtenues à la $k^{\text{eme}}$ itération et ont la forme suivante

(warning, figure à faire TODO:)
{{< figure src="../u_l_lu2.png" >}}

### Pseudo code

```
L = 0;
U = 0;
S = A;
for k =0:N-1
  // Pivot
  pivot = S(k,k)
  // Colonne de L
  L(k,k) = 1;
  for i = k+1:N-1
    L(i,k) = S(i,k) / pivot;
  // Ligne de U
  U(k,k) = S(k,k);
  for j = k+1:N-1
    U(k,j) = S(k,j);
  // Complément de Schur
  for i = k+1:N-1
    for j = k+1:N-1
      S(i,j) = S(i,j) - L(i,k)*U(k,j);
```

### Factorisation *sur place*

Plutôt que de stocker 3 matrices `L`, `U` et `S`, on remarque que l'on peut se passer de ...:

- ... la matrice `S` en modifiant directement `U` : le bloc $U\_{k,k}$ (en "bas à droite") contiendra le complément de Schur
- ... la matrice `L` en la stockant dans `U` et en supprimant son terme diagonal (qui vaut 1 et peut donc devenir "implicite")
- ... la matrice `U` et travailler directement dans `A` 


## Implémentation en C++

{{% alert exercise %}}
Avant de coder quoi que ce soit, modifiez le **pseudo code** pour que factorisation `LU` de `A` soit effectuée **directement dans la matrice** `A`. En particulier, le pseudo-code peut alors être nettoyer de certaines opérations rendues inutiles.
{{% /alert %}}

{{% alert exercise %}}
Implémentez une méthode de la classe `Matrice` qui factorise la `Matrice` *sur place* :
```cpp
void Matrice::decomp_LU();
```
{{% /alert %}}

{{% alert warning %}}
Après application de l'algorithme, la `Matrice A` sera modifiée de telle sorte que sa partie triangulaire inférieure soit égale à $L$ (sans la diagonale unitaire), et sa partie triangulaire supérieure sera égale à $U$ (diagonale incluse). Cette méthode permet de diminuer le coût mémoire de stockage mais, attention :

- Le **produit matrice vecteur n'a alors plus de sens** une fois cet algorithme appliqué !
- Il ne faut pas ré-appliquer la factorisation LU sur A (c'est de toute façon inutile, mais une erreur arrive si vite...)


Il peut être intéressant de rajouter un paramètre à la classe `Matrice` de type `booleen` (un "flag") permettant de déterminer si une matrice a été, ou non, déjà factorisée.
{{% /alert %}}


## Validation

{{% alert exercise %}}
Validez votre factorisation $LU$ sur la matrice suivante :
$$
A = \begin{pmatrix}
  2 & -1 & 0 & 0 &0\\\\\\
  -1 & 2 & -1 & 0 &0\\\\\\
  0 & -1 & 2 & -1 &0\\\\\\
  0 & 0& -1 & 2 & -1 \\\\\\
  0 & 0& 0 &-1 & 2 \\\\\\
\end{pmatrix},
$$
dont les matrices $L$ et $U$ sont données par :
$$
\underbrace{\begin{pmatrix}
  1 & 0 & 0 & 0 &0\\\\\\
  -0.5 & 1 & 0 & 0 &0\\\\\\
  0 & -\frac{2}{3} & 1 & 0 &0\\\\\\
  0 & 0 & -0.75 & 1 & 0 \\\\\\
  0 & 0 & 0 &-0.8 & 1 
\end{pmatrix}}\_{L}
\underbrace{\begin{pmatrix}
  2 & -1 & 0 & 0 &0\\\\\\
  0 & 1.5 & -1 & 0 &0\\\\\\
  0 & 0 & \frac{4}{3} & -1 &0\\\\\\
  0 & 0& 0 & 1.25 & -1 \\\\\\
  0 & 0& 0 &0 & 1.2 \\\\\\
\end{pmatrix}}\_{U}
$$
Notez que cette matrice fait partie [des matrices de test régulières]({{<relref "dense_matrices_test.md">}}).
{{% /alert %}}

{{% alert exercise %}}
Résolvez numériquement le problème suivant à l'aide de la factorisation LU :
$$
A X= b,
$$
où $A$ est la matrice de l'exercice précédent et $b = [1,1,1,1,1]^T$. La solution du problème est $X = [2.5, 4,4.5, 4,2.5]^T$.
{{% /alert %}}
