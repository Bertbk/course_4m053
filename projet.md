+++
title = "Projet"

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
  name = "Projet"
  weight = 12


+++

C'est ici que commence vraiment les tps et le projet d'implémentation d'une bibliothèque. 

## Préparation

Nous vous conseillons de créer un nouveau dossier, par exemple `tp_4m053` dans lequel tout (absolument tout) ce qui suivra sera contenu dans ce dossier. Si vous utilisez Git, initialisez le :
```bash
# À lancer dans le dossier à versionner !
git init
```


## Conservez l'arborescence (rappel)

- Construisez ensuite les dossiers `include` et `src` pour respectivement les fichiers *header* et les fichiers *sources* 
- Copiez le fichier `Makefile` [introduit précédemment]({{<relref "start_makefile.md">}}) pour gérer la compilation
- Chaque classe doit être déclarée et définie dans un header et un fichier source qui lui sont propres et qui seront rangés respectivement dans le dossier `include` et `src`
