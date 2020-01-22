+++
title = "3. Arborescence et Makefile"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

math=false
weight = 80
diagram = false
#markup = "mmark"

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "III. Rappels & Prérequis"
  name = "3. Arborescence et Makefile"
  weight = 30

+++

## Objectifs

- Comprendre et savoir utiliser un fichier `Makefile` (pas forcément *savoir écrire un tel fichier*)
- Préparer la structure du projet (*workflow*)

## Arborescence d'un code

Notre code commence à disposer de fichier header (`.hpp`), de fichiers source (`.cpp`) et d'un fichier source principal (contenant la fonction `main`). Les TPs que nous vous proposons forment un projet global, qui contiendra au final de nombreux fichiers.

Pour s'y retrouver parmi tous les fichiers, nous utiliserons une arborescence efficace plutôt que de tous les mettre "en vrac". Si vous avez l'habitude de programmer vous pouvez utiliser votre structure pour le code, autrement nous vous en proposons une relativement simple. Le principe est de disposer de deux dossiers :

1. `include` : contenant tous vos fichiers header (`.hpp`)
2. `src` : contenant tous vos fichiers source (`.cpp`)
3. `/` (dossier racine) contient :
  - Les fichiers sources qui disposent d'une  fonction `int main()` (comme notre `main.cpp`). Notez que notre arborescence vous autorise à compiler plus qu'un fichier binaire, ce qui est utile pour séparer les tests des différentes fonctionnalités !
  - Le fichier `Makefile` (voir après) qui dictera au compilateur comment gérer cette arborescence


### Exemple

En reprenant l'exemple précédent du Hello World, nous travaillons dans le dossier `hello`. L'arborescence devient alors la suivante :

```bash
hello/
  └── Makefile  # Fichier Makefile
  └── main.cpp # Fichier "main"
  └── include/     # Contient les fichiers header
        └── hello_world.hpp
  └── src/         # Contient les fichiers sources
        └── hello_world.cpp
```


## Makefile

Quand le projet devient important, il devient difficile de compiler tous les fichiers "à la main" comme nous l'avons fait jusque là. Une alternative est [d'utiliser un *`Makefile`*](https://en.wikipedia.org/wiki/Makefile). C'est un type de fichier utilisé par le programme `make` qui permet d'exécuter un ensemble d'actions. Il permet notamment d'automatiser la compilation des fichiers séparés, de telle sorte qu'une commande unique suffise pour ne (re)compiler que les fichiers nécessaires. Nous vous invitons à regarder les liens suivants pour vous familiariser avec les `Makefile` :

- [Developpez.com](http://gl.developpez.com/tutoriel/outil/makefile/)
- [Cours sur Makefile](http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/)
- [Manuel du logiciel `make`](https://www.gnu.org/software/make/manual/)

Il vous est demandé à partir de maintenant **d'utiliser un fichier Makefile pour compiler votre projet**, nous vous recommandons d'être familié avec leur syntaxe pour pouvoir les modifier (au moins légèrement). Pour commencer, voici un exemple de `Makefile` que vous pouvez télécharger et qui vous simplifiera la compilation du projet composé des fichiers `main.cpp`, `hello_world.cpp` et `hello_world.hpp` :

{{% div style="text-align: center" %}}
{{< button title="Téléchager le Makefile" src="https://plmlab.math.cnrs.fr/4m053/example/raw/master/Makefile" >}}
{{% /div %}}

Ce fichier est à mettre au même niveau que le reste des fichiers du projet. La compilation s'effectue maintenant avec un simple `make` dans le terminal au même niveau que les autres fichiers. On pourra faire `make clean` pour supprimer les fichiers objets et l'exécutable. Les binaires construits sont stockés dans le dossier `bin` (comme *binaries*) tandis que les objets (`.o`) le sont dans le dossier `obj` (*mais ceux là on ne les regarde jamais*).

{{% alert exercise %}}
En piste !

- Répartissez vos fichiers selon l'arborescence proposée
- Placez le `Makefile`
- Lancez `make`
- Créez un deuxième fichier source principal à la racine (*i.e.* un fichier `.cpp` contenant une fonction `main`). Pour simplifier, copier/coller `main.cpp` en `youhou.cpp` par exemple). Modifiez le `Makefile` de manière adéquate pour compiler **en plus** ce nouveau fichier (ligne `EXEC`)
- Lancez la commande `make` 
- Vérifiez que le 2ème binaire a été construit et qu'il fonctionne.

{{% /alert %}}

Cette arborescence et ce `Makefile` seront utilisés pour notre projet. La suite de cette partie permet de vous familiariser un peu plus avec le `C++`, l'algorithmique et le `Makefile`. 

