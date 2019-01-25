+++
title = "Méthodes Standards"

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
  parent = "iterative_solvers"
  name = "Méthodes Standards"
  weight = 5

+++

## Objectifs

1. Implémenter toutes les méthodes itératives standards
2. Comparer la vitesse de convergence des différentes méthodes


##  Algorithme générique

Pour résoudre le problème linéaire $A x= b$, une technique consiste à réécrire la matrice $A$ sous la forme $A = M - (M-A)$, où $M$ est une matrice bien choisie,  et d'appliquer le schéma itératif suivant
\begin{equation}\label{eq:split}
Mx_{n+1} = (M-A)x_n + b
\end{equation}
à convergence, nous retrouvons bien $(M-(M-A))x = Ax = b$.

{{% alert exercise %}}
En introduisant le résidu $r\_n := b - Ax\_n$, montrez que l'équation \eqref{eq:split} se réécrit :
$$
x\_{n+1} = x\_n + M^{-1}r\_n.
$$
{{% /alert %}}

L'algorithme de résolution décrit par l'équation \eqref{eq:split} s'écrit alors, pour une tolérance $\varepsilon$ et un nombre maximal d'itérations $n_{max}$ donnés :
```
n=0
x = 0
r = b
While((|r| > tolerance * |b|) && (n < n_max))
    y = M^{-1}r
    x = x + y
    r = b - Ax
    n = n+1
```
Pour chaque méthode itérative, nous construirons une classe spécifique.

## Notations

La matrice $A$ se décompose comme $A = D - E -F$, où $D$, $E$ et $F$ sont des matrices de la même taille que $A$ et telles que :

- $D$ : Matrice ne contenant que les termes diagonaux de $A$
- $E$ : Matrice ne contenant que **l'opposé des coefficients** de  partie **triangulaire supérieure** de $A$
- $F$ : Matrice ne contenant que **l'opposé des coefficients** de  partie **triangulaire inférieure** de $A$


{{% alert note %}}
Deux remarques :

1.   Cette décomposition n'a aucun rapport avec la factorisation $LU$.
2. Pour plus de lisibilité, il est conseillé de créer un couple de fichier .cpp/.hpp par méthode itérative (par exemple `Jacobi.cpp` et `Jacobi.hpp`).
{{% /alert  %}}

## Méthode de Jacobi

Créez deux fichiers `include/jacobi.hpp` et `src/jacobi.cpp`.

### Principe

Pour la méthode de Jacobi, la matrice $M$ est la diagonale de la matrice $A$ :
$$
M = D
$$

### Classe `Jacobi`

#### Données Membres

Celles-ci seront séparées en deux, les données "entrantes", fournies par l'utilisateur, et les données "sortantes", calculées lors de la résolution du problème linéaire. En pratique, rien ne les différencie ces deux types de données qui sont de type `private`, seule leur utilisation permet de les distinguer. Les données sortantes pourront ensuite être, par exemple, affichées sur l'écran ou imprimées dans un fichier pour un traitement ultérieur.

- En entrées :
  - `Matrice A` : Matrice (dense) du système.
  - `Vecteur b` : Vecteur (membre de droite)
  - `double tol` : Tolérance
  - `int n_max` : Nombre maximum d'itérations

- En sortie :
  - `Vecteur x` : Vecteur solution
  - `int niter` : Nombre d'itérations
  - `std::vector<double> resvec` : tableau des normes des résidus

{{% alert note %}}
Deux remarques :

1. Pour gagner en efficacité et limiter le coût mémoire, il est plus intéressant de ne pas stocker les Matrice et Vecteur, mais plutôt leur adresse (référence ou pointeur).
2. Pour l'instant nous travaillons avec des matrices denses, nous verrons plus tard comment utiliser des matrices creuses.
{{% /alert  %}}

#### Méthodes (ou Fonctions Membres)

Outre les accesseurs (*getter*) et les mutateurs (*setter*), nous avons besoin de :

- Une fonctions membre qui résout le système linéaire en appliquant l'algorithme précédent. Celle-ci aura (probablement) le prototype suivant :

```cpp
void Jacobi::Solve();
```
Durant l'appel de cette méthode, la norme du vecteur résidu $r$ de chaque itération sera stocké dans `resvec` et la donnée membre de sortie `niter` sera également mise à jour. La solution obtenue par l'algorithme sera stockée dans la donnée membre de sortie `x`.

{{% alert note %}}
Vous aurez certainement besoin de modifier la classe `Vecteur` pour ajouter des fonctionnalités comme par exemple, le calcul de sa norme.
{{% /alert  %}}

- Une fonction membre pour afficher les paramètres d'entrées (pour les vérifier), et une pour afficher le nombre d'itérations qui a été nécessaires pour atteindre la convergence - si celle-ci a été atteinte.

#### Constructeurs

Libre à vous de décider ce dont vous avez besoin :  un constructeur vide ? Un qui prend toutes les données d'entrée en argument, par exemple :
```cpp
Jacobi(const Matrice &A, const Vecteur &b, double tol, int maxit);
```

#### Implémentation

{{% alert exercise %}}
Construisez une telle classe `Jacobi`. N'oubliez surtout pas de :

1. Testez la compilation
2. Testez le résultat de votre implémentation sur un cas petit et simple.
3. Comparez la solution obtenue avec Jacobi avec celle obtenue par résolution directe.
4. Tant que les trois points ci-dessus ne sont pas validés, ne passez pas à la suite !

{{% /alert %}}

## Méthode de Gauss-Seidel

### Principe

Pour la méthode de Gauss-Seidel, la matrice $M$ choisie est donnée par
$$
M = (D -E)
$$

### Implémentation

{{% alert exercise %}}
Utilisez la même procédure que pour la méthode de Jacobi, c'est-à-dire :

1. Créez deux fichiers `include/gaussseidel.hpp` et `src/gaussseidel.cpp`
2. Construisez une classe `GaussSeidel`
3. Rentrez les mêmes données membres d'entrée/sortie (ou plus si besoin) que pour `Jacobi`
4. Construisez la fonction membre `Solve()`, comme pour `Jacobi`. Afin de faciliter la lecture, nous vous conseillons d'utiliser le même nom et prototype pour chaque méthode itérative.
5. **Avant** de passer à la suite, **testez et validez** votre classe sur un **cas simple**.
{{% /alert %}}


{{% alert note %}}
Contrairement à la méthode de Jacobi, la méthode de Gauss-Seidel requiert la résolution d'un problème linéaire dont la matrice est triangulaire supérieure. Pour cela, nous pourrons utiliser la fonction résolvant un système linéaire triangulaire supérieur que vous avez déjà implémentée.
{{% /alert  %}}


## Méthode de relaxation

Pour la méthode de relaxation de paramètre $0 < \omega < 2$, la matrice $M$ est donnée par :
$$
M = \left(\frac{1}{\omega}D - E\right)
$$

{{% alert exercise %}}
Implémentez cette méthode en procédant de la même manière que pour les autres méthodes itératives.
{{% /alert %}}



## Méthode de Richardson

Pour cette méthode, nous avons
$$
M=\dfrac{1}{\alpha} I
$$
où $I$ est la matrice identité.

{{% alert exercise %}}
Implémentez la méthode de Richardson de la même manière que les autres méthodes itératives.
{{% /alert %}}

## Méthode de Gradient à pas optimal

Pour cette méthode, la matrice $M$ est modifiée à chaque itération. En particulier, à l'itération $n$, la méthode de gradient à pas optimal a pour matrice $M_n$ :
$$
M_n = \frac{1}{\alpha_n} I,
$$
où $I$ est la matrice identité et $\alpha_n$ est donné par ($\langle \cdot , \cdot \rangle$ est le produit scalaire euclidien) :
$$
\alpha_n = \frac{\|r_n\|^2}{\langle Ar_n, r_n \rangle}.
$$


{{% alert exercise %}}
Implémentez la méthode de gradient à pas optimal de la même manière que pour les autres méthodes itératives.
{{% /alert %}}

<!--

## [Optionnel] Une classe abstraite pour les gouverner toutes

Vous avez sûrement remarqué que chaque classe partageait une bonne partie du même code. Dans un soucis d'obtenir un code plus propre, vous pouvez factoriser une bonne partie de celui-ci.

Nous proposons de construire une classe abstraite `IterativeSolver` qui servira de cadre pour différents solveurs itératifs. La partie algorithmique sera contenue dans cette classe mère, tandis que le calcul de la direction de descente $y$ sera calculé par les classes dérivées. Autrement dit, ajouter une méthode de résolution sera rapide.


### Classe `IterativeSolver`

#### Données Membres

{{% alert warning %}}
 Les données `private` de la classe mère ne sont pas accessibles par la classe dérivée !
 Pour que ce soit le cas, il faut utiliser le type `protected`.
{{% /alert %}}


Exactement comme pour `Jacobi` (sauf que `private` devient `protected`) :
- En entrées :
  - `Matrice A` : Matrice (dense) du système.
  - `Vecteur b` : Vecteur (membre de droite)
  - `double tol` : Tolérance
  - `int n_max` : Nombre maximum d'itérations

- En sortie :
  - `Vecteur x` : Vecteur solution
  - `int niter` : Nombre d'itérations
  - `std::vector<double> resvec` : tableau des normes des résidus

#### Méthodes

Les méthodes qui sont identiques dans chaque sous-classe :

- `ComputeResidual` pour calculer le résidu ($r = b - Ax$):

```cpp
Vecteur IterativeSolver::ComputeResidual(const Vecteur &x);
```
- `Solve` pour résoudre le système. Elle prend en argument un vecteur (membre de droite) et retourne la solution. À chaque itération, stockez la norme du vecteur résidu $r$ dans le paramètre adéquat ainsi que le paramètre nombre d'itérations. Celle-ci suit le prototype suivant :

```cpp
Vecteur IterativeSolver::Solve();
```
- Une Méthode pour afficher le nombre d'itérations (une fois la résolution terminée)

#### Méthodes Virtuelles

[Une méthode virtuelle](https://cpp.developpez.com/faq/cpp/?page=Les-fonctions-membres-virtuelles) n'est pas définie dans la classe mère mais dans ses classes filles.

- `ComputeDirection` pour calculer la direction de descente. Cette méthode restera abstraite (d'où le `virtual` et le `=0`) puisqu'elle dépend de la méthode de résolution :

```cpp
 virtual Vecteur ComputeDirection(const Vecteur &r) const = 0;
```

#### Constructeurs

L'avantage de fournir un constructeur pour une classe mère, est que celui-ci pourra être appelé par les classes dérivées. Cela nous évitera des copier/coller. Par exemple :

```cpp
IterativeSolver(const Matrice &A, const Vecteur &b, double tol, int maxit);
```

{{% alert exercise %}}
Facultatif: modifiez votre code pour utiliser l'héritage.
{{% /alert %}}


## Application aux matrices creuses
\label{sec:template}

Pour l'instant, notre code possède :
\begin{itemize}
\item Une classe pour les matrices denses
\item Une classe pour les matrices creuses
\item Une classe pour chaque méthode itérative pour les matrices denses
\end{itemize}

Il serait très intéressant de disposer aussi d'une classe pour chaque méthode itérative mais pour des *matrices creuses*. Remarquez que les méthodes itératives ont principalement besoin du produit matrice-vecteur de la classe \verb!Matrice! et qu'il suffirait **plus ou moins** de copier/coller les méthodes itératives que vous avez implémentées dans la section précédente en remplaçant dans les déclarations les types \verb!Matrice! par \verb!MatriceCreuse!. Cependant, une alternative est d'utiliser les *templates* en \verb!C++!. Comme ceci est un point de language et que ce n'est pas l'objet du cours, vous avez le choix entre l'exercice \ref{exo:iteratif_creux} ou, si vous êtes **à l'aise avec la programmation**, vous pouvez faire les exercices
\ref{exo:iteratif_template_1} et \ref{exo:iteratif_template_2}.
{{% alert exercise %}}
\label{exo:iteratif_creux}
Pour chaque méthode itérative vue dans la section précédente, créez une classe identique mais qui prend une matrice creuse en entrée à la place d'une matrice dense.
{{% /alert %}}

{{% alert note %}}
  Pour se lancer dans les template, nous devons remettre à plat ce que vous venez de coder, avec les risques que cela entrainent. Aussi, avant de vous lancer dans les template nous vous suggérons de faire un copie de votre code. Si vous utilisez un gestionnaire de version (comme git), alors vous ne craignez rien.
{{% /alert  %}}

{{% alert exercise %}}
\label{exo:iteratif_template_1}
  Commencez par rendre la classe `Jacobi` ouverte aux template. Autrement dit, le type `T` de la matrice membre devient un paramètre de la classe. Nous construirons un objet `Jacobi` comme cela :
  \begin{lstlisting}[language=C++]
// Si Matrice est la classe pour les matrices denses :
Jacobi<Matrice> MonBeauJacobiDense;
// Si MatriceCreuse est la classe pour les matrices CSR :
Jacobi<MatriceCreuse> MonBeauJacobiCreux;
\end{lstlisting}
{{% alert note %}}
Pour utiliser les template, vous devez, *grosso-modo*, déplacer le code contenu dans le fichier .cpp vers le fichier .hpp. Pensez ensuite à supprimer le fichier .cpp pour ne pas le compiler !
{{% /alert  %}}
{{% /alert %}}

{{% alert exercise %}}
\label{exo:iteratif_template_2}
Une fois la classe `Jacobi` ``templatisée'', attaquez vous aux autres !
{{% /alert %}}

-->
