+++
title = "Input / Output"

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
  parent = "sparse_matrices"
  identifier = "io_sparse"
  name = "I/O"
  weight = 45

+++

## Objectif

Construire une matrice creuse à partir d'un fichier


## `MatriceCOO`


Le [format de fichier proposé précédemment]({{<relref "dense_io.md">}}) est en réalité parfaitement adapté au format COO. Implémentez, pour la classe `MatriceCOO` des méthodes permettant de :
- Lire des fichiers aux formats présentés plus haut et de modifier l'objet appelant en fonction
- Sauvegarder une `MatriceCOO` sur disque au format proposé

Comme pour les matrices denses, vous pouvez aller plus loin en implémentant un constructeur qui prend en argument un nom de fichier et construit la `MatriceCOO`. Il s'utiliserait alors de la façon suivante (exemple !) :

```cpp
MatriceCOO A("laplacien_A.txt");
```