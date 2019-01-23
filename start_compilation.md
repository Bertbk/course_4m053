+++
title = "Compilation : plus de détails"

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
  name = "Compilation : plus de détails"
  weight = 15


+++

## Objectifs

1. Apprendre à séparer les **définitions** des **déclarations** des fonctions
2. Prémisse de structure du projet (*workflow*)

## Séparer la déclaration et la définition

En `C++`, il est commun de séparer "physiquement" la **déclaration** des fonctions de leur **définition**. La déclaration fournit au compilateur les informations sur les arguments entrants et sortants de la fonction (*quel type ?*), tandis que la définition détaille le fonctionnement interne de la fonction (*comment ça marche ?*). En pratique, les déclarations sont stockées dans un fichier `.h` (ou `.hpp`), appelé *fichier d'en-têtes* ou *fichier header* (ou *header*), tandis que les définitions le sont dans les fichiers `.cpp`, appelés *fichiers sources*. 

Reprenons l'exemple du `Hello World` et réécrivons le dans la structure proposée. Au lieu de disposer d'un seul fichier, nous en avons maintenant trois :

1. `hello.cpp` contiendra les définitions des fonctions dont nous avons besoin
2. `hello.hpp` contiendra les déclarations des fonctions dont nous avons besoin (les *header*)
3. `main.cpp` qui contiendra le programme à exécuter

Et nous avons alors, dans l'ordre

```cpp
// fichier hello.hpp
#pragma once // voire remarque ci-dessous
void hello_world(); // Déclaration de la fonction
```
---
```cpp
// fichier hello.cpp
#include "hello.hpp"
#include <iostream> //cin et cout
// Déclaration de la fonction
void hello_world(){
  std::cout << "Hello World!";
}
```
---
```cpp
// fichier main.cpp
#include "hello.hpp"

int main(){
  hello_world(); //appel de la fonction
}
```


{{% alert note %}}
Afin d'éviter que le fichier d'en-tête soit inclus plusieurs fois à travers le projet, les fichiers d'en-tête `.hpp` commenceront systématiquement par `# pragma once`. Remarquez que cette commande [nécessite le `C++ 11`](https://stackoverflow.com/questions/10363646/compiling-c11-with-g) (ce que nous encourageons !):
```bash
g++ -std=c++11
```
{{% /alert %}}


{{% alert tips %}}
Nous pouvons utiliser des chevrons ou des guillemets pour les `#include` :
```cpp
#include <tableau.hpp> // chevrons
#include "tableau.hpp" // guillemets
```
La différence réside dans [la recherche du fichier effectuée par le compilateur](https://stackoverflow.com/questions/21593/what-is-the-difference-between-include-filename-and-include-filename) :

- Chevrons : la recherche s'effectue dans les dossiers désignés par le pré-processeur. C'est donc cela que nous utilisons pour les bibliothèques standards.
- Guillemets : le compilateur recherche d'abord dans le répertoire courant (celui du fichier appelant) puis, en cas d'échec, suit la règle de recherche des chevrons. Les guillemets sont (en général) à privilégier pour vos fichiers d'en-tête.
{{% /alert %}}

## Compilation

Compilons maintenant notre petit projet avec la commande suivante :

```bash
g++ main.cpp hello.cpp -o main -std=c++11
```

Ou alors nous pouvons générer les fichiers objets des différents fichiers source puis créer l'exécutable à partir des sources :

```bash
# Compilation de hello
g++ -c hello.cpp -o hello.o -std=c++11
# Compilation du main
g++ -c main.cpp -o main.o -std=c++11
# Édition des liens
g++ main.o hello.o -o main -std=c++11
# Lancement de l'exécutable
./main
```

{{% alert exercise %}}
En vous inspirant fortement de ce qui précère, vous devez construire une fonction qui rempli [un tableau de type `std::vector<int>`](https://fr.cppreference.com/w/cpp/container/vector) avec des nombres de 1 à n :

- Créez deux fichiers `tableau.cpp` et `tableau.hpp`
- Dans le fichier d'en-tête (header), déclarez une fonction de prototype : 
    
```cpp
void remplissage(std::vector<int> &tableau, int n);
```
Vous aurez besoin d'ajouter en haut du fichier :

```cpp
#include <vector>
```
- Définissez dans le fichier source associé. La fonction doit redéfinir la taille du tableau `tableau` à `n` et le remplir de nombres entiers[^1] de 1 à n.
- Appelez cette fonction dans le fichier `main.cpp`.
- Compilez et exécutez le programme.
- Vérifiez que ça fonctionne en affichant chaque valeur du tableau.
[^1]: utilisez de préférence les méthodes [`clear()`](www.cplusplus.com/reference/vector/vector/clear/) et [`push_back()`](http://www.cplusplus.com/reference/vector/vector/push_back/)
{{% /alert %}}
