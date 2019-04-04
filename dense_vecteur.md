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

Voici deux méthodes qui nous seront utiles

- Méthode constante qui renvoie la taille du `Vecteur`
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

{{% alert warning %}}
À partir de maintenant, vous ne devez **plus jamais** accéder aux coefficients d'un `Vecteur` via sa donnée `coef_` (*e.g.* `coef_[i]`) mais uniquement via ses accesseurs (*e.g.* `v(i)`).
{{% /alert %}}

## Affichage

Afficher un `Vecteur` (ses coefficients et/ou toute autre info utile) dans le terminal nous sera utile, ne serait-ce que pour l'étape de vérification. Vous disposez de plusieurs choix pour se faire :

1. Par une méthode qui affiche le `Vecteur`, du nom que vous souhaitez
2. Par une surcharge de [l'opérateur de flux](https://stackoverflow.com/questions/236801/should-operator-be-implemented-as-a-friend-or-as-a-member-function) `operator<<` :

```cpp
class Vecteur{
  [...]
  friend std::ostream & operator<<(std::ostream &os, const Vecteur& v);
  [...]
};
```

La deuxième méthode a l'avantage de pouvoir *chaîner* les opérations :
```cpp
Vecteur v;
[...]
std::cout << "Mon vecteur : " << v << std::endl;
```
Mais aussi de pouvoir s'utiliser de la même manière pour imprimer sur disque (au lieu `std::cout` il suffit de choisir un *file stream*).

{{% alert note %}}
La commande `const Vecteur &v` permet d'envoyer le `Vecteur` `v` par référence (plutôt que par copie), le mot clé `const` nous garanti qu'il ne sera pas modifié par la fonction appelante.
{{% /alert %}}

{{% alert exercise %}}
Implémentez une méthode d'affichage et validez la.
{{% /alert %}}

## Opérations arithmétiques

[Surchargeons maintenant les opérations arithmétiques](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1897891-surchargez-un-operateur) habituelles, c'est à dire :

1. L'addition entre deux `Vecteur` : `operator+`
2. La soustraction entre deux `Vecteur` : `operator-`
3. Le produit entre un scalaire (`double`) et un `Vecteur` : `operator*`
4. Le produit scalaire entre deux `Vecteur` : `operator*`

Mathématiquement, ces opérations sont des *opérations binaires*, qui nécessitent deux arguments. Informatiquement, nous avons le choix de définir certaines d'entre elles de manière *unaire* ou *binaire*, c'est à dire :

1. Comme fonction de classe **unaire** (= un argument). Dans ce cas, le deuxième argument est implicite et il s'agit de l'objet appelant (`*this`) :
        
        class Vecteur{
          [...]
          public: 
            Vecteur operator+(const Vecteur &w) const;
            [...]
        };
        
2. Comme fonction de classe **binaire** (= deux arguments) mais avec le mot clé `friend `, qui permet **d'accéder aux paramètres** (même privés) des arguments. La fonction n'est en réalité plus une fonction de classe (méthode).

        class Vecteur{
          [...]
          public: 
            friend Vecteur operator+(const Vecteur &v, const Vecteur &w);
            [...]
        };

3. Comme fonction **binaire** en dehors de la classe. Cette procédure conserve le principed 'encapsulation puisque la fonction n'a pas accès aux données privés des arguments (`Vecteur`) : 

        class Vecteur{
          [...]
        };
        Vecteur operator+(const Vecteur &v, const Vecteur &w);

Pour rester proche des mathématiques, nous conseillons plutôt les options 2. ou 3. Utilisez l'option 2., c'est à dire le mot clé `friend`, si (et seulement si) vous **avez besoin d'accéder aux paramètres privés de l'objet**. Plus d'infos sont disponibles [sur cette discussion](https://stackoverflow.com/questions/4622330/operator-overloading-member-function-vs-non-member-function).

Comme nous avons définit un `operator()` qui permet d'accéder aux coefficients d'un `Vecteur`, nous n'avons aucune raison d'utiliser la méthode 2. et le mot clé `friend`. Nous privilégierons donc la méthode 3.

{{% alert exercise %}}
Déclarez et définissez les opérateurs arithmétiques habituels pour les `Vecteur`. Pour le produit avec un scalaire, regardez le **warning** ci-dessous.
{{% /alert %}}


{{% alert tips %}}
Validez, validez, validez puis re-validez, tous vos `operator` **avant** de passer à la suite.
{{% /alert %}}

{{% alert warning %}}
**Ne définissez jamais** plusieurs opérateurs pour la même opération ! Autrement dit, n'implémentez pas les méthodes 1., 2. et 3. mais une seule !
{{% /alert %}}


{{% alert warning %}}
**Remarque sur la Multiplication par un Scalaire.** 

En C++, `v*alpha` et `alpha*v` sont deux opérations différentes et doivent toutes deux être définies correctement ! Autrement dit, vous devez définir un `operator*` correspondant à ces deux opérations, bien que le code sera identique.

Supposons que vous ne définissez que l'un des deux, par exemple : 
```cpp
Vecteur operator*(const Vecteur &v, double alpha);
```
Supposons maintenant que votre code comporte :
```cpp
Vecteur v;
double alpha;
[...]
Vecteur x = alpha * v;
```
Le compilateur devrait déclencher une erreur car l'opérateur n'existe pas. Cependant, il existe un risque que le compilateur ne dise rien mais qu'à l'exécution, le résultat soit complètement farfelu ! Vous devez donc définir les deux :
```cpp
Vecteur operator*(const Vecteur &v, double alpha);
Vecteur operator*(double alpha, const Vecteur &v);
```
{{% /alert %}}



