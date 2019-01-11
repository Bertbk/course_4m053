+++
title = "Matrices"

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
  identifier = "matrices_denses"
  name = "Matrices"
  weight = 15

+++

## Objectif

1. Implémenter une classe `Matrice` pour manipuler des matrices carrées


## Stockage

 Nous souhaitons implémenter une classe `Matrice` qui représente les matrices **carrées** et les stocke de manière **dense**. Elle nous permettra aussi d'effectuer des opérations matricielles (multiplication, ...). Cette classe contient comme données privées :
 
- `int N_` : Le nombre de colonnes (= de lignes)
- `std::vector<double> coef_` : Les coefficients, stockés dans un tableau à une dimension de la bibliothèque standard

Les coefficients sont stockés de la façon suivante. Le coefficient positionné en $(i,j)$ dans la matrice sera à la position `i+j*N` dans le vecteur de coefficients, où `N` est le nombre de colonnes ou de lignes.


{{% alert exercise %}}
À vous d'implémenter la classe `Matrice` ! Pour cela...

- Implémentez un constructeur ...
  - Vide
  - Un prenant un entier en argument et qui crée une matrice carré remplie de zéros de taille cet entier
  - Un par recopie

```c++
Matrice (); // constructeur vide
Matrice (int N); // constructeur créant une matrice nulle de taille N
Matrice (const Matrice & M); // constructeur par recopie
```
- Ajoutez une méthode constante qui renvoie la taille de la matrice
- Ajoutez une méthode constante qui affiche la matrice dans le terminal
- Ajoutez les accesseurs suivants :

```c++
double & operator() (int i, int j);     // Accès à la référence
double operator() (int i, int j) const; // Accès à la valeur (recopie)
  ```
Le premier permet d'accéder au coefficient de la matrice par référence (permettant une modification ultérieure) tandis que le second ne fait que renvoyer (une copie de) la valeur du coefficient.

{{% /alert %}}


{{% alert tips %}}
À partir de maintenant, vous ne devriez plus jamais accéder aux coefficients via `coef_` mais uniquement via les accesseurs.
{{% /alert %}}

## Opérations élémentaires

En mathématique, une matrice n'est pas qu'un tableau de coefficients et des opérations comme la multiplication ou l'addition sont possibles : Ne nous privons pas de les implémenter !

{{% alert exercise %}}
Améliorer votre classe `Matrice` avec les fonctionnalités suivantes :

1. L'addition et la soustraction entre deux matrices en surchargeant les opérateur `+` et `-`
2. La multiplication par une `Matrice`
3. La multiplication par un scalaire
{{% /alert %}}


{{% alert note %}}
Quelques astuces :

- Pensez à utiliser des références en argument pour éviter les copies inutiles d'objets qui peuvent être lourdes en mémoire, ce qui est le cas pour les matrices
- Dans le cas des références passées en argument, pensez à les déclarer constantes dans les cas pertinents
- De même, pensez à déclarer les méthodes de vos classes comme constantes dans les cas qui conviennent
{{% /alert %}}


