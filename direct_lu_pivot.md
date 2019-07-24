+++
title = "Factorisation LU : Pivotage"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 210
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "direct_solvers"
  name = "Factorisation LU : Pivotage"
  weight = 50

+++

## Objectifs

Modifier la factorisation LU pour prendre en compte le pivot

{{% alert note%}}
Bien qu'extrêmement intéressant, cette partie est "optionnelle" : privilégiez d'abord les méthodes itératives avant de vous plonger dans la LU avec pivot !
{{% /alert %}}

{{% alert warning %}}
Votre programme de factorisation LU doit être **fonctionnel** et **effectué dans la matrice** avant d'aller plus loin ! Autrement dit, vous l'avez **validé** sur une ou des systèmes linéaires !
{{% /alert %}}

## Principe

Lors du calcul de la factorisation $LU$, le pivot, c'est-à-dire le premier coefficient de la sous-matrice (complément de Schur) $S\_{k,k}(0,0)$ peut être nul. Pour obtenir une factorisation LU, une méthode consiste à chercher un coefficient non nul dans cette sous-matrice et à *pivoter* les lignes et colonnes pour lui donner le rôle de pivot. 

{{% alert tips %}}
L'unicité de la factorisation LU est perdue, celle-ci dépendant du choix du pivot.
{{% /alert %}}

## Pivotage partiel 

Nous faisons ici le choix de chercher le remplaçant du pivot parmi tous les coefficients de la sous-colonne uniquement. Ce nouveau pivot est le coefficient le plus grand (en terme de valeur absolue) et, en cas d'égalité, celui de plus petit indice ligne (*i.e* le "premier rencontré"). Le pivot n'est recherché que dans la première colonne c'est pourquoi nous parlons de *pivotage partiel*. Quand le pivot est cherché dans toutes la sous-matrices, nous parlons alors de *pivotage complet*.


## Exemple


Prenons le système linéaire suivant :

$$
\underbrace{\begin{pmatrix}
  2&4&1&-3\\\\\\
 -1& -2&  2 & 4\\\\\\
  4&  2& -3&  5\\\\\\
  5& -4& -3& 1
 \end{pmatrix}}\_{A}
 X = 
 \underbrace{\begin{pmatrix}
 1\\\\\\ 2\\\\\\ 3\\\\\\ 4
 \end{pmatrix}}\_{b}
$$

Effectuons maintenant la factorisation LU de $A$  *sur place* :

{{% div class="course_lu carousel_lu" %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_0.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_1.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_2.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_3.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;" %}}
{{% svg file="course/4m053/lu_pivot_4.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_5.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_6.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_7.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_8.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_9.svg" %}}
{{% /div %}}
{{% div class="course_lu carousel-cell_lu" style="width:100%;"%}}
{{% svg file="course/4m053/lu_pivot_10.svg" %}}
{{% /div %}}
{{% /div %}}


{{% alert note %}}
Il est possible aussi de ne pas pivoter directement les lignes de la matrice mais de conserver dans une matrice $P$ les différentes permutations utilisées. Cela permet d'éviter des opérations coûteuses sur la matrice, cependant la méthode proposée a le mérite de fonctionner et d'être relativement simple. 
{{% /alert %}}

## Implémentation



### Permutation de lignes : `Vecteur` et `Matrice`
Dans les classes `Vecteur` et `Matrice`, ajoutez deux méthodes permettant de pivoter intégralement deux lignes de prototype suivant :

```cpp
void Vecteur::permute(int i, int j);
void Matrice::permute(int i, int j);
```

### LU avec pivot

Implémentez maintenant la factorisation LU avec pivot dont le prototype peut être sous forme :

- D'une méthode de la classe `Matrice` :

```cpp
void Matrice::lu_pivot(Vecteur &b);
```

- D'une fonction hors classe :

```cpp
void lu_pivot(Matrice &A, Vecteur &b);
```
L'algorithme ressemble alors au suivant :

```
Avant chaque factorisation partielle :
  - Vérifier si le pivot est nul (ou proche de zéro !)
    - Si oui :
      - Chercher le pivot (max de la sous-colonne) : sa valeur et son indice ligne
      - Pivoter les deux lignes dans la `Matrice` et dans le `Vecteur` membre de droite
    - Continuer la factorisation (comme précédemment)
```

{{% alert warning %}}
La comparaison `double a == 0` est très risquée en `C++` du fait des approximations numériques : une quantité théoriquement nulle peut ne pas l'être tout en étant extrêmement petit, de l'ordre de 1e-16. Ainsi, quand vous vérifiez que le pivot est nul, préférez garder une tolérance, par exemple :

```cpp
if( abs(pivot) < 1e-14)   //Pivot considéré comme nulle
```

Notons qu'un pivot très petit peut entrainer des instabilités numériques (car on divise par celui-ci). Il peut dès lors être utile de choisir une tolérance plus grande que 1e-14 ou de rechercher systématiquement le plus grand pivot, mais cela augmente le nombre d'opérations effectuées.
{{% /alert %}}


<script type="text/javascript" src="https://npmcdn.com/flickity@2/dist/flickity.pkgd.js"></script>
<script type="text/javascript" src="../lu_pivot_fact.js"></script>
