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

1. Implémenter une classe `Vecteur` pour manipuler des vecteurs

{{% alert warning %}}
N'oubliez pas de **tester** et **valider** chaque nouvelle fonctionnalité à travers, par exemple, votre fichier `dense.cpp`.
{{% /alert %}}

## Stockage

Informatiquement, un vecteur est stocké sous la forme d'un tableau de nombres. La classe `Vecteur` qui représentera un tel vecteur possèdera comme données privées (au moins) :
 
- `int N_` : Le nombre d'éléments (= la dimension)
- `std::vector<double> coef_` : Les coefficients, stockés dans un tableau à une dimension de la bibliothèque standard

Notre classe ressemble donc à

```cpp
// include/vecteur.hpp
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
## Constructeurs et destructeur

Implémentez les trois constructeurs suivants         
```c++
Vecteur (); // constructeur vide
Vecteur (int N); // constructeur créant un vecteur de taille N et rempli de zéros
Vecteur (const Vecteur &v); // constructeur par recopie
```

Implémentez également un destructeur
```cpp
~Vecteur()=default; // destructeur par défaut
```

## Quelques méthodes

- Ajoutez une méthode constante qui renvoie la taille du `Vecteur`
- Ajoutez une méthode constante qui affiche le `Vecteur` (ses coefficients et/ou toute autre info utile) dans le terminal
- Ajoutez les accesseurs suivants :

```c++
double & operator() (int i, int j);      // Accès à la référence
double operator() (int i, int j) const; // Accès à la valeur (recopie)
  ```
Le premier permet d'accéder au coefficient de la matrice par référence (permettant une modification ultérieure) tandis que le second ne fait que renvoyer (une copie de) la valeur du coefficient.



{{% alert tips %}}
À partir de maintenant, vous ne devriez plus jamais accéder aux coefficients via `coef_` mais uniquement via les accesseurs !
{{% /alert %}}

## Opérations élémentaires

[En surchargeant les opérateurs](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1897891-surchargez-un-operateur), ajoutez les opérations élémentaires suivantes :

1. d'addition entre deux vecteurs en surchargeant l'opérateur `+`
2. de soustraction avec l'opérateur `-`

## Multiplication par un scalaire

Cela se fait en construisant un `operator*`. Vous pouvez définir une méthode, par exemple `void ScalarMult(double alpha);` mais cela peut s'avérer peu pratique. Le mieux (au sens mathématiques) est de définir un `operator*` afin d'écrire directement `alpha*v` dans votre code. Nous avons alors deux possibilités :

1. Comme méthode de classe : 
        
        ```cpp
        operator*(double alpha); //Dans la classe Vecteur
        ```
2. En dehors de la classe avec le mot clé `friend` comme ceci : 
        
        ```cpp
        friend operator*(double alpha, Vecteur v); //En dehors de la classe Vecteur
        ```

La deuxième option présente l'avantage de clairement exposer les deux arguments de l'opération, contrairement à la méthode où l'argument `Vecteur` est implicite.
