+++
title = "TPs : préparation"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 100
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  name = "TPs : préparation"
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


```bash
Dossier/
    └── Makefile     # Fichier Makefile
    └── *.cpp        # Fichiers contenant "int main()"
    └── include/     # Contient les fichiers header
          └── *.hpp
    └── src/         # Contient les fichiers sources
          └── *.cpp
```

- Construisez ensuite les dossiers `include` et `src` pour respectivement les fichiers *header* et les fichiers *sources* 
- Copiez le fichier `Makefile` [introduit précédemment]({{<relref "start_makefile.md">}}) pour gérer la compilation
- Chaque classe doit être déclarée et définie dans un header et un fichier source qui lui sont propres et qui seront rangés respectivement dans le dossier `include` et `src`
- Chaque fichier "main" (contenant la fonction `int main()`) doit être stocké à la racine du dossier et son nom ajouté dans le Makefile (pour être compilé).

{{% alert note %}}
La compilation s'effectue maintenant et uniquement par la commande suivante :
```bash
make
```
En cas de succès, les fichiers binaires (exécutables) sont stockés dans le dossier `bin`. Pour les lancer :
```bash
bin/mon_executable
```
{{% /alert %}}

{{% alert tips %}}
Il peut être parfois bon de supprimer tous les fichiers binaires et objets :
```bash
make clean
```
{{% /alert %}}

## Multipliez les exécutables


Crééez autant de fichiers "main" que vous voulez ! Évitez surtout d'avoir un programme "main" gigantesque avec de grosses portions commentées selon les cas tests ! Préférez plusieurs petits programmes réalisant de petites opérations.

{{% alert note %}}
Un exemple simple : après avoir implémenté les matrices et vecteurs, vous disposez d'un petit programme qui construit deux matrices, deux vecteurs, les affichent et vérifie aussi que les différentes opérations `+`, `-`, `*` sont valides. Le programme est testé et validé : parfait ! On le garde pour plus tard, on n'y touche plus. 

Ce programme nous servira de référence : si, plus tard, il ne fonctionne plus, on en déduira que quelque chose a été cassé entre temps...
{{% /alert %}}