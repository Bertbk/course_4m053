+++
title = "Arborescence et Makefile"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  issue = "https://github.com/Bertbk/course_4m053/issues"
  prose = "https://prose.io/#Bertbk/course_4m053/edit/master/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "first_part"
  name = "Arborescence et Makefile"
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
  └── hello.cpp # Fichier "main"
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


Il vous est demandé à partir de maintenant **d'utiliser des fichiers Makefile pour compiler vos projets**, nous vous recommandons d'être familié avec leur syntaxe pour pouvoir les modifier (au moins légèrement). Pour commencer, voici un exemple de `Makefile` présenté qui vous aidera à la compilation du projet composé des fichiers `main.cpp`, `hello_world.cpp` et `hello_world.hpp`:

```makefile
INCLDIR	:= include
OBJDIR	:= obj
SRCDIR	:= src
BINDIR	:= bin

CC      := g++
VPATH	:=
LDFLAGS :=
LIBRARY :=
CFLAGS  := -std=c++11 -Wall -I $(INCLDIR)

#Source and object files (automatic)
SRCS = $(wildcard $(SRCDIR)/*.cpp)
OBJS = $(subst $(SRCDIR)/,$(OBJDIR)/, $(subst .cpp,.o, $(SRCS)))

# Define here your main source files separated by spaces (without suffix!)
EXEC = main

#Phony = do not represent a file
#.PHONY: all
all : makedir $(EXEC)

# For multiple binaries
$(EXEC) : %: %.cpp $(OBJS)
	$(CC) $(CFLAGS) -o $(BINDIR)/$@ $^

$(OBJDIR)/%.o : $(SRCDIR)/%.cpp
	$(CC) $(CFLAGS) -c -o $@ $<

#Clean: delete every binaries and object files
.PHONY: clean
clean :
	rm -rf $(OBJDIR)/*
	rm -rf $(BINDIR)/*
#Building folders (-p : no error if folder do not exist)
.PHONY: makedir
makedir :
	mkdir -p $(BINDIR)
	mkdir -p $(OBJDIR)

#For some debug
.PHONY: print
print :
	echo $(SRCS)
	echo $(OBJS)

#Remarks:
# $@ : filename representing the target
# $< : filename of the first prerequisite
# $^ : filenames of all prerequisites, separated by spaces. Dupplicated are removed.
# $? : names of all prerequisites that are newer than the target, separated by spaces
# $+ : similar to $^ but include dupplicates
# $* : stem of target file (filename without suffix)
```


Ce fichier est à mettre au même niveau que le reste des fichiers du projet. La compilation s'effectue maintenant avec un simple `make` dans le terminal au même niveau que les autres fichiers. On pourra faire `make clean` pour supprimer les fichiers objets et l'exécutable. Les binaires construits sont stockés dans le dossier `bin` (comme *binaries*) tandis que les objets (`.o`) le sont dans le dossier `obj` (*mais ceux là on ne les regarde jamais*).

{{% alert exercise %}}
En piste !

1. Répartissez vos fichiers selon l'arborescence proposée
- Placez le `Makefile`
- Lancez `make`
- Admirez le résultat
- Créez un deuxième fichier source principal à la racine (*i.e.* un fichier `.cpp` contenant une fonction `main`). Pour simplifier, copier/coller `main.cpp` en `youhou.cpp` par exemple). Modifiez le `Makefile` de manière adéquate pour compiler **en plus** ce nouveau fichier et lancez la commande `make` (ligne `EXEC`).
- Vérifiez que le binaire a été construit et qu'il fonctionne.

{{% /alert %}}

Cette arborescence et ce `Makefile` seront utilisé pour notre projet. La suite de cette partie permet de vous familiariser un peu plus avec le `C++`, l'algorithmique et le `Makefile`. Si vous êtes à l'aise avec tout cela, vous pouvez commencer le projet. Autrement, n'hésitez pas à investir (un peu de) votre temps dans ce qui suit. N'y passer tout de même pas plus d'une séance...


## Quelques applications

### Génération de tableaux d'entiers et affichage

Avant de commencer à implémenter quelques algorithmes de tri, nous avons besoin de quelques fonctions qui nous seront utiles pour déboguer. Rappelons que ces fonctions et ce qui va suivre doit être fait en respectant la structure présentée précédemment (définitions des fonctions dans le fichier `functions.cpp`, déclarations dans `functions.hpp` et tests/applications dans `main.cpp`). Nous ne travaillerons qu'avec des tableaux dynamiques, pensez à allouer et désallouer la mémoire...

{{% alert exercise %}}
Construisez une fonction qui prend... :

- un `std::vector<int>&` et un entier `int`, qui recalibre la taille du `vector` et le remplit le tableau d'entiers générés aléatoirement.
- un `std::vector<int>&` et qui affiche le tableau d'entiers dans le terminal

On pourra utiliser la fonction [`rand()`](https://en.cppreference.com/w/cpp/numeric/random/rand) pour générer un entier aléatoirement (pensez à lire la documentation et faites attention à la graine (seed)...). De plus, nous privilégierons les méthodes [`clear()`](https://www.cplusplus.com/reference/vector/vector/clear/) et [`push_back()`](http://www.cplusplus.com/reference/vector/vector/push_back/) pour respectivement vider et remplir le `vector`.

{{% /alert %}}

### Quelques algorithmes de tri

L'objectif est de trier par ordre croissant un tableau de n entiers positifs donné en argument. Il existe plusieurs stratégies possibles, nous allons en implémenter quelques unes.

#### Tri par sélection

 Ce tri est le plus simple qu'on puisse imaginer. Il consiste à chercher le minimum en parcourant le tableau et à l'intervertir avec le premier élément du tableau. Puis on réitère en considérant le tableau des n-1 derniers éléments. On arrête l'algorithme lorsque le tableau considéré est de taille 1.

#### Tri à bulles

C'est un algorithme relativement inefficace mais qui est intéressant à implémenter. Il peut être traduit de la façon suivante : on commence par le premier élément qu'on compare à son voisin. S'il est supérieur, on les échange. Ensuite, on compare le deuxième terme avec le troisième. De même, si le second est supérieur au troisième élément, on les échange. Et ainsi de suite jusqu'à ce qu'on soit arrivé à la fin du tableau. Remarquez que l'élément le plus grand du tableau est forcément à la fin du tableau. On réitère cette stratégie en considérant le tableau des n-1 premiers éléments du tableau. L'algorithme s'arrête lorsque le tableau considéré est de taille 1.


#### Tri par insertion

Il correspond à ce que l'on fait naturellement lorsqu'on trie des cartes à jouer. Cette stratégie est efficace avec les petits tableaux mais pas les grands. Supposons les k premiers termes du tableau triés par ordre croissant. L'objectif est d'insérer le k+1 élément à la bonne place parmi les k premiers éléments, qui sont déjà triés. Pour cela, on intervertit l'élément k et k+1, puis k-1 et k, et ainsi de suite jusqu'à ce que les k+1 premiers éléments du tableau soient triées. Puis on réitère en cherchant où insérer l'élément k+2. L'algorithme commence avec k=1.

{{% alert exercise %}}
Pour chaque algorithme de tri :

- Construire une fonction qui réalise le tri en respectant la structure du projet (*a priori*, placez chaque fonction dans le même fichier)
- Vérifiez vos résultats

Pour bien comprendre les algorithmes, rien ne vous empêche de les appliquer à de petits tableaux sur une feuille de papier. Cela vous permettra de bien comprendre chaque étape.
{{% /alert  %}}
