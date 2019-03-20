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
  name = "Formats COO et CSR"
  weight = 10

+++

$\newcommand{\nnz}{\texttt{nnz}}$

## Objectifs

- Comprendre les formats COO et CSR
  
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
L'avantage de ce format est la facilité d'implémentation et la possibilité d'ajouter des coefficients "à la volée". En effet, les tableaux `row`, `col` et `val` n'ont pas besoin d'être triés selon l'ordre indices. 

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

{{% alert note %}}
Même si cela n'est pas nécessaire a priori, les trois tableaux sont souvent classés de sorte que `row` est croissant et `col` est "croissant par morceaux" (ou "croissant par ligne"). Autrement dit, les trois tableaux sont ordonnés selon les lignes.
{{% /alert %}}

### Doublons


Le format COO peut autoriser les doublons, c'est-à-dire des coefficients ayant les mêmes indices ligne et colonne qu'un autre. En reprenant l'exemple ci-dessus et en divisant le dernier coefficient en deux, nous pourrions obtenir le stockage suivant :

| Indice | 0   | ... | 8   | 9   | 10  |
| ------ | --- | --- | --- | --- | --- |
| `row`  | 0   | ... | 4   | 4   | 4   |
| `col`  | 0   | ... | 2   | 3   | 3   |
| `val`  | 3   | ... | 10  | 1   | 3   |


{{% alert warning %}}
Dans notre implémentation et pour simplifier, nous n'autoriserons pas les doublons !
{{% /alert %}}

### Du COO au Dense

Pour reconstuire la matrice sous format dense, le pseudo-code ci-dessous fonctionnerait et autorise d'avoir une dupplication de coefficients (du fait du `+=` ):

```
A = zeros(N,N)
for (i = 0; i < row.size(); i++)
  A(row[i], col[i]) = val[i]
end
```

{{% alert note %}}
En cas de doublon de coefficient, il suffirait d'utiliser `+=` plutôt que le signe `=`. Cependant, nous n'autoriserons pas les doublons pour faciliter le convertisseur vers [le format CSR]({{<relref "#du-coo-au-csr">}}).
{{% /alert %}}

### Produit Matrice-Vecteur

Un pseudo code serait le suivant :

```
// y = A*x
y = zeros(n) // vecteur nul
for (i = 0; i < n; i++)
  y[row[i]] += val[i] * x[col[i]]
end
```

### Triplets

Plutôt que 3 tableaux, une matrice au format COO peut aussi être stockée sous forme d'un tableau de triplets (i,j,val), ce qui donnerait pour la matrice \eqref{eq:matA} :

| Indice   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Triplets | [0,0,3]   | [0,3,2]   | [0,4,1]   | [1,2,5]   | [1,3,8]   | [2,1,1]   | [2,2,2]   | [3,2,9]   | [4,2,10]   | [4,3,4]   |

### Conclusion

Le format COO est très souple et permet de construire une matrice aisément, cependant il présente les défauts suivants :

- Deux adressages indirects sont nécessaires pour effectuer le produit matrice vecteur
- Les accès aux données ne sont pas *a priori* connus
- Absence de méthode rapide pour obtenir un terme de la matrice connaissant ses indices ligne et colonne 

Dans la pratique, le format COO est souvent utilisée comme format "tampon" pour stocker la matrice au format CSR, bien plus efficace pour les opérations d'algèbre linéaire. Le stockage **sous forme de triplets** est alors le plus pratique.

## Format CSR

### Principe

Le format CSR est spécialisé dans les opérations d'algèbres linéaires et pallie les défauts du COO. Son nom vient du fait que le tableau `row` est *compressé*. Une matrice au format CSR est composée des deux tableaux `col` et `val`, comme pour le COO et ordonnés par "lignes", et le tableau `row` est défini ainsi : 

- Sa **taille est fixée à n+1** (n=nombre de lignes de la matrice)
- **`row[i]`** est maintenant **l'indice du premier élément non nul de la ligne `i` dans les tableaux `col` et `val`**

Par exemple, le stockage CSR de la matrice \eqref{eq:matA} est :

| Indice | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `row`  | 0   | 3   | 5   | 7   | 8   | 10  |     |     |     |     |
| `col`  | 0   | 3   | 4   | 2   | 3   | 1   | 2   | 2   | 2   | 3   |
| `val`  | 3   | 2   | 1   | 5   | 8   | 1   | 2   | 9   | 10  | 4   |

Le tableau `row` est **compressé** par rapport au format COO puisque sa taille est maintenant de n+1, bien inférieure à `nnz` ! Sur une petite matrice, le gain mémoire est très faible, mais sur une matrice à plusieurs millions d'entrée, cette stratégie devient payante. D'autre part, l'absence de doublon de coefficients et le fait que les tableaux sont triés permettent d'améliorer significativement les opérations d'algèbres linéaires.

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
    // Parcours des indices colonnes de la ligne i
    y[col[j]] = val[j];
  end
end
```

Nous noterons que, cette fois-ci, les coefficients des vecteurs sont parcourus consécutivement.

### Conclusion

Le format CSR est rigide : il est très coûteux d'ajouter des éléments dans la matrice. Ainsi et afin de ne pas perdre en efficacité, il est nécessaire de **connaître à l'avance l'emplacement des coefficients non nuls** de la matrice avant de la construire. En revanche, une fois construire, cette forme de stockage est très efficace.


## Du COO au CSR

### Principe

La souplesse du format COO permet de construire la matrice en ajoutant les triplets des coefficients (i,j,val) au fur et à mesure. Ensuite, une fois tous les triplets sauvegardés, ils sont triés (ou *assemblés*) et les doublons fusionnés. Il ne reste alors plus qu'à extraire les tableaux `row`, `col` et `val` du tableau de triplets et à compresser le vecteur `row` pour obtenir une matrice CSR.


{{< figure src="../coo_to_csr.svg" title="Construction de matrices COO à l'aide de Triplet et convertisseur en CSR" numbered="true" >}}


### Utilisation

En supposant les fonctions existantes, le pseudo-code suivant permet de passer d'une matrice A au format COO à une matrice B au format CSR :

```
MatriceCOO A(n) // COO
MatriceCSR B(n) // CSR
// Ajout des triplets
A.add(0,0,2.);
A.add(0,1,-1.1);
[...]
// Tri du tableau de triplets et fusion des doublons
A.sort();
// Convertisseur en CSR
B = A.to_csr();
```

