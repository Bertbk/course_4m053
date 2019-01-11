+++
title = "Objectifs"

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
  parent = "dense"
  name = "Objectifs"
  weight = 2


+++

1. Prise en main des `class` en `C++` pour créer :
  - une classe `Vecteur` pour les vecteurs
  - une classe `Matrice` pour les matrices carrées
2. Résoudre des systèmes linéaires triangulaires supérieurs et inférieurs

Dans cette partie, le stockage des matrices sera *dense*, c'est-à-dire que chaque coefficient sera stocké en mémoire, qu'il soit nul ou pas. Le coût mémoire d'une matrice carré de taille $N$ est donc de $O(N^2)$.

## Petits conseils

- Créez un fichier `dense.cpp` à la racine pour effectuer des tests
- Modifiez le `Makefile` pour compiler le fichier `dense.cpp`
- Chaque nouvelle fonction (ou fonctionnalité) devra être **testée** et **validée**, via par exemple le fichier `dense.cpp` (libre à vous de créer plus de fichiers exécutables !)
