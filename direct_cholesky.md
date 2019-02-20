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

{{% alert warning%}}
En cours de (re-)construction...
{{% /alert %}}

## Objectifs

1. Calculer la factorisation de Cholesky d'une matrice
2. Résoudre le système linéaire une fois la factorisation effectuée

## Factorisation de Cholesky

Si $A$ est symétrique définie positive, une alternative à la décomposition $LU$, qui utilise à son avantage les propriétés de $A$ est la décomposition de Cholesky :
$$
A=LL^T
$$
o\`u $L$ est une matrice triangulaire inférieure.

## Algorithme

{{% alert exercise %}}
Comme pour la factorisation LU, suivez les instructions :

1. Pour une factorisation partielle de $A$ avec $A\_{0,0}=A\_{0,0}$ et $L\_{0,0}=\ell\_{0,0}=\sqrt{A\_{0,0}}$, donnez l'expression analytique de tous les coefficients.
2. Écrire sur papier un algorithme en pseudo-code pour construire cette factorisation partielle.
3. Modifiez votre algorithme, en utilisant le théorème \ref{th:decomp_part} et en admettant que le complément de Schur est aussi symétrique définie positif, pour obtenir la factorisation complète de la matrice $A$. Pensez à utiliser la symétrique de la matrice $A$.
4. De la même manière que pour la factorisation $LU$, modifiez votre algorithme pour stocker la matrice $L$ directement dans $A$. Autrement dit, $A$ est modifiée à la suite de votre algorithme.
{{% /alert %}}

## Implémentation

{{% alert exercise %}}
C'est parti :

- Définissez la fonction suivante qui modifie la matrice $A$ en y stockant la matrice $L$ :        

```cpp
void Matrice::decomp_Cholesky();
```
- Résolvez le problème suivant avec la décomposition de Cholesky :
$$
\begin{pmatrix}
  2 & -1 & 0 & 0 &0\\\\\\
  -1 & 2 & -1 & 0 &0\\\\\\
  0 & -1 & 2 & -1 &0\\\\\\
  0 & 0 & -1 & 2 & -1 \\\\\\
  0 & 0 & 0&-1 & 2 \\\\\\
\end{pmatrix}    X=
\begin{pmatrix}
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
\end{pmatrix}.
$$
Vous devriez obtenir $X = [2.5, 4,4.5, 4,2.5]^T$. Notez que cette matrice fait partie [des matrices de test régulière]({{<relref "dense_matrices_test.md">}}). 
{{% /alert %}}
