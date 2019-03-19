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
  name = "Format COO et CSR"
  weight = 10

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
L'avantage de ce format est la facilité d'implémentation et la possibilité d'ajouter des coefficients "à la volée". En effet, les tableaux `row`, `col` et `val` n'ont pas besoin d'être triés selon l'ordre indices. De plus, une redondance (ou une dupplication) des coefficients est autorisée, c'est-à-dire que plusieurs coefficients avec les mêmes indices ligne et colonne peuvent cohabiter sans problème.

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

Pour illustrer la redondance (ou dupplication), voici un autre stockage possible en divisant le dernier coefficient :

| Indice | 0   | ... | 8   | 9   | 10  |
| ------ | --- | --- | --- | --- | --- |
| `row`  | 0   | ... | 4   | 4   | 4   |
| `col`  | 0   | ... | 2   | 3   | 3   |
| `val`  | 3   | ... | 10  | 1   | 3   |

{{% alert note %}}
Même si cela n'est pas nécessaire a priori, les trois tableaux sont souvent classés de sorte que `row` est croissant et `col` est "croissant par morceaux" (ou "croissant par ligne"). Autrement dit, les trois tableaux sont ordonnés selon les lignes.
{{% /alert %}}

### Du COO au Dense

Pour reconstuire la matrice sous format dense, le pseudo-code ci-dessous fonctionnerait et autorise d'avoir une dupplication de coefficients (du fait du `+=` ):

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
  y[row[i]] += val[i] * x[col[i]]
end
```

### Conclusion

Le format COO est très souple et permet de construire une matrice aisément, cependant il présente les défauts suviants :

- Deux adressages indirects sont nécessaires pour effectuer le produit matrice vecteur
- Les accès aux données ne sont pas *a priori* connus
- Absence de méthode rapide pour obtenir un terme de la matrice connaissant ses indices ligne et colonne 

## Format CSR

### Principe

Le format CSR propose de pallier les défauts du COO en compressant le tableau `row`. Plus précisément, les deux tableaux `col` et `val` sont identiques à ceux utilisés pour le format COO (et ordonnés par "lignes"), seul le tableau `row` est modifié : 

- Sa taille est fixée à n+1 (n=nombre de lignes de la matrice)
- **`row[i]` est maintenant l'indice du premier élément non nul de la ligne `i` dans les tableaux `col` et `val`**

Par exemple, le stockage CSR de la matrice \eqref{eq:matA} est :

| Indice | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `row`  | 0   | 3   | 5   | 7   | 8   | 10  |     |     |     |     |
| `col`  | 0   | 3   | 4   | 2   | 3   | 1   | 2   | 2   | 2   | 3   |
| `val`  | 3   | 2   | 1   | 5   | 8   | 1   | 2   | 9   | 10  | 4   |

Le tableau `row` est **compressé** par rapport au format COO puisque sa taille est maintenant de n+1, bien inférieure à `nnz` ! Sur une petite matrice, le gain mémoire est très faible, mais sur une matrice à plusieurs millions d'entrée, cette stratégie devient payante.

### Du CSR au Dense

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


### Produit Matrice - Vecteur

Le pseudo-code est le suivant

```
// y = A*x
y = zeros(row.size() - 1)
for (i = 0; i < row.size(); i++)
  for (j = row[i]; j < row[i+1]; j++)
    y[i] += A(i, col[j])
  end
end
```


## Du COO au CSR

TODO:

Afin de ne pas perdre en efficacité, il est nécessaire de **connaître à l'avance l'emplacement des coefficients non nuls** de la matrice afin de pouvoir la stocker sous format CSR. Ce format n'est pas adapté pour modifier ou construire une matrice "à la volée", contrairement au format COO. Une stratégie intéressante consiste à utiliser le format COO pour construire la matrice, puis, avant de lancer les solveurs linéaires, de transformer la matrice au format CSR.

Ce n'est pas le plus efficace, mais le pseudo-code suivant permet de passer du COO au CSR, en supposant disposer d'une fonction permettant de trier et fusionner les éventuelles redondances dans les tableaux `raw`, `col` et `val` de A :

```
MatriceCOO A // COO
MatriceCSR B // CSR
// Tri des tableaux de A
A.sort()
nnz = A.nnz // Nombre de coefficients non nul
// Construction de B
B.raw.resize(N+1)
B.col.resize(nnz)
B.val.resize(nnz)
iraw = 0  //numéro de la ligne scannée
ncoef = 0 //nombre de coef sur la ligne en cours
B.raw[0] = 0
B.col = A.col
B.val = A.val
for (i = 0; i < nnz; i ++)
  if(A.raw[i] > iraw) //changement de ligne
    //Nous supposons qu'aucune ligne de A est nulle (sinon A est non inversible)
    iraw = iraw++ // Ligne suivante
    B.raw[iraw] = B.raw[iraw-1] + ncoef
    ncoef = 0 // remise à zéro du compteur
  endif
end
```