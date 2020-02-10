+++
title = "3. Input / Output"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 300
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "VIIII. Matrices Creuses"
  identifier = "io_sparse"
  name = "3. Input / Output"
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