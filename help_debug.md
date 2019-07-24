+++
title = "Debuguer avec GDB"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "help"
  name = "Debug: GDB"
  weight = 5


+++

{{% alert warning %}}
TODO: travail en cours !
{{% /alert %}}

## Contexte

La méthode "naturelle" est d'insérer des `printf` ou `cout` dans le programme afin d'afficher la valeur d'une variable en cerains endroits ou pour vérifier que le programme *passe* bien dans telle ou telle portion du code. Néanmoins, cette méthode rudimentaire montre très (très) vite ses limites et nous ne l'encourageons pas.

Nous préférons vous proposer d'utiliser le logiciel [GDB](https://fr.wikipedia.org/wiki/GNU_Debugger). Vous y trouverez ici une description succinte mais des tutoriels bien plus fournis sont disponibles en ligne, par exemple :

- [OpenClassRoom](https://openclassrooms.com/fr/courses/1140636-deboguer-son-programme-avec-gdb)
- [GDB — petit tutoriel (PDF)](http://perso.ens-lyon.fr/daniel.hirschkoff/C_Caml/docs/doc_gdb.pdf)

## Fonctionnalités

Lorsqu'il est lancé, GDB permet d'exécuter un code pas à pas, ou alors de le lancer et il s'arrêtera en cas d'erreur comme une `Segmentation Fault`. En outre, il est possible :

- D'accéder à la valeur de chaque variable en mémoire et leur adresse mémoire
- De remonter la trace (*backtrace*) de la fonction ayant causé l'erreur
- Placer des points d'arrêt (*breakpoints*) dans le programme (pour mettre en pause l'exécution)


## Compiler en mode débug

La première chose à faire est de compiler en mode débug avec l'option `-g`. Pour cela, modifier la ligne suivante du Makefile :

```makefile
CFLAGS  := -std=c++11 -Wall -I$(INCLDIR) -g
```

{{% alert warning %}}
Compiler (et exécuter) en mode débug est beaucoup plus lent qu'en mode standard ! N'utilisez cette option qu'en cas de débug.
{{% /alert %}}

## Console gdb

Une fois l'exécutable obtenu par l'option `-g`, lancer `gdb` par la commande :
```bash
gdb
```