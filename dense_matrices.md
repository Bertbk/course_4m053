+++
title = "3. Matrices"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 130
diagram = true
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "V. Stockage Dense"
  identifier = "matrices_denses"
  name = "3. Matrices"
  weight = 15

+++

## Objectifs

1. Implémenter une classe `Matrice` pour manipuler des matrices carrées
2. Implémenter des opérations entre les classe `Matrice` et `Vecteur`

## Fichiers

Tout comme les vecteurs, il est largement préférable de créer un fichier header et un fichier source pour les matrices.

## Stockage

La classe `Matrice` représente des matrices **carrées** (uniquement) et les stocke sous forme **dense**. Cette classe permettra d'effectuer des opérations matricielles (multiplication, ...). Elle contient comme données privées (au moins, libre à vous d'en ajouter):
 
- `int N_` : Le nombre de colonnes (= de lignes)
- `std::vector<double> coef_` : Les coefficients, stockés dans un tableau à une dimension de la bibliothèque standard

Les coefficients sont stockés de la façon suivante. Le coefficient positionné en $(i,j)$ dans la matrice sera à la position `j+i*N_` dans le vecteur de coefficients, où `N_` est le nombre de colonnes ou de lignes.

Comme pour la classe `Vecteur`, la classe `Matrice` comporte des constructeurs et son fichier header ressemble ainsi à ceci

```cpp
// Fichier include/matrice.hpp
#pragma once
#include<vector>   // pour les std::vector
#include<iostream> // pour std::ostream

class Matrice{
private:
  int N_;
  std::vector<double> coef_;
public:
  Matrice (); // constructeur vide
  Matrice (int N); // constructeur créant une matrice nulle de taille N
  Matrice (const Matrice & M); // constructeur par recopie
  ~Matrice() = default;
};

std::ostream & operator<<(std::ostream & os, const Matrice &A);

```

## Quelques méthodes

1. Méthode (constante) qui renvoie la taille de la matrice
2. Les 2 accesseurs (l'un pour modifier, l'autre pour obtenir la valeur) :
```c++
double & operator() (int i, int j);     // Accès à la référence
double operator() (int i, int j) const; // Accès à la valeur (recopie)
```
3. Une Fonction qui affiche la matrice dans le terminal en utilisant les flux (en utilisant l'opérateur `(i,j)` et non directement `coef_` !)
```c++
std::ostream & operator<<(std::ostream & os, const Matrice &A);
```

{{% alert warning %}}
À partir de maintenant, vous ne devriez plus jamais accéder aux coefficients via `coef_` mais **uniquement via l'opérateur `()`** !

En effet, si nous décidons de modifier la façon dont sont stockés les coefficients, nous aurons à répercuter cette modification  **uniquement** dans les `operator()`.
{{% /alert %}}


## Opérations élémentaires

En mathématique, une matrice n'est pas qu'un tableau de coefficients et des opérations comme la multiplication ou l'addition sont possibles : ne nous privons pas de les implémenter ! Comme pour la classe `Vecteur`, nous vous invitons à définir ses fonctions **en dehors de la classe `Matrice`** et **sans utiliser de `friend`** :

1. L'addition et la soustraction entre deux matrices en surchargeant les opérateur `+` et `-`
2. La multiplication par une autre `Matrice`
3. La multiplication par un scalaire


{{% alert exercise %}}
En vous inspirant de ce qui a été réalisé pour la classe `Vecteur`, améliorez la classe `Matrice` avec les opérations arithmétiques précédentes (et d'autres si vous le souhaitez).
{{% /alert %}}

## Produit Matrice-Vecteur

Implémentez le produit matrice vecteur sous forme d'un `operator*` :
```c++
Vecteur operator*(const Matrice& A, const Vecteur& x);
```
{{% alert note %}}
N'oubliez pas, alors, d'inclure le fichier header des vecteurs.
{{% /alert %}}

{{% alert note %}}
Quelques astuces générales :

- Utilisez **des références en argument** pour éviter les **recopies inutiles** d'objets qui peuvent être lourdes en mémoire, ce qui est le cas pour les matrices.
- Dans le cas des références passées en argument, **déclarez les constantes** (`const truc &`) si l'argument n'a pas vocation à être modifié par la fonction.
- De même, déclarez **les méthodes de vos classes comme constantes** si l'objet appelant n'est pas modifié.
{{% /alert %}}


## Résumé en diagrame

{{< diagram >}}
classDiagram
  class Matrice{
    -int N_
    -std::vector double coef_
    +Matrice()
    +Matrice(int N)
    +Matrice(const Matrice & )
    +~Matrice()
    +int size() const
    +double operator()(int i, int j) const
    + & double operator()(int i, int j)
    }
{{< /diagram >}}