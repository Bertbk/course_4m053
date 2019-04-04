+++
title = "Systèmes Diagonaux"

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
  name = "Systèmes Diagonaux"
  weight = 2

+++

## Objectif

Résoudre un système linéaire diagonal.

## Préparation

Comme les fonctions présentés dans ce chapitre font intervenir à la fois les matrices et les vecteurs, il semble judicieux de les placer dans des fichiers dédiés. Vous pouvez créer un fichier source et un fichier en-tête réservées aux solveurs directs, par exemple `include/direct_solvers.hpp` et `src/direct_solvers.cpp`. Cela permet de mieux compartimenter les fonctions. N'oubliez pas, alors, d'inclure les fichiers en-tête dont vous avez besoin (`Matrice.hpp` ? `Vecteur.hpp` ? ... ?)

## Problème

Nous considérons un système linéaire $AX = b$ où la matrice $A$ est diagonale. L'inverse d'une telle matrice est également diagonal et est simple à calculer. Il nous suffirait ensuite de multiplier $A^{-1}$ par $b$ pour obtenir $X$. Par exemple :
$$
A = \begin{pmatrix}
a & 0 & 0 & 0 \\\\\\
0 & b & 0 & 0 \\\\\\
0 & 0 & c & 0 \\\\\\
0 & 0 & 0 & d \\\\\\
\end{pmatrix}
,\quad
A^{-1} = \begin{pmatrix}
\frac{1}{a} & 0 & 0 & 0 \\\\\\
0 & \frac{1}{b} & 0 & 0 \\\\\\
0 & 0 & \frac{1}{c} & 0 \\\\\\
0 & 0 & 0 & \frac{1}{d} \\\\\\
\end{pmatrix}
$$

Cette méthode présente cependant plusieurs problèmes importants :

1. Stocker $A^{-1}$ signifie doubler la [quantité de mémoire nécessaire]({{<relref "dense_cost.md">}}), ce que nous refusons
2. Un produit matrice(dense)-vecteur coûte O(N²) opérations, or la matrice dispose d'une structure particulière que nous pourrions utiliser.


## Algorithme de résolution

Un calcul simple montre que la solution $X$ est donné par :
$$
X(i) = \frac{b(i)}{A(i,i)}, \quad\forall i=0,\ldots, N-1.
$$

Plutôt que d'inverser la matrice $A$, dont on a vu que ce n'était pas une bonne idée, nous proposons d'implémenter une fonction qui prend en argument $A$ et $b$ et qui fournit en retour le résultat $X = A^{-1}b$. Son pseudo code est alors le suivant :

```
Vecteur X(n);
for (int i =0; i < n; i++)
  X(i) = b(i)/A(i,i);
```

{{% alert exercise %}}
Quelle est la complexité d'un tel algorithme ?
{{% /alert %}}

{{% alert note %}}
Nous cherchons $X (= A^{-1}b)$ et non $A^{-1}$ ! C'est une nuance (très) importante et qu'il faut garder en tête tout au long des TPs !
{{% /alert %}}

## Implémentation

Implémentez une fonction qui prend en argument une `Matrice A`, **supposée diagonale**, et un `Vecteur b`. Cette fonction renvoie le résultat `X` = `A`<sup>-1</sup>`b` :

```c++
Vecteur solve_diag(const Matrice &A, const Vecteur& b);
```

{{% alert warning %}}
**Ne vérifiez surtout pas** si la matrice est bien diagonale, supposez le uniquement :

- La vérification coûte cher
- Cela serait même nuisible pour la suite
{{% /alert %}}