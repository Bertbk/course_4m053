+++
title = "1. Objectifs"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 110
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "V. Stockage Dense"
  name = "1. Objectifs"
  weight = 2


+++

Prise en main des `class` en `C++` pour créer :

1. une classe `Vecteur` pour les vecteurs
2. une classe `Matrice` pour les matrices carrées

Dans cette partie, le stockage des matrices sera *dense*, c'est-à-dire que chaque coefficient sera stocké en mémoire, qu'il soit nul ou pas. Le coût mémoire d'une matrice carré de taille $N$ est donc de $O(N^2)$.

## Petits conseils

- Créez un fichier `dense.cpp` à la racine pour effectuer des tests
- Modifiez le `Makefile` pour compiler le fichier `dense.cpp`
- Chaque nouvelle fonction (ou fonctionnalité) devra être **testée** et **validée**, via par exemple le fichier `dense.cpp` (libre à vous de créer plus de fichiers exécutables !)
