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
```text
// initialisation de : tolerance, b, n_max
n = 0
x = 0 // vecteur solution
r = b // vecteur résidu
WHILE( (|r|/|b| > tolerance) && (n < n_max))
    y = M^{-1}*r // Calcul de la direction (résolution système)
    x = x + y    // Mise à jour de la solution courante
    r = b - Ax   // Mise à jour du résidu (vecteur)
    n = n + 1    // Mise à jour du numéro de l'itération
```
Les méthodes itératives que nous détaillons ici ne diffèrent que par le choix de la matrice $M$. Pour chacune d'entres elles, nous construirons une classe dédiée, bien qu'elles partagerons toutes des codes similaires (nous pourrions utiliser l'héritage, mais cela compliquera la "templatisation").

## Méthodes standards

La matrice $A$ se décompose comme $A = D + E +F$, où $D$, $E$ et $F$ sont des matrices de la même taille que $A$ et telles que :

- $D = {\rm diag}(A)$ : Matrice ne contenant que **les termes diagonaux** de $A$
- $E$ : Matrice ne contenant que la partie **triangulaire supérieure** de $A$
- $F$ : Matrice ne contenant que la partie **triangulaire inférieure** de $A$



| Méthode | Matrice $M$ | Remarques|
| ---------|----|----------|
| Jacobi   | $D$ | $M^{-1}$ est analytique        |
| Gauss-Seidel   | $D + E$ |  $M$ est triangulaire supérieure       |
| Relaxation   | $\frac{1}{\omega}D + E$ | $0 < \omega < 2$ paramètre à controller        |


{{% alert warning %}}
Cette décomposition $A = D - E -F$ n'a aucun rapport avec la factorisation $LU$.
{{% /alert  %}}

## Une Classe en Détail : Jacobi

Pour chaque méthode, nous implémentons une classe distincte et donc, nous créons deux fichiers (un en-tête et un source). Par exemple, pour Jacobi : `include/jacobi.hpp` et `src/jacobi.cpp`. Ces classes se ressembleront beaucoup. Nous détaillons ici la classe `Jacobi`, cependant, pour Gauss-Seidel et la Relaxation, la classe sera similaire à quelques modifications près (par exemple la Relaxation nécessite un paramètre $\omega$ en plus).

### Données Membres (ou paramètres)

Celles-ci seront séparées en deux, les données "entrantes", fournies par l'utilisateur, et les données "sortantes", calculées lors de la résolution du problème linéaire. En pratique, rien ne les différencie ces deux types de données qui sont de type `private`, seule leur utilisation permet de les distinguer. Les données sortantes pourront ensuite être, par exemple, affichées sur l'écran ou imprimées dans un fichier pour un traitement ultérieur.

- En entrées :

| Type | Nom (suggestion) | Fonction |
| ---- |---| ---- |
|`Matrice` | `A_` | Matrice (dense) du système.|
| `Vecteur` | `b_` | Vecteur (membre de droite)|
| `double` | `tol_` | Tolérance|
| `int` | `n_max_` | Nombre maximum d'itérations|

- En sortie :

| Type | Nom (suggestion) | Fonction |
| ---- |---| ---- |
| `Vecteur` | `x_` | Vecteur solution |
| `int` | `niter_` | Nombre d'itérations |
| `std::vector<double>` | `resvec_` | Tableau des normes des résidus relatifs (*RESidual VECtor*)|


{{% alert note %}}
Pour gagner en efficacité et limiter le coût mémoire, il est plus intéressant de ne pas stocker les Matrice et Vecteur, mais plutôt leur adresse (référence ou pointeur)
{{% /alert  %}}

### Constructeurs

Libre à vous de décider ce dont vous avez besoin :  un constructeur vide ? Un qui prend toutes les données d'entrée en argument, par exemple :
```cpp
Jacobi(const Matrice &A, const Vecteur &b, double tol, int maxit);
```


### Méthodes

Outre les accesseurs (*getter*) et les mutateurs (*setter*) habituels pour accéder et modifier les paramètres, nous avons besoin d'une fonctions membre qui résout le système linéaire en appliquant [l'algorithme de résolution générique](http://localhost:1313/bthierry/course/4m053/iterative_standard/#algorithme-g%C3%A9n%C3%A9rique). Celle-ci aura (probablement) le prototype suivant :

```cpp
void Jacobi::Solve();
```

D'autre part, voici quelques propositions pour définir la méthode :

- La solution sera stockée dans `x_`
- Le nombre d'itérations sera stockée dans `niter_`
- À chaque itération, la norme du rédidu relatif $\frac{\\|r\\|}{\\|b\\|}$ doit être calculé pour vérifier si la convergence est atteinte ou non. Cette quantité sera stockée dans le tableau `resvec_` au fur et à mesure des itérations. Ceci nous sera utile pour la partie analyse.


{{% alert note %}}
Vous aurez certainement besoin de modifier la classe `Vecteur` pour ajouter des fonctionnalités comme par exemple, le calcul de sa norme.
{{% /alert  %}}



### Implémentation et Test

Pour tester et valider votre code, utiliser la même matrice que pour la factorisation LU :
$$
\begin{pmatrix}
  2 & -1 & 0 & 0 &0\\\\\\
  -1 & 2 & -1 & 0 &0\\\\\\
  0 & -1 & 2 & -1 &0\\\\\\
  0 & 0& -1 & 2 & -1 \\\\\\
  0 & 0& 0 &-1 & 2 \\\\\\
\end{pmatrix} X=
\begin{pmatrix}
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
  1 \\\\\\
\end{pmatrix}.
$$
La solution de ce problème est $X = [2.5, 4,4.5, 4,2.5]^T$.

{{% alert exercise %}}
Construisez une telle classe `Jacobi`. N'oubliez surtout pas de :

1. Testez la compilation
2. Testez le résultat de votre implémentation sur un cas petit et simple.
3. Comparez la solution obtenue avec Jacobi avec celle obtenue par résolution directe.
4. Tant que les trois points ci-dessus ne sont pas validés, ne passez pas à la suite !

{{% /alert %}}

## Classes Gauss-Seidel et Relaxation

{{% alert exercise %}}
Construisez deux autres classes supplémentaires : une pour la méthode de Gauss-Seidel et une pour la méthode de Relaxation. Validez toujours vos codes avant de poursuire.
{{% /alert %}}

{{% alert note %}}
Contrairement à la méthode de Jacobi, les méthodes de Gauss-Seidel et de Relaxation requièrent la résolution d'un système linéaire triangulaire supérieure. Pour cela, nous pourrons utiliser la fonction résolvant un système linéaire triangulaire supérieur que vous avez déjà implémentée.
{{% /alert  %}}



