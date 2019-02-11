+++
title = "Factorisation LU"

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
  parent = "direct_solvers"
  name = "Factorisation LU"
  weight = 10

+++

## Objectifs

1. Calculer la factorisation LU d'une matrice
2. Résoudre le système linéaire une fois la factorisation effectuée
3. Comparer le temps d'exécution de ces méthodes en fonction de la taille des matrices

## Principe

Cette méthode permet de transformer une matrice carré $A$ en un produit d'une matrice triangulaire inférieur $L$ et d'une matrice triangulaire supérieur $U$. Cette décomposition permet notamment de résoudre des problèmes d'algèbre linéaire du type
$$
AX=B \iff LUX = B
$$
où $X$ et $B$ sont les vecteurs solution et second membre respectivement. En introduisant la quantité $Y = L^{-1}B$, nous remarquons que nous avons $X = U^{-1}Y$. Ainsi, pour calculer $X$, il suffit de résoudre successivement deux systèmes linéaires triangulaires, l'un inférieur et l'autre supérieur. C'est parfait, nous venons tout juste d'implémenter ces fonctions !

## Factorisations partielle et complète

### Factorisation partielle

Notons $a\_{i,j}$ le coefficient $(i,j)$ de la matrice $A$. Nous allons tout d'abord faire une **factorisation partielle** de la matrice

\begin{equation}
  A=\begin{pmatrix}
    A\_{0,0} & A\_{0,1} \\\\\\
    A\_{1,0}  & A\_{1,1}
  \end{pmatrix} =
    \begin{pmatrix}
      L\_{0,0} & 0 \\\\\\
      L\_{1,0} & I
    \end{pmatrix}
    \begin{pmatrix}
      U\_{0,0} & U\_{0,1} \\\\\\
      0 & S\_{1,1}
    \end{pmatrix}
\label{eq:factorisation_partielle}
\end{equation}
où $I$ est la matrice identité, les $A\_{I,J}$ sont des sous-blocs de $A$, $S\_{1,1}=A\_{1,1}-A\_{1,0}A\_{0,0}^{-1}A\_{0,1}$ est appelé le complément de Schur, tandis que $L\_{0,0}$ est triangulaire inférieure et $U\_{0,0}$ est triangulaire supérieure telles que $A\_{0,0}=L\_{0,0}U\_{0,0}$.

{{% alert note %}}
Afin d'éviter toute confusion, nous utilisons des lettres minuscules pour les coefficients : $i,j$ et des lettres majuscules pour les indices des blocs : $I,J$.
{{% /alert %}}

{{% alert exercise %}}
 Vérifiez que la relation précédente est vraie. Entre autres, trouvez les expressions de $L\_{1,0}$ et $U\_{0,1}$.
{{% /alert %}}

### Factorisaton complète

Le lien entre factorisation partielle et factorisation complète est donné par le théorème suivant :

{{% thm theorem %}}
  La matrice $A$ admet une factorisation $LU$ si et seulement si le bloc $A\_{0,0}$ et le complément de Schur $S\_{1,1}$ sont eux-mêmes factorisables. La décomposition $LU$ de la matrice est déterminée par les factorisations des blocs $A\_{0,0}=L\_{0,0}U\_{0,0}$ et $S\_{0,0}=L\_{0,0}U\_{0,0}$ selon la formule :
$$
    \begin{pmatrix}
      A\_{0,0} & A\_{0,1} \\\\\\
      A\_{1,0}  & A\_{1,1}
    \end{pmatrix}=
     \begin{pmatrix}
       L\_{0,0} & 0 \\\\\\
       L\_{1,0} & L\_{1,1}
     \end{pmatrix}
     \begin{pmatrix}
       U\_{0,0} & U\_{0,1} \\\\\\
       0 & U\_{1,1}
     \end{pmatrix}
$$
  où $L\_{1,0}$ et $U\_{0,1}$ sont ceux de la factorisation partielle \eqref{eq:factorisation_partielle}.
{{% /thm %}}

Ce théorème nous dit que dès lors qu'on arrive à décomposer un bloc de la diagonale $A\_{0,0}$ sous forme $LU$, nous n'avons plus qu'à calculer $L\_{1,0}$, $U\_{0,1}$ et $S\_{1,1}$ puis on cherche la décomposition $LU$ de $S\_{1,1}$. Autrement dit, si nous disposons d'une fonction permettant de réaliser une **factorisation partielle** d'une matrice donnée, nous pouvons envisager un algorithme itératif pour obtenir la **factorisation complète** de la matrice.

## Algorithme

Pour obtenir la factorisation complète, un algorithme itératif possible est le suivant. Nous commençons par **factoriser partiellement** \eqref{eq:factorisation_partielle} la matrice $A$ dans le cas où $A\_{0,0}=A\_{0,0}$ et $L\_{0,0}=\ell\_{0,0}=1$ (le bloc $A\_{0,0}$ est réduit à un seul coefficient). Pour cela, nous calculons les coefficients de $L\_{0,1}, U\_{1,0}$ et $S\_{1,1}$ (voir exercice précédent). Nous pouvons remarquer que $L\_{1,0}$ et $U\_{0,1}$ sont les "bons" blocs des (futures) matrices $L$ et $U$ : ils ne seront plus modifiés. Nous effectuons ensuite la factorisation partielle de $S\_{1,1}$ de la même manière, c'est à dire en considérant le bloc supérieur gauche de la taille d'un seul et un unique coefficient :
$$
  S\_{1,1}=
  \begin{pmatrix}
    L\_{1,1} & 0 \\\\\\
    L\_{2,1} & I
  \end{pmatrix}
  \begin{pmatrix}
    U\_{1,1} & U\_{1,2} \\\\\\
    0 & S\_{2,2}
  \end{pmatrix},
$$

ce qui donne
{{< figure src="../u_l_lu.png" >}}

<!--
$$
L =\left(
  \begin{array}{c c}
    L\_{0,0} &~{ }& ~{ } & 0 &    \\\\\\\hdashline
     & L\_{1,1} & 0 \\\\\\\cdashline{2-5}
     &  &  \\\\\\
    L\_{1,0} & L\_{2,1} & I \\\\\\
     &       &\\\\\\\hdashline
  \end{array}
\right)
$$
$$
  L =\left(\;
    \begin{array}{c c c c c}
      \hdashline
      \multicolumn{1}{:c:}{L\_{0,0}} &~{ }& ~{ } & 0 & \multicolumn{1}{c:}{ }   \\\\\\\hdashline
      \multicolumn{1}{:c:}{} & \multicolumn{1}{c:}{L\_{1,1}} & \multicolumn{3}{:c:}{0} \\\\\\\cdashline{2-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} &  \multicolumn{3}{c:}{ } \\\\\\
      \multicolumn{1}{:c:}{L\_{1,0}} &       \multicolumn{1}{c:}{L\_{2,1}} & \multicolumn{3}{c:}{I} \\\\\\
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{3}{c:}{}\\\\\\\hdashline
    \end{array}
  \;\right)
\qquad\text{et}\qquad
  U =\left(\;
    \begin{array}{c c c c c}
      \hdashline
      \multicolumn{1}{:c:}{U\_{0,0}} & \multicolumn{4}{c:}{U\_{0,1}} \\\\\\\hdashline
      \multicolumn{1}{:c:}{} & \multicolumn{1}{c:}{U\_{1,1}} & \multicolumn{3}{c:}{U\_{1,2}} \\\\\\\cdashline{2-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} &  \multicolumn{3}{c:}{ } \\\\\\
      \multicolumn{1}{:c:}{0} &       \multicolumn{1}{c:}{0} &  \multicolumn{3}{c:}{S\_{2,2}} \\\\\\
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{3}{c:}{}\\\\\\\hdashline
    \end{array}
  \;\right).
$$
-->
Nous recommençons ensuite sur $S\_{2,2}$, $S\_{3,3}$, $\ldots$, pour finalement obtenir les matrices $L$ et $U$ avec :

{{< figure src="../u_l_lu2.png" >}}

<!--$$
  L =\left(\;
    \begin{array}{c c c c c}
      \hdashline
      \multicolumn{1}{:c:}{L\_{0,0}} & \multicolumn{4}{c:}{0} \\\hdashline
      \multicolumn{1}{:c:}{} & \multicolumn{1}{c:}{L\_{1,1}} & \multicolumn{3}{c:}{0} \\\cdashline{2-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{1}{c:}{L\_{2,2}} & \multicolumn{2}{c:}{0} \\\cdashline{3-5}
      \multicolumn{1}{:c:}{L\_{1,0}} &       \multicolumn{1}{c:}{L\_{2,1}} & \multicolumn{1}{c:}{L\_{3,2}} & \multicolumn{1}{c:}{\ddots} & \multicolumn{1}{c:}{\ddots} \\\cdashline{4-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{1}{c:}{} & \multicolumn{1}{c:}{\ldots} & \multicolumn{1}{c:}{L\_{N-1,N-1}}\\\hdashline
    \end{array}
  \;\right)
\qquad\text{et}\qquad
  U =\left(\;
    \begin{array}{c c c c c}
      \hdashline
      \multicolumn{1}{:c:}{U\_{0,0}} & \multicolumn{4}{c:}{U\_{0,1}} \\\hdashline
      \multicolumn{1}{:c:}{} & \multicolumn{1}{c:}{U\_{1,1}} & \multicolumn{3}{c:}{U\_{1,2}} \\\cdashline{2-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{1}{:c:}{U\_{2,2}} & \multicolumn{2}{:c:}{U\_{2,3}} \\\cdashline{3-5}
      \multicolumn{1}{:c:}{0} &       \multicolumn{1}{c:}{0} & \multicolumn{1}{c:}{0} & \multicolumn{1}{c:}{\ddots} & \multicolumn{1}{c:}{\ddots} \\\cdashline{4-5}
      \multicolumn{1}{:c:}{} &       \multicolumn{1}{c:}{} & \multicolumn{1}{c:}{} & \multicolumn{1}{c:}{\ldots} & \multicolumn{1}{c:}{U\_{N-1,N-1}}\\\hdashline
    \end{array}
  \;\right).
$$-->


{{% alert note%}}
À l'itération $j$, nous devons calculer une sous-matrice $S\_{j,j}$. Plutôt que de construire à chaque étape une matrice de taille $(N-j)\times(N-j)$, nous pouvons travailler avec une unique matrice $S$ dont seul le bloc $S\_{j,j}$ sera modifié à chaque itération.
{{% /alert %}}

## Pseudo-codes

{{% alert exercise %}}
À vous d'écrire le pseudo-code. Pour cela, suivez les indications suivantes :

1. Déterminez, dans le cas d'une **factorisation partielle** \eqref{eq:factorisation_partielle} avec $A\_{0,0}=A\_{0,0}$ et $L\_{0,0}=\ell\_{0,0}=1$, les expressions des coefficients de $L\_{1,0}$ et $U\_{0,1}$ en fonction des coefficients de $A$ ainsi que les expressions des coefficients de $S$ en fonction de ceux de $A, L$ et $U$.
2. Écrivez sur le papier un algorithme en [**pseudo-code**](https://fr.wikipedia.org/wiki/Pseudo-code) permettant de construire la **factorisation partielle** de $A$ avec $A\_{0,0}=A\_{0,0}$ et $L\_{0,0}=\ell\_{0,0}=1$. Nous rappelons que les matrices $S\_{i,i}$ peuvent être stockées dans une seule matrice $S$ qui sera modifiée à chaque incrément.
3. Modifiez votre pseudo-code de la question précédente pour obtenir la **factorisation complète** de $A$. Pour cela, il peut être utile d'initialiser l'algorithme par $S = A$.
4. Modifiez encore votre pseudo-code de l'item 3. pour que les matrices $L$ et $U$ soient stockées directement dans la matrice $A$. Autrement dit, après application de l'algorithme, la matrice $A$ sera modifiée de telle sorte que sa partie triangulaire inférieure soit égale à $L$ (sans la diagonale unitaire), et sa partie triangulaire supérieure sera égale à $U$ (diagonale incluse). Cette méthode permet de diminuer le coût mémorie de stockage mais, attention, le produit matrice vecteur n'a alors plus de sens une fois cette algorithme appliqué !
{{% /alert %}}


## Implémentation en C++

{{% alert exercise %}}
Implémentez une méthode de la classe `Matrice` qui calcule la factorisation $LU$ de la `Matrice` telle que les matrices $L$ et $U$ soient stockées dans la matrice (pseudo-code 4. de l'exercice précédent). Le prototype de votre méthode sera donc de la forme suivante :
```cpp
void Matrice::decomp_LU();
```
{{% /alert %}}

{{% alert warning %}}
Nous rappelons que, une fois la factorisation LU effectuée sur place, la matrice est profondément modifiée. En particulier, le produit matrice-vecteur (resp. matrice-matrice) deviendra inutilisable. Nous pouvons toutefois le rendre de nouveau utilisable si nous ajoutons un `booleen` (un "flag") permettant de déterminer si une matrice a été, ou non, déjà factorisée, et modifier le produit matrice-vecteur (resp. matrice-matrice) en fonction. Ajouter cette option est facultative pour la suite.
{{% /alert %}}


## Validation

{{% alert exercise %}}
Résolvez numériquement le problème suivant à l'aide de la factorisation $LU$ de la matrice :
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
La construction d'une telle matrice a été demandée dans un TP précédent.  Vous devriez obtenir $X = [2.5, 4,4.5, 4,2.5]^T$.
{{% /alert %}}
