+++
title = "1. Préparation"

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
  parent = "IV. TPs"
  name = "1. Préparation"
  weight = 12


+++

C'est ici que commence vraiment les tps et le projet d'implémentation d'une bibliothèque. Mais avant de se lancer dans la programmation proprement dite, prenez 2 minutes pour préparer votre *workflow*.

## Arborescence & Makefile

- Créez un nouveau dossier, par exemple `tp_4m053`, dans lequel tout (absolument tout) ce qui suivra sera contenu dans ce dossier. 
- Notre projet de bibliothèque contiendra de nombreux fichiers, il est donc important de disposer d'un bon système de rangement. Pour cela, nous proposons de :
  -  Placer les fichiers header (`.hpp`) dans un dossier `include` et les fichiers source (`.cpp`) dans un dossier `src`
  -  Chaque fichier qui contient la fonction `main()` sera compilé pour fournir un binaire et sera stocké à la racine du dossier.
  -  Chaque classe disposera d'un fichier header et d'un fichier source. Par exemple pour la classe `Vecteur` :  `src/vecteur.cpp` et `include/vecteur.hpp`. Ne mélangez pas 2 classes dans un même fichier !
- Compiler toutes la bibliothèque en utilisant directemenet `g++` *à la main* serait laborieux. **À partir de maintenant**, nous utiliserons [un fichier `Makefile`](https://en.wikipedia.org/wiki/Makefile). C'est un type de fichier utilisé par le programme `make` qui permet d'exécuter un ensemble d'actions. Il permet notamment d'automatiser la compilation des fichiers séparés, de telle sorte qu'une commande unique suffise pour ne (re)compiler que les fichiers nécessaires.  Nous vous en fournissons un que vous pouvez télécharger avec le lien ci-dessous et ensuite le placer à la racine de votre dossier :

{{% div style="text-align: center" %}}
{{< button title="Téléchager le Makefile" src="https://plmlab.math.cnrs.fr/4m053/example/raw/master/Makefile" >}}
{{% /div %}}


Au final, votre arborescence ressemble à cela :

```bash
tp_4m053/
    └── Makefile        # Fichier makefile
    └── main.cpp        # Fichiers contenant "int main()"
    └── test.cpp        # Fichiers contenant "int main()"
    └── ...             
    └── include/     # Contient les fichiers header
          └── vecteur.hpp
    └── src/         # Contient les fichiers sources
          └── vecteur.cpp
```

Et la compilation de vos programmes s'effectue avec un simple `make` dans le terminal au même niveau que les autres fichiers :

```bash
make # compilation
bin/main # exécution (si le fichier compilé s'appelle main évidemment)
```


{{% alert tips %}}

Pour compiler un nouveau fichier "main", il faut modifier la ligne `EXEC = main` et ajouter, à la suite et espacé d'un "espace", le nom des fichiers (*e.g.* `EXEC = main test`). D'autres commandes sont de plus disponibles :

- `make clean` : pour supprimer les fichiers objets et l'exécutable. Les binaires construits sont stockés dans le dossier `bin` (comme *binaries*) tandis que les objets (`.o`) le sont dans le dossier `obj` (*mais ceux là on ne les regarde jamais*)
- `make debug` : pour [compiler en mode debug]({{<relref "help_debug.md">}}), les binaires ainsi compilés sont placés dans le dossier `debug`.
{{% /alert %}}

{{% alert tips %}}
Si vous utilisez Git, vous pouvez [télécharger l'exemple tout prêt](https://plmlab.math.cnrs.fr/4m053/example) proposé par nos soins (vous devrez supprimer les fichiers `main.cpp`, `src/hello.cpp` et `include/hello.hpp`) :
```bash
git clone https://plmlab.math.cnrs.fr/4m053/example.git tp_4m053
cd 4m053
git remote remove origin
```
{{% /alert %}}


## Conseils

### Éditeur de textes

Sur les machines de l'université, [Emacs](https://www.gnu.org/software/emacs/) est accessible et sera votre meilleur allié (par rapport à `gedit` par exemple ...) :

- Découpage de la fenêtre
- Indentation automatique
- ...

Sur vos machines personnelles, [Emacs](https://www.gnu.org/software/emacs/) est bien entendu installable. Si vous préférez un logiciel plus *user-friendly*, nous vous conseillons l'excellent [VS Code](https://code.visualstudio.com/) avec ses extensions, notamment pour le `C++`.


### Multipliez les exécutables


Crééez autant de fichiers "main" que vous voulez ! Évitez surtout d'avoir un programme "main" gigantesque avec de grosses portions commentées selon les cas tests ! Préférez plusieurs petits programmes réalisant de petites opérations.

{{% alert note %}}
Un exemple simple : après avoir implémenté les matrices et vecteurs, vous disposez d'un petit programme qui construit deux matrices, deux vecteurs, les affichent et vérifie aussi que les différentes opérations `+`, `-`, `*` sont valides. Le programme est testé et validé : parfait ! On le garde pour plus tard, on n'y touche plus. 

Ce programme nous servira de référence : si, plus tard, il ne fonctionne plus, on en déduira que quelque chose a été cassé entre temps...
{{% /alert %}}

### Utilisez `git` ...

... Et faites de nombreux commits (et *pushez* sur votre serveur !). N'hésitez pas à vous référez [à la section d'aide]({{< relref "help_git.md">}}).

### `Makefile`

Voici quelques liens pour vous familiariser avec les `Makefile` :

- [Developpez.com](http://gl.developpez.com/tutoriel/outil/makefile/)
- [Cours sur Makefile](http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/)
- [Manuel du logiciel `make`](https://www.gnu.org/software/make/manual/)