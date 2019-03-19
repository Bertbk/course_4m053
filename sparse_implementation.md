+++
title = "Formats COO et CSR"

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
  parent = "sparse_matrices"
  name = "Implémentation"
  weight = 30

+++

$\newcommand{\nnz}{\texttt{nnz}}$

## Objectifs

- Implémenter une classe de matrice creuse au format COO (COOrdinates)
- Comparer les performances (temps CPU / coût mémoire) entre les matrices creuses COO et denses.

## Matrice Creuse ?

De nombreuses méthodes discrétisations mènent à la résolution de problème du type :

$$
A x=b,
$$

où la matrice $A$ est _creuse_, c'est-à-dire que, majoritairement, les coefficients de $A$ sont nuls. Pour minimiser la mémoire occupée par la matrice, seuls les coefficients non-nuls sont stockés. Ceci permet également d'améliorer notablement les performances du produit matrice-vecteur, en passant d'une complexité de $O(N^2)$ à $O($`nnz`$)$ où `nnz` est le nombre de coefficients non-nuls (`nnz` = number of non-zeros).

Il existe plusieurs [formats de matrices creuses](https://en.wikipedia.org/wiki/Sparse_matrix#Storing_a_sparse_matrix). Parmi les plus connus et utilisés : les formats COO (_COOrdinates_) et CSR (_Compressed Sparse Row_ ou CRS pour _Compressed Row Storage_). 

{{% alert note %}}
Si la matrice $A$ est diagonale, nous pouvons bien entendu stocker uniquement le vecteur correspondant à la diagonale ! Les formats COO et CSR ont l'avantage de n'imposer aucune contrainte sur la matrice.
{{% /alert %}}

## Format COO

### Principe

Relativement naturel et simple à comprendre et utiliser. La matrice est stockée sous la forme de trois tableaux `row`, `col` et `val`, tous trois de taille `nnz` et contenant respectivement l'indice ligne, colonne et le coefficient non nuls de la matrice. En d'autre termes, pour i = 0, ..., (`nnz`-1),
\begin{equation}
\label{eq:coo}
A(\texttt{row}[i],\texttt{col}[i]) = \texttt{val}[i].
\end{equation}
L'avantage de ce format est la facilité d'implémentation et la possibilité d'ajouter des coefficients "à la volée". En effet, les tableaux `row`, `col` et `val` n'ont pas besoin d'être triés selon l'ordre indices, de plus, une redondance des coefficients peut être autorisées (plusieurs coefficients avec les mêmes indices ligne et colonne).

Prenons la matrice exemple suivante avec `nnz`=10 :

\begin{equation}
\label{eq:matA}
A= \begin{pmatrix}
  3 & 0 & 0 & 2 & 1 \\\\\\
  0 & 0 & 5 & 8 & 0 \\\\\\
  0 & 1 & 2 & 0 & 0 \\\\\\
  0 & 0 & 9 & 0 & 0 \\\\\\
  0 & 0 & 10& 4 & 0
\end{pmatrix}.
\end{equation}

Le stockage COO de cette matrice prendra alors la forme suivante :

| Indice | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `row`  | 0   | 0   | 0   | 1   | 1   | 2   | 2   | 3   | 4   | 4   |
| `col`  | 0   | 3   | 4   | 2   | 3   | 1   | 2   | 2   | 2   | 3   |
| `val`  | 3   | 2   | 1   | 5   | 8   | 1   | 2   | 9   | 10  | 4   |


### Du COO au Dense

Pour reconstuire la matrice sous format dense, le pseudo-code ci-dessous fonctionnerait et autoriserait la redondance (du fait du `+=` ):

```
A = zeros(N,N)
for (i = 0; i < row.size(); i++)
  A(row[i], col[i]) += val[i]
end
```

### Produit Matrice-Vecteur

Un pseudo code serait le suivant :

```
// y = A*x
y = zeros(n) // vecteur nul
for (i = 0; i < n; i++)
  y[i] += A(row[i], col[i]) * x[col[i]]
end
```



### Implémentation

Nous pouvons utiliser [l'héritage](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1898475-decouvrez-lheritage) en construisant une surclasse `Matrice` abstraite. Cependant, pour faire simple, nous proposons d'implémenter une classe `MatriceCOO`.

#### Paramètres

Nous aurons besoin de (au moins) ces paramètres

| Type                  | Nom    |
| --------------------- | ------ |
| `int`                 | `N_`   |
| `std::vector<int>`    | `raw_` |
| `std::vector<int>`    | `col_` |
| `std::vector<double>` | `val_` |

#### Constructeurs

Vous aurez besoin de différents constructeurs, dépendant aussi de vos besoins :

- `MatriceCOO()` : matrice vide (défaut) 
- `MatriceCOO(int n)` : matrice de taille `n` remplie de zéros 
- `MatriceCOO(const Matrice & A)` : construction à partir d'une matrice dense
- `MatriceCOO(const std::vector<int> & raw, const std::vector<int> &col, const std::vector<double> &val)` : construction à partir de vecteurs déjà prêts
- `MatriceCOO(const MatriceCOO & A)` : recopie

#### Méthodes

Certaines méthodes fournissent exactement le même service que pour la classe `Matrice`. Dans ce cas, surtout, gardez **les mêmes noms** que pour la classe `Matrice` :

- Affichage
- Renvoie de la taille de la matrice
- un accesseur à l'élément $(i,j)$ utilisant `operator()`
- Produit Matrice-Vecteur via un `operator*`
- Produit Matrice-Matrice via un `operator*`

Des méthodes spécifiques à la classe `MatriceCOO` seraient, par exemple, celles permettant l'accès à l'élément `i` des tableaux `val`, `col` et `row` (pour vérification par exemple).

Implémentez également une méthode ou une fonction permettant d'obtenir la [matrice de Laplace]({{< relref "dense_matrices_test.md##matrice-du-laplacien">}}) facilement.

Bien entendu, vous validerez votre code avant de passer à la suite.

### Performances

Supposons qu'un `double` nécessite 8 octets en mémoire et un `int` 4 octets. Le coût mémoire de la matrice COO est alors de (2`nnz`)*8 + 4`nnz` = 20`nnz` octets, a priori bien moindre que la version dense qui nécessite $64N^2$ octets, tant que `nnz`$\ll N^2$.

## Format CSR

### Principe

Nous constatons qu'une redondance est présente dans le format COO puisque les tableaux `row` et `col` contiennent de nombreuses valeurs identiques. Le format CSR propose de pallier ce problème en compressant le tableau `row`. Les deux tableaux `col` et `val` sont identiques à ceux utilisés pour le format COO, seul le tableau `row` est modifié ainsi : sa taille est fixée à n+1 (n=nombre de lignes de la matrice) et est de telle sorte que **`row[i]` est l'indice dans `col` et `val` du premier élément non nul de la ligne `i` de la matrice**. Par exemple, le stockage CSR de la matrice \eqref{eq:matA} est :

| Indice | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `row`  | 0   | 3   | 5   | 7   | 8   | 10  |     |     |     |     |
| `col`  | 0   | 3   | 4   | 2   | 3   | 1   | 2   | 2   | 2   | 3   |
| `val`  | 3   | 2   | 1   | 5   | 8   | 1   | 2   | 9   | 10  | 4   |

Le tableau `row` est **compressé** par rapport au format COO puisque sa taille est maintenant de n+1, bien inférieure à `nnz` ! Sur une petite matrice, le gain mémoire est très faible, mais sur une matrice à plusieurs millions d'entrée, cette stratégie devient payante.

Le pseudo code pour reconstruire la matrice dense associé ressemblerait à ceci :

```
A = zeros(N,N)
for (i = 0; i < row.size(); i++)
  for (j = row[i]; j < row[i+1]; j++)
    A(i, col[j]) = val[j]
  end
end
```

{{% alert warning %}}
La relation \eqref{eq:coo} N'est PAS valable pour le format CSR!
{{% /alert %}}

{{% alert note %}}
Quelques remarques :

- `row[0]` est toujours égal à 0. Nous pourrions le supprimer du tableau mais le gain est minime (un `int`)
- `row[i+1]` - `row[i]` = nombre de coefficients non-nuls dans la ligne `i`
- `col[row[i]]`, `col[row[i]]` +1, ..., `col[row[i+1]-1]` =  indices colonne des coefficients non-nuls de la ligne `i`
- `val[row[i]]` à `val[row[i+1]-1]` = coefficients non-nuls de la ligne `i`, rangés dans le même ordre que pour les indices colonne.

{{% /alert %}}


### Du CSR au dense




### Implémentation

Afin de ne pas perdre en efficacité, il est nécessaire de **connaître à l'avance l'emplacement des coefficients non nuls** de la matrice afin de pouvoir la stocker sous format CSR. Ce format n'est pas adapté pour modifier ou construire une matrice "à la volée", contrairement au format COO. Une stratégie intéressante consiste à utiliser le format COO pour construire la matrice, puis, avant de lancer les solveurs linéaires, de transformer la matrice au format CSR.


{{% alert exercise %}}
Dans l'ordre :
1. Définissez une classe \texttt{MatriceCreuse} qui utilise le format CSR, avec un \texttt{std::vector} pour chacun des trois tableaux. Cette classe comprendra notamment :
  - un constructeur par défaut,
  - un constructeur qui prend un entier $n$ et qui construit la matrice identité de taille $n\times n$,
  - un constructeur qui prend un entier définissant la taille de la matrice et trois \texttt{std::vector} définissant `row`,`col` et `val`,
  - un constructeur par recopie,
  - une méthode d'affichage,
  - une méthode qui renvoie la taille de la matrice,
  - un accesseur à l'élément $(i,j)$ utilisant \texttt{operator()},
  - des accesseurs pour accéder à l'élément $i$ des tableaux `val`, `col` et `row`.
2. Implémentez le produit matrice vecteur pour la classe \texttt{MatriceCreuse}. Pour cela, vous ferez d'abord une boucle sur les lignes, puis une sur les colonnes.

{{% /alert %}}

\section{Performances}

{{% alert exercise %}}
Pour comparer les deux méthodes de stockage, à savoir dense et creux (=CSR), nous allons nous intéresser à la matrice tribande suivante, discrétisation de l'opérateur de Laplace par une méthode des différences finies :
\[
A =
\begin{pmatrix}
2 & -1 & 0 & 0 & \ldots & 0 & 0\\
-1 & 2 & -1 & 0 & \ldots & 0 & 0\\
0 & -1 & 2 & -1 & \ldots & 0 & 0 \\
\vdots & \ddots& \ddots& \ddots & \ldots & \vdots & \vdots\\
0 & 0 & 0 & 0 & \ldots & -1 & 2 \\
\end{pmatrix}
\]

\begin{itemize}[label=\textbullet]
\item Implémentez une méthode dans vos classes matrices denses et creuses, qui prend en argument la taille $N$ et qui construit la matrice tribande ci-dessus.
\item Supposons qu'un \texttt{double} soit de taille $8$ octets et \texttt{int} de taille $4$ octets, calculez (sur papier) le coût mémoire du stockage de la matrice $A$ par une méthode de stockage dense et creuse (CSR) en fonction de la taille $N$. Calculez cette valeur pour $N=10000$.
% \item Pour $N = 10000$, affichez la valeur du coût mémoire pour un stockage dense et creux de $A$.
\item Pour $N=10000$, comparez le temps CPU mis pour exécuter le produit matrice vecteur $AX$ où $X$ est un vecteur de taille $N$ rempli de $1$.
\end{itemize}

{{% /alert %}}

{{% alert exercise %}}
Nous comparons maintenant les performances par rapport au remplissage de la matrice. Nous prenons une matrice de taille $N= 5000$ dont les coefficients non nuls ne sont que des $1$ (cela n'a aucune importance). Le taux de remplissage $p$ est le pourcentage de coefficients non nuls, c'est-à-dire :
\[
p = \frac{\texttt{nnz}}{N^2}.
\]

\textbf{Quelques calculs analytiques sur le coût mémoire :}
\begin{enumerate}
\item Donnez la formule du coût de stockage mémoire d'une matrice au format CSR de taux de remplissage $p$.
\item Sur une même figure et pour $N=5000$, tracez les courbes de coût de stockage en mémoire en fonction du pourcentage de remplissage, pour une matrice au format dense et au format creux.
\item A partir de quel pourcentage de remplissage (environ) le stockage CSR devient plus coûteux que le stockage dense ?
\end{enumerate}

\textbf{Vérifions le temps CPU :}

\begin{enumerate}
\item Implémentez une méthode prenant en argument d'entrée un \texttt{long long unsigned int nnz} compris entre $0$ (ou $N$ car $\texttt{nnz}=0$ est inutile) et $N^2$, et qui rend une matrice contenant \texttt{nnz} coefficients non nuls au format CSR. Pour cela, répartissez les coefficients équitablement entre chaque ligne, peu importe leur localisation dans les lignes. Si vous préférez, vous pouvez implémenter une méthode similaire mais qui prend un pourcentage (\texttt{double p}) en argument plutôt que \texttt{nnz}. Notons $A_p$ une telle matrice.
\item Soit $X$ un vecteur de taille $N$ et rempli de $1$. Pour $p=0,0.1,0.2,\ldots,1$, effectuez le produit matrice-vecteur $A_pX$ et stockez le temps CPU en utilisant la fonction \verb!clock! de la bibliothèque standard \verb!ctime!.
\begin{lstlisting}[language=C++]
#include <ctime>
int main (){
clock_t start , end;
double msecs;
start = clock ();
/_ any stuff here ... _/
end = clock ();
msecs = (( double ) (end - start)) / CLOCKS_PER_SEC ;
\end{lstlisting}
Affichez ensuite la courbe ``Temps CPU (s)'' en fonction de \texttt{nnz}. Cela correspond-il à la complexité attendue ?
\end{enumerate}

\begin{remark}
\emph{\textsc{Attention}, le nombre de coefficients non nul pouvant être très grand, il est important d'utiliser des \texttt{long long unsigned int} plutôt que des \texttt{int} pour éviter tout problème !}
\end{remark}
{{% /alert %}}

\begin{remark}
Si vous ne savez pas utiliser Python et matplotlib, vous pouvez utiliser gnuplot\footnote{\url{http://www.gnuplot.info/}} dont voici une bonne introduction :
\url{http://perso.ensta-paristech.fr/~kielbasi/docs/gnuplot.pdf}. Pour utiliser gnuplot, on pourra utiliser la commande suivante dans le terminal :
\begin{lstlisting} > gnuplot myscript.gnuplot
\end{lstlisting}
o\`u \verb!myscript.gnuplot! est le nom du fichier contenant le script. Par exemple, si vous disposez d'un fichier de données de type, où la première colonne correspond à l'abscice ($x$) et les deux autres colonnes à des données associées \texttt{fichier.data} :
\begin{lstlisting}
x_1 A_1 B_1
x_2 A_2 B_2
x_3 A_3 B_3
...
x_N A_N B_N
\end{lstlisting}
Si vous voulez afficher les deux courbes $A$ et $B$ en fonction de $x$ :
\begin{lstlisting}[language=gnuplot] ## Choix de la sortie (commentez/décommentez les lignes) # Sortie sur l'écran
set terminal wxt size 700,524 enhanced font 'Verdana,10' persist # Sortie en PNG
set terminal pngcairo size 700,524 enhanced font 'Verdana,10'
set output 'output.png' ## Tracé
set xlabel 'label x'
set ylabel 'label y'
set title 'Mon titre tout beau'
plot 'fichier.data' using 1:2 title 'A' dashtype 4 with linespoints,\
 'fichier.dat' using 1:3 title 'B' dashtype 2 with linespoints
\end{lstlisting}
Ce script fixe tout d'abord le sortie avec \verb!set terminal!, ici une fenêtre Linux (mais il est possible de prendre autre chose, un format d'image comme \verb!jpeg! par exemple). Les lignes suivantes définissent les légendes, puis nous affichons les données contenues dans le fichier \verb!fichier.data!, plus précisément la colonne 2 par rapport à la colonne 1 (première courbe) et la colonne 3 en fonction de la colonne 1. Il existe de nombreuses options, notamment d'affichage, à vous de voir ce dont vous avez besoin dans la documentation ou en cherchant sur internet.

Si la fenêtre ne s'affiche pas ou pas bien, essayez plutôt \verb!set terminal x11 persist!.

Avec un fichier de données suivant :
\begin{lstlisting}
1 1 1
2 2 4
3 3 9
4 4 16
5 5 25
\end{lstlisting}
vous obtenez la courbe de la Figure \ref{fig:ex}.
\begin{figure}
\begin{center}
\includegraphics[width=0.5\textwidth]{tp3_ex.png}
\caption{Exemple d'affichage avec GnuPlot}
\label{fig:ex}
\end{center}
\end{figure}
\end{remark}

% \section{Retour sur les méthodes itératives}

% {{% alert exercise %}}
% \begin{enumerate}
% \item Implémentez les méthodes itératives vues précédemment en utilisant des matrices creuses. On pourra utiliser un template pour reprendre le code déjà écrit.
% \item Comparez les temps de calculs des différentes méthodes itératives, avec et sans matrices creuses, pour l'exemple du laplacien en 1D.
% \end{enumerate}

% {{% /alert %}}

\end{document}