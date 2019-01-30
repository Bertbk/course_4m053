+++
title = "Vecteurs"

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
  name = "Vecteurs"
  weight = 10

+++


## Objectif

Implémenter une classe `Vecteur` pour manipuler des vecteurs.

{{% alert warning %}}
N'oubliez pas de **tester** et **valider** chaque nouvelle fonctionnalité à travers, par exemple, votre fichier `dense.cpp`.
{{% /alert %}}

## Fichiers

La déclaration de la classe et de toute fonction associée aux vecteurs se fera dans `include/vecteur.hpp` et la définition des fonctions et méthodes dans `src/vecteur.cpp`. Vous êtes bien entendu libre de choisir un autre nom de fichier que `vecteur.*` mais vous devez respecter l'emplacement de ces fichiers.

## Stockage

Informatiquement, un vecteur est stocké sous la forme d'un tableau de nombres. La classe `Vecteur` qui représentera un tel vecteur possèdera comme données privées (au moins) :
 
- `int N_` : Le nombre d'éléments (= la dimension)
- `std::vector<double> coef_` : Les coefficients, stockés dans un tableau à une dimension de la bibliothèque standard

Notre fichier d'en-tête ressemble donc à

```cpp
// Fichier include/vecteur.hpp
#pragma once
#include<vector> // pour les std::vector

class Vecteur{
private:
  int N_;
  std::vector<double> coef_;
public: 
  // Les méthodes et constructeurs  à venir
  // ...
};
```

{{% alert note %}}
[Rappel sur le choix de `N_`]({{< relref "help_cpp.md#nom-des-paramètres" >}}) ( et non `N` ou `_N`)
{{% /alert %}}

## Constructeurs et destructeur

Notre classe comporte (au moins) les trois constructeurs suivants         
```c++
Vecteur (); // constructeur vide
Vecteur (int N); // constructeur créant un vecteur de taille N et rempli de zéros
Vecteur (const Vecteur &v); // constructeur par recopie
```
ainsi qu'un destructeur par défaut :
```cpp
~Vecteur()=default; // destructeur par défaut
```
Le fichier d'en-tête est alors modifié ainsi

```cpp
// Fichier include/vecteur.hpp
#pragma once
#include<vector> // pour les std::vector

class Vecteur{
private:
  int N_;
  std::vector<double> coef_;
public: 
  Vecteur (); // constructeur vide
  Vecteur (int N); // constructeur créant un vecteur de taille N et rempli de zéros
  Vecteur (const Vecteur &v); // constructeur par recopie
  ~Vecteur()=default; // destructeur par défaut
};
```

{{% alert exercise %}}
Implémentez la **définition** des constructeurs dans le fichier `src/vecteur.cpp`. Ce fichier ressemble à ceci
```c++
#include "vecteur.hpp"
#include <vector>

Vecteur::Vecteur(){
  //Constructeur vide
}

Vecteur::Vecteur(int N){
  //Constructeur du vecteur nul de taille N
}

Vecteur::Vecteur(const Vecteur &v){
  //Constructeur par recopie
}

```
{{% /alert %}}

## Quelques méthodes

{{% alert tips %}}
[Un très bon site](https://isocpp.org/wiki/faq/const-correctness) pour mieux comprendre l'utilisation du mot clé `const`.
{{% /alert %}}

Voici une liste de méthodes qui nous seront utiles

- Méthode constante qui renvoie la taille du `Vecteur`
- Méthode constante qui affiche le `Vecteur` (ses coefficients et/ou toute autre info utile) dans le terminal
- Accesseurs :

```c++
double & operator() (int i);      // Accès à la référence
double operator() (int i) const; // Accès à la valeur (recopie)
```
Le premier permet d'accéder au coefficient de la matrice par référence (permettant une modification ultérieure) tandis que le second ne fait que renvoyer (une copie de) la valeur du coefficient.

{{% alert exercise %}}
C'est parti :

1. Ajoutez leurs déclarations dans la classe (dans le fichier header)
2. Implémentez leurs définitions (dans le fichier source)
{{% /alert %}}

{{% alert tips %}}
À partir de maintenant, vous ne devriez plus jamais accéder aux coefficients via `coef_` mais uniquement via les accesseurs ! Par exemple `v(i) = ...`
{{% /alert %}}

## Opérations élémentaires

[En surchargeant les opérateurs](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1897891-surchargez-un-operateur), ajoutez les opérations élémentaires suivantes :

1. d'addition entre deux vecteurs en surchargeant l'opérateur `+`
2. de soustraction avec l'opérateur `-`

Nous avons plusieurs possibilités pour de tels opérateurs :

- Comme méthode de classe : 

```cpp
Vecteur operator+(const Vecteur &w) const; //Dans la classe Vecteur
```

- Comme méthode de classe binaire avec le mot clé `friend ` :

```cpp
friend Vecteur operator+(const Vecteur &v, const Vecteur &w); //Dans la classe Vecteur avec friend
```

- En dehors de la classe : 

```cpp
Vecteur operator+(const Vecteur &v, const Vecteur &w); //En dehors de la classe Vecteur
```
        

Les deux dernières options présentent l'avantage de clairement exposer les deux arguments de l'opération (*opération binaire*), contrairement à la méthode où le premier `Vecteur` est implicite (*opération unaire*).

{{% alert note %}}
La commande `const Vecteur &v` permet d'envoyer le `Vecteur` `v` par référence (plutôt que par copie), le mot clé `const` nous garanti qu'il ne sera pas modifié par la fonction appelante.
{{% /alert %}}

## Multiplication par un scalaire

Cela se fait en construisant un `operator*`. Vous pouvez définir une méthode, par exemple `void ScalarMult(double alpha);` mais cela peut s'avérer peu pratique. Le mieux (au sens mathématiques) est de définir un `operator*` afin d'écrire directement `alpha*v` dans votre code. Vous avez ici le choix de définir cet `opérator` comme une méthode, avec ou sans `friend`, ou comme une fonction en dehors de la classe.


