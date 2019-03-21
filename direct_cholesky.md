+++
title = "Factorisation de Cholesky"

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
  name = "Factorisation de Cholesky"
  weight = 20

+++

## Objectifs

1. Calculer la factorisation de Cholesky d'une matrice symétrique définie positive
2. Résoudre le système linéaire une fois la factorisation effectuée

## Factorisation de Cholesky

Si $A$ est symétrique définie positive, une alternative à la décomposition $LU$, qui utilise à son avantage les propriétés de $A$ est la décomposition de Cholesky :
$$
A=LL^T,
$$
où $L$ est une matrice triangulaire inférieure. Contrairement à la $LU$, la diagonale de la matrice $L$ n'est pas *a priori* composée uniquement de 1 et, de plus, nous avons $\text{diag}(L)=\text{diag}(U)$.

## Pseudo-code

Une version naïve est la suivante. Elle peut être améliorée car certains calculs sont doublées et rendu inutiles du fait que le complément de Schur est lui aussi symétrique et défini positif.

```
L = 0;
Lt = 0;
S = A;
for k =0:N-1
  // Pivot
  pivot = sqrt(S(k,k))
  // Colonne de L
  L(k,k) = pivot;
  for i = k+1:N-1
    L(i,k) = S(i,k) / pivot;
  // Ligne de Lt
  Lt(k,k) = L(k,k);
  for j = k+1:N-1
    Lt(k,j) = L(j,k);
  // Complément de Schur
  for i = k+1:N-1
    for j = k+1:N-1
      S(i,j) = S(i,j) - L(i,k)*Lt(k,j);
```


{{% alert exercise %}}
Comme pour la factorisation LU, modifiez le pseudo code pour que la factorisation soit effectuée **directement dans la matrice A**, sans avoir à introduire de matrices `L`, `Lt` et `S`.

**Simplifiez** ensuite le pseudo-code en **supprimant les opérations inutiles** et en réduisant éventuellement la longueur de **certaines boucles**. 
{{% /alert %}}


{{% alert note %}}
La factorisation peut être améliorée en **ne stockant que $L$**. L'opération $(L^T)^{-1}y$ intervenant lors de la résolution peut être effectuée avec une fonction résolvant un système linéaire triangulaire supérieure adaptée, c'est-à-dire prenant en argument $L^T$ mais **ne transposant jamais explicitement la matrice**, car trop coûteux !
{{% /alert %}}

## Implémentation

Définissez la fonction suivante qui modifie la matrice $A$ en y stockant les matrices $L$ et $L^T$ (la diagonale étant la même pour les deux) :

```cpp
void Matrice::decomp_Cholesky();
```


## Validation

Pour la matrice $A$ suivante :
$$
A =\begin{pmatrix}
  2 & -1 & 0 & 0 &0\\\\\\
  -1 & 2 & -1 & 0 &0\\\\\\
  0 & -1 & 2 & -1 &0\\\\\\
  0 & 0 & -1 & 2 & -1 \\\\\\
  0 & 0 & 0&-1 & 2 \\\\\\
\end{pmatrix}
$$
La matrice $L$ de la décomposition de Cholesky est donnée par :
$$
L = \begin{pmatrix}
1.4142 &  0  & 0.& 0. & 0\\\\\\
-0.7071&   1.2247 &  0&  0 &  0\\\\\\
0 & -0.8165 &  1.1547 &  0 &  0\\\\\\
0 &  0 & -0.8660 &  1.1180 &  0\\\\\\
0 &  0 &  0 & -0.8944 &  1.0954
\end{pmatrix}
$$

{{% alert exercise %}}
Validez votre décomposition sur la matrice $A$ puis résolvez le problème suivant
$$
A X = b,
$$
avec $b=[1,1,1,1,1]^T$. Vous devriez obtenir le vecteur solution $X = [2.5, 4,4.5, 4,2.5]^T$. Notez que cette matrice fait partie [des matrices de test régulière]({{<relref "dense_matrices_test.md">}}). 
{{% /alert %}}

