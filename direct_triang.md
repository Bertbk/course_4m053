+++
title = "Systèmes Triangulaires"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 180
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "direct_solvers"
  name = "Systèmes Triangulaires"
  weight = 5

+++

## Objectif

Résoudre un système linéaire triangulaire inférieur ou supérieur.

## Préparation

Il est judicieux de continuer à travailler dans les mêmes fichiers que [ceux utilisés pour les systèmes diagonaux]({{<relref "direct_diag.md">}}) et d'ajouter à la suite vos nouvelles fonctions.

## Problème


Voici la forme globale de matrices triangulaires inférieures et supérieures  :
$$
\underbrace{\begin{pmatrix}
  a & 0 & 0& 0 & 0\\\\\\
  b & c & 0& 0 & 0\\\\\\
  d & e & f& 0 & 0\\\\\\
  g & h & i& j & 0\\\\\\
  k & l & m& n & p
\end{pmatrix}}\_{\text{Triang. inf.}}\quad\text{et}\quad
\underbrace{\begin{pmatrix}
  a & b & c& d & e\\\\\\
  0 & f & g& h & i\\\\\\
  0 & 0 & j& k & l\\\\\\
  0 & 0 & 0& m & n\\\\\\
  0 & 0 & 0& 0 & p
\end{pmatrix}}\_{\text{Triang. sup.}}.
$$

Nous considérons un système linéaire $AX = b$ où la matrice $A$ est triangulaire. Pour résoudre ce problème, nous n'inversons pas la matrice $A$ car cette opération est coûteuse et surtout, nous pouvons obtenir un algorithme performant qui, connaissant $b$ et $A$, permet d'obtenir le vecteur $X$.

{{% alert note %}}
Rappel : Nous cherchons $X$ et non $A^{-1}$ !
{{% /alert %}}


## Algorithme de résolution

{{% alert exercise %}}
Écrivez (sur papier) l'algorithme permettant de résoudre le système linéaire quand la matrice est triangulaire inférieure. 

Par un raisonnement similaire, obtenez l'algorithme de résolution pour une matrice triangulaire supérieure.
{{% /alert %}}

{{% alert warning %}}
Rappel : Ces algorithmes ne doivent en aucun cas calculer la matrice $A^{-1}$ mais uniquement le vecteur $A^{-1}b$ !
{{% /alert %}}

{{% alert tips %}}
Pour obtenir et comprendre ces algorithmes, n'hésitez pas à travailler sur une "vraie" matrice, mais soyez humble et commencez petit avec une matrice 3x3 par exemple.
{{% /alert %}}


## Implémentation

### Triangulaire Inférieure

Implémentez une fonction qui prend en argument une `Matrice A`, **supposée triangulaire inférieure**, un `Vecteur b` et qui renvoie le résultat `X` = `A`<sup>-1</sup>`b` :

```c++
Vecteur solve_triang_inf(const Matrice &A, const Vecteur& b);
```
{{% alert warning %}}
**Ne vérifiez pas si la matrice est bien triangulaire** ou non. En plus de coûter cher, une telle vérification est inutile voire nuisible pour la suite.
{{% /alert %}}



### Triangulaire Supérieure

Pour une matrice triangulaire supérieure, programmez une fonction similaire en étant prudent(e) quant au sens de parcours de la `Matrice A` :
```c++
Vecteur solve_triang_sup(const Matrice &A, const Vecteur& b);
```

### Cas particulier : Diagonale = 1

Afin de faciliter ce qui suivra, construisez les deux autres fonctions suivantes :
```c++
Vecteur solve_triang_inf_id(const Matrice &A, const Vecteur& b);
Vecteur solve_triang_sup_id(const Matrice &A, const Vecteur& b);
```
Ces fonctions résolvent respectivement un système linéaire triangulaire inférieur et supérieur et tel **que la diagonale de la `Matrice A` est composée uniquement de 1**. Comme précédemment, nous ne vérifierons pas une telle propriété mais la supposerons vraie.
