+++
title = "2. Implémentation des Matrices Creuses"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true
weight = 290
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "VIIII. Matrices Creuses"
  name = "2. Implémentation"
  weight = 30

+++

$\newcommand{\nnz}{\texttt{nnz}}$

## Objectifs

- Implémenter les matrices creuses au format COO et CSR


{{% alert warning %}}
Ne vous aventurez pas ici sans avoir lu (et compris) la [section dédiée aux formats COO et CSR]({{< relref "sparse_format.md">}}) !
{{% /alert %}}

{{% alert note %}}
Une classe pour les gouverner toutes ~~et dans les ténèbres les lier~~ ? Vous pouvez utiliser [l'héritage en C++](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c/1898475-decouvrez-lheritage) afin que chaque classe matricielle (dense, COO, CSR) héritent d'une classe mère abstraite. Cependant, pour simplifier, nous proposons, dans un premier temps au moins, de constuire deux classes `MatriceCOO` et `MatriceCSR` distinctes et indépendantes.
{{% /alert %}}

{{% alert warning %}}
Rappelons que **notre** implémentation du COO **n'autorise pas** les doublons !
{{% /alert %}}

La figure suivante rappelle l'agencement de notre code :

{{< figure src="../coo_to_csr.svg" title="Construction de matrices COO à l'aide de Triplet et convertisseur en CSR" numbered="true" >}}

## Classe `Triplet`

Un `Triplet` est défini par 3 valeurs : les indices ligne `i` et colonne `j` ainsi que la valeur du coefficient `val`. Cette classe devra également comporter des opérations de comparaison pour pouvoir trier facilement le vecteur de `Triplet` à l'aide de la méthode `sort` de `std::vector`. Nous définissons ainsi la comparaison entre deux `Triplet` :


```cpp
class Triplet{
  [...]
};
// Surchage des opérations de comparaison
bool operator<(const Triplet &S, const Triplet &T);
bool operator>(const Triplet &S, const Triplet &T);
bool operator==(const Triplet &S, const Triplet &T);
```

{{< thm/thm definition "Comparaison de Triplets" >}}
Soient deux triplets S et T. Nous avons alors :

- $\texttt{S} > \texttt{T}$ si et seulement si
$$
\texttt{S.i} > \texttt{T.i} \text{ ou } (\texttt{S.i} == \texttt{T.i} \text{ et } \texttt{S.j} > \texttt{T.j})
$$
- $\texttt{S} < \texttt{T}$ si et seulement si
$$
\texttt{S.i} < \texttt{T.i} \text{ ou } (\texttt{S.i} == \texttt{T.i} \text{ et } \texttt{S.j} < \texttt{T.j})
$$
- $\texttt{S} == \texttt{T}$ si et seulement si
$$
\texttt{S.i} == \texttt{T.i} \text{ et } \texttt{S.j} == \texttt{T.j}
$$
{{< /thm/thm >}}

Autrement dit, soit les indices lignes sont différents et la comparaison est immédiate, soit les indices lignes sont identiques et on compare les indices colonnes. En cas d'égalité, nous dirons que les Triplets sont identiques, peu importe la valeur de `val`. Cependant, rappelons que ce cas posera des problèmes pour notre implémentation car nous n'autorisons pas les doublons !

{{% alert exercise %}}
Implémentez la classe `Triplet` ainsi que les opérateurs de comparaisons. 
{{% /alert %}}

{{% alert warning %}}
Les opérateurs `<` et `>` ne sont pas opposés : si S < T alors on n'a pas forcément S > T (ils peuvent être égaux) !
{{% /alert %}}

## Classe `MatriceCOO`

Une matrice COO comporte un tableau de `Triplet` (`std::vector<Triplet>`). La méthode qui nous intéresse est `MatriceCOO:to_csr()` qui retourne une matrice au format CSR. 

Nous vous conseillons ici d'implémenter les classes `Triplet` et `MatriceCOO`. Laissez pour le moment la méthode `MatriceCSR MatriceCOO::to_csr()`  de côté mais validez tout le reste (constructeurs, destructeurs, affichage, ...) !

Pensez également à ajouter une méthode ou une fonction permettant de construire facilement [la matrice du Laplacien]({{<relref "dense_matrices_test.md#matrice-du-laplacien">}}).

{{% alert note %}}
Pour afficher une matrice creuse (COO ou CSR), vous pouvez :

- Afficher les Triplet (ou les tableau `row`, `col` et `val`)
- Transformer la matrice au format dense et afficher cette dernière. Cette méthode est clairement peu efficace mais afficher une matrice n'a pas vocation à être performant : c'est utilisé surtout pour débugguer !
{{% /alert %}}

{{% alert note %}}
N'oubliez pas, dans les paramètres de vos matrices creuses, la taille de celle-ci et pourquoi pas le nombre de non-zéros `nnz`.
{{% /alert %}}

## Classe `MatriceCSR`

Principalement, une matrice CSR comporte trois tableaux : `row`, `col` et `val`. 

Implémentez une classe `MatriceCSR` avec notamment et surtout une **surcharge de `operator*` pour le produit Matrice-Vecteur**. Le produit Matrice-Matrice est plus compliqué car on ne connait pas la forme a priori de la Matrice CSR ainsi obtenue.

Vous aurez aussi certainement besoin d'un constructeur prenant trois tableaux `row`, `col` et `val` et les recopiant dans une nouvelle `MatriceCSR`.

Validez naturellement votre code avant de passer à la suite ! Pour vous aider dans cette étape, vous pouvez reprendre la [matrice précédente]({{|relref "sparse_format.md#principe-1"}}) et l'exemple de résultat suivant :
$$
\begin{pmatrix}
  3 & 0 & 0 & 2 & 1 \\\\\\
  0 & 0 & 5 & 8 & 0 \\\\\\
  0 & 1 & 2 & 0 & 0 \\\\\\
  0 & 0 & 9 & 0 & 0 \\\\\\
  0 & 0 & 10& 4 & 0
\end{pmatrix}
\begin{pmatrix}
1.5\\\\\\ 2.5\\\\\\ 3.5\\\\\\ 4.5\\\\\\ 5.5
\end{pmatrix}=
\begin{pmatrix}
19\\\\\\ 53.5\\\\\\ 9.5\\\\\\ 31.5\\\\\\ 53
\end{pmatrix}
$$

## De COO à CSR : `to_csr()`

Nous disposons maintenant de tous les outils pour implémenter la méthode permettant de construire une matrice CSR à partir d'une matrice COO. Nous supposons que la `MatriceCOO` est construite et dispose d'un tableau de `Triplet`. Les deux étapes pour générer une matrice CSR sont :

1. Trier le tableau de `Triplet` par indices de ligne croissants puis indices de colone croissants
2. Extraire les trois tableaux `row`, `col` et `val` du tableau de `Triplet`
3. Compresser le tableau `row`

Pour gagner en rapidité, l'étape de tri peut se faire à l'aide de la fonction `std::sort()` de la bibliothèque `algorithm`. Nous avons implémenter les opérateurs d'ordre `>`, `<` et `==` ce qui permet, en une ligne :

```cpp
std::vector<Triplet> triplets_;
[...]
std::sort(triplets_.begin(), triplets_.end());
```

Les étapes 2 et 3 peuvent être réalisés en même temps durant le parcours du tableau de `Triplet`.

