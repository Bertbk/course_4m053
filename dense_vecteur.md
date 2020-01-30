+++
title = "2. Vecteurs"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 120
diagram = true

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "V. Stockage Dense"
  name = "2. Vecteurs"
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

- Méthode constante qui renvoie la taille du `Vecteur`, par exemple
```c++
int size() const;
```
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

Afficher un `Vecteur` (ses coefficients et/ou toute autre info utile) dans le terminal nous sera utile, ne serait-ce que pour l'étape de vérification. Vous disposez de plusieurs choix pour se faire, la méthode la plus adaptée au `C++` est la surcharge de l'opérateur de flux sortant `<<`.

```cpp
class Vecteur{
  [...]
};
// En dehors de la classe Vecteur (mais dans le même fichier)
std::ostream & operator<<(std::ostream &os, const Vecteur& v);
```
Le fait de retourner un `std::ostream` (typiquement `std::cout`) présente l'avantage de pouvoir *chaîner* les opérations :
```cpp
Vecteur v;
[...]
std::cout << "Mon vecteur : " << v << std::endl;
```
La surcharge de l'opérateur de flux sortant permet aussi de choisr le flux : affichage sur le terminal, écriture sur un fichier, ...


{{% alert exercise %}}
Implémentez la méthode d'affichage et validez la (=compiler + exécuter).
{{% /alert %}}

{{% alert note %}}
La commande `const Vecteur &v` permet d'envoyer le `Vecteur` `v` par référence (plutôt que par copie), le mot clé `const` nous garanti qu'il ne sera pas modifié par la fonction appelante.
{{% /alert %}}

{{% alert note %}}

To be `friend` or not to be ? Parfois cet surcharge d'opérateur est déclarée à l'intérieur de la classe `Vecteur` auquel on adjoint le mot clé `friend` :
```cpp
class Vecteur{
  [...]
  friend std::ostream & operator<<(std::ostream &os, const Vecteur& v);
};
```
Une fonction (et non méthode) `friend` est une fonction qui a le droit d'accéder aux données privées de la classe "amie" (ici `Vecteur`). En pratique, ce n'est pas forcément une bonne idée [comme expliqué sur StackOverflow](https://stackoverflow.com/questions/236801/should-operator-be-implemented-as-a-friend-or-as-a-member-function) car cela brise l'encapsulation (la privatisation des données). 

La règle est la suivante : utilisez le mot clé `friend` **si et seulement si** vous avez un besoin impérieux d'accéder aux données privées (et en général cela se fait via une méthode d'accès aux données comme notre fonction `size()` décrite plus haut).
{{% /alert %}}


## Opérations arithmétiques

[Surchargeons maintenant les opérations arithmétiques](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1897891-surchargez-un-operateur) habituelles, c'est à dire :

1. L'addition entre deux `Vecteur` : `operator+`
2. La soustraction entre deux `Vecteur` : `operator-`
3. Le produit entre un scalaire (`double`) et un `Vecteur` : `operator*`
4. Le produit scalaire entre deux `Vecteur` : `operator*`

Mathématiquement, ces opérations sont des *opérations binaires*, qui nécessitent deux arguments. Informatiquement, nous avons le choix de définir certaines d'entre elles de manière *unaire* ou *binaire*, c'est à dire sous forme de méthodes ou de fonctions. 

Pour rester proche des mathématiques, nous conseillons plutôt de définir ces opérateurs sous forme binaire. Comme nous avons définit un `operator()` qui permet d'accéder aux coefficients d'un `Vecteur`, nous n'avons aucune raison d'utiliser le mot clé `friend` et conservons ainsi le principe d'encapsulation cher au `C++`. Plus d'infos sont disponibles [sur cette discussion](https://stackoverflow.com/questions/4622330/operator-overloading-member-function-vs-non-member-function) :

```cpp
class Vecteur{
  [...]
};
// En dehors de la classe Vecteur
Vecteur operator+(const Vecteur &v, const Vecteur &w);
```


{{% alert exercise %}}
Déclarez et définissez les opérateurs arithmétiques habituels pour les `Vecteur`. Pour le produit avec un scalaire, regardez le **warning** ci-dessous.
{{% /alert %}}


{{% alert tips %}}
Validez, validez, validez puis re-validez, tous vos `operator` **avant** de passer à la suite.
{{% /alert %}}


{{% alert warning %}}
**Remarque sur la Multiplication par un Scalaire.** 

En C++, `v*alpha` et `alpha*v` sont deux opérations différentes et doivent toutes deux être définies correctement ! Autrement dit, vous devez définir un `operator*` correspondant à ces deux opérations, bien que le code soit identique. 

Pourquoi ? Supposons que vous ne définissez que l'un des deux, par exemple : 
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

## Résumé en diagrame

{{< diagram >}}
classDiagram
  class Vecteur{
    -int N_
    -std::vector double coef_
    +Vecteur()
    +Vecteur(int N)
    +Vecteur(const Vecteur & )
    +~Vecteur()
    +int size() const
    +double operator()(int i) const
    + & double operator()(int i)
    }
{{< /diagram >}}