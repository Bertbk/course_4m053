+++
title = "Quelques Applications"

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
  parent = "first_part"
  name = "Quelques Applications"
  weight = 80

+++

{{% alert note %}}
Si vous êtes à l'aise avec la compilation et le C++, vous pouvez attaquer les TPs proprement dits. Autrement, n'hésitez pas à investir (un peu de) votre temps dans ce qui suit mais **n'y passez tout de même pas plus d'une séance...**
{{% /alert %}}

## Objectifs

- Implémenter quelques algorithmes de tri
- Devenir plus *à l'aide* avec le C++ et la compilation

## Génération de tableaux d'entiers et affichage

Avant de commencer à implémenter quelques algorithmes de tri, nous avons besoin de quelques fonctions qui nous seront utiles pour déboguer. Rappelons que ces fonctions et ce qui va suivre doit être fait en respectant la structure présentée précédemment (définitions des fonctions dans le fichier `functions.cpp`, déclarations dans `functions.hpp` et tests/applications dans `main.cpp`). 

{{% alert exercise %}}
Construisez deux fonctions :

1. Une première fonction prenant en argument un tableau d'entier (`std::vector<int> &`) ainsi qu'un entier (`int`). Cette fonction doit :

      - Recalibrer la taille du `std::vector` à celle de l'entier
      - Remplir le tableau d'entiers générés aléatoirement.

2. Une seconde fonction prenant uniquement un tableau d'entiers (`const std::vector<int> &`) en argument et qui affiche chaque valeur du tableau dans un terminal

{{% /alert %}}

{{% alert tips %}}
Utilisez la fonction [`rand()`](https://en.cppreference.com/w/cpp/numeric/random/rand) pour générer un entier aléatoirement (pensez à lire la documentation et faites attention à la graine (seed) !). 

De plus, nous privilégierons les méthodes suivantes :

- [`clear()`](http://www.cplusplus.com/reference/vector/vector/clear/) : vider un tableau `vector` et réduire sa taille à 0
- [`resize(int N)`](http://www.cplusplus.com/reference/vector/vector/resize/) : redéfinir la taille d'un `vector` (et éventuellement remplir les nouveaux éléments par une valeur identique)
- [`push_back()`](http://www.cplusplus.com/reference/vector/vector/push_back/) : remplir un `vector` au fur et à mesure (plus efficace que d'effectuer `v[i] =...`)
{{% /alert %}}

{{% alert note %}}
Quelques remarques :

- Nous passons les arguments de type `std::vector` **par référence** via l'esperluette `&`. Par défaut, en C++, les arguments sont passés par recopie, ce qui devient coûteux pour des tableaux
- Nous **ne passons pas** les arguments de type `int` par référence : c'est à la fois [inutile, néfaste à l'efficacité et potentiellement dangereux]({{<relref "help_cpp.md#quelques-mauvaises-habitudes">}})
- Lorque le tableau n'est pas modifié par la fonction, nous rajoutons le mot clé `const` (comme pour l'affichage du tableau)

{{% /alert %}}

## Quelques algorithmes de tri

L'objectif est de trier par ordre croissant un tableau de N entiers positifs donné en argument. Il existe plusieurs stratégies possibles et nous proposons d'en implémenter quelques unes.

{{% alert exercise %}}
Pour chaque algorithme de tri :

- Construire une fonction qui réalise le tri en respectant la structure du projet (*a priori*, placez chaque fonction dans le même fichier)
- Vérifiez vos résultats

Pour bien comprendre les algorithmes, rien ne vous empêche de les appliquer à de petits tableaux sur une feuille de papier. Cela vous permettra de bien comprendre chaque étape.
{{% /alert  %}}


### Tri par sélection

Cet algorithme est assez simple et consiste à :

- Parcourir le tableau pour en chercher le minimum
- Intervertir ce minimum avec le premier élément du tableau
- Réitèrer en considérant le sous-tableau des N-1 derniers éléments

L'algorithme s'arrête lorsque le tableau considéré est de taille 1.

### Tri à bulles

C'est un algorithme relativement inefficace mais qui est intéressant à implémenter. Il peut être traduit de la façon suivante : 

- On compare le 1er élément avec le 2e : s'il est supérieur, on les échange
- On compare le deuxième terme avec le troisième : s'il est supérieur, on les échange
- Ainsi de suite jusqu'à ce la fin du tableau
  
Après un parcours du tableau, on remarque que l'élément le plus grand se situe forcément à la fin du tableau. On réitère alor cette stratégie en considérant le tableau des N-1 premiers éléments du tableau, puis les N-2, N-3, etc. L'algorithme s'arrête lorsque le tableau considéré est de taille 1.


### Tri par insertion

Il correspond à ce que l'on fait naturellement lorsqu'on trie des cartes à jouer. Cette stratégie est efficace avec les petits tableaux mais pas les grands. Supposons les k premiers termes du tableau triés par ordre croissant. L'objectif est d'insérer le k+1 élément à la bonne place parmi les k premiers éléments, qui sont déjà triés. Pour cela, on intervertit l'élément k et k+1, puis k-1 et k, et ainsi de suite jusqu'à ce que les k+1 premiers éléments du tableau soient triées. Puis on réitère en cherchant où insérer l'élément k+2. L'algorithme commence avec k=1.
