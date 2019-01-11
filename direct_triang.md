+++
title = "Matrices Triangulaires"

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
  name = "Matrices Triangulaires"
  weight = 5

+++

## Objectif

Résoudre un système linéaire triangulaire supérieur ou inférieur.

## Préparation

Comme les fonctions présentés dans ce chapitre font intervenir à la fois les matrices et les vecteurs, il semble judicieux de les placer dans des fichiers dédiés. Vous pouvez créer un fichier source et un fichier en-tête réservées aux solveurs directs, par exemple `include/direct_solvers.hpp` et `src/direct_solvers.cpp`. Cela permet de mieux compartimenter les fonctions. N'oubliez pas, alors, d'inclure les fichiers en-tête dont vous avez besoin (`Matrice.hpp` ? `Vecteur.hpp` ? ... ?)

## Problème

Nous considérons un système linéaire $AX = b$ où la matrice $A$ est triangulaire. Pour résoudre ce problème, nous n'inversons pas la matrice $A$ car cette opération est coûteuse et nous disposons d'un algorithme permettant d'obtenir le vecteur $X$ connaissant $b$ et $A$.

{{% alert note %}}
Nous cherchons $X$ et non $A^{-1}$ ! C'est une nuance (très) importante...
{{% /alert %}}

Voici la forme globale de matrices triangulaires inférieures et supérieures  :
$$
\underbrace{\begin{pmatrix}
  a & 0 & 0& 0 & 0\\\\\\
  b & c & 0& 0 & 0\\\\\\
  d & e & f& 0 & 0\\\\\\
  g & h & i& j & 0\\\\\\
  k & l & m& n & p
\end{pmatrix}}\_{\text{Triang. inf.}}\quad
\underbrace{\begin{pmatrix}
  a & b & c& d & e\\\\\\
  0 & f & g& h & i\\\\\\
  0 & 0 & j& k & l\\\\\\
  0 & 0 & 0& m & n\\\\\\
  0 & 0 & 0& 0 & p
\end{pmatrix}}\_{\text{Triang. sup.}}
$$

## Algorithme de résolution

Écrivez l'algorithme sur papier permettant de résoudre le système linéaire quand la matrice est triangulaire supérieure. En déduire l'algorithme pour une matrice triangulaire inférieure.

{{% alert warning %}}
Cet algorithme ne doit en aucun cas calculer $A^{-1}$ mais uniquement $A^{-1}b$ !
{{% /alert %}}

{{% alert note %}}
Commencez petit avec une matrice 3x3 par exemple...
{{% /alert %}}

## Implémentation

### Triangulaire inférieure

Implémenter une fonction qui prend en argument une `Matrice` triangulaire inférieure `A` et un `Vecteur` `b` et qui renvoie le résultat $\texttt{A}^{-1}\texttt{b}$ :

```c++
Vecteur solve_triang_inf(const Matrice &A, const Vecteur& b);
```
{{% alert note %}}
Ne vérifiez pas a priori si la matrice est bien triangulaire ou non. Nous supposons que l'utilisatrice ou l'utilisateur sait ce qu'elle / il fait. En réalité, une telle vérification serait nuisible pour la suite...
{{% /alert %}}


### Triangulaire supérieure

Faites de même pour une matrice triangulaire supérieure.
```c++
Vecteur solve_triang_sup(const Matrice &A, const Vecteur& b);
```

### Cas particulier d'une diagonale de 1

Afin de faciliter ce qui suivra, construisez les deux autres fonctions suivantes :
```c++
Vecteur solve_triang_inf_id(const Matrice &A, const Vecteur& b);
Vecteur solve_triang_sup_id(const Matrice &A, const Vecteur& b);
```
Ces fonctions résolvent respectivement un système linéaire triangulaire supérieur ou inférieur, comme précédemment, à la différence près **que la diagonale de la matrice `A` est supposée composée uniquement de 1**.
