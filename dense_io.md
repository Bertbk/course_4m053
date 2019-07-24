+++
title = "Input / Output"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "dense"
  identifier = "io_denses"
  name = "I/O"
  weight = 25

+++

## Objectifs

1. Construire des `Vecteur` à partir d'un fichier
2. De même pour les `Matrice`

## Problématique

Construire des `Vecteur` et des `Matrice` est maintenant possible via les opérateurs parenthèses :

```cpp
Matrice A(5);
A(0,0) = 2;
A(0,1) = -1;
...
```

Cette méthode peut s'avérer longue, notamment pour construire des matrices sans réelles *pattern* (ou schéma) pour lesquelles l'automatisation peut s'avérer compliquée. D'autre part, la matrice peut avoir été construire *via* un autre logiciel ou une autre source comme [Matrix Market](https://math.nist.gov/MatrixMarket/).

## `Vecteur`

Nous proposons le format de fichier à deux colonnes : 

- Sur la première ligne est indiqué le nombre de lignes du `Vecteur`
- Puis, première contenant les indices lignes et la seconde les coefficients. 
- **Seuls les coefficients non nuls sont indiqués !** 
  
Par exemple pour le vecteur $[1, 1.1, 1.2, 1.3, 0, 1.4]^T$ 

```
6
0 1.
1 1.1
2 1.2
3 1.3
5 1.4
```

## `Matrice`

Nous proposons le format similaire à [celui de Matrix Market](https://math.nist.gov/MatrixMarket/formats.html#mm). Similaire aux `Vecteur`, nous avons :

- La première ligne contient le nombre de lignes de la `Matrice`
- Chaque ligne est composées de trois nombres : indice ligne, indice colonne et la valeur du coefficient. 
- **Seuls les coefficients non nuls sont indiqués !** 

Par exemple pour la matrice suivante :
$$
A = \begin{pmatrix}
1.1 & 2. & 0\\\\\\
0 & 5 & 0 \\\\\\
0 & 2.3 & 3 
\end{pmatrix}
$$
serait sauvegardée dans le fichier suivant :

```
3
0 0 1.1
0 1 2.
1 1 5.
2 1 2.3
2 2 3.
```



## Implémentation

Pour les classes `Matrice` et `Vecteur`, nous vous conseillons vivement d'implémenter des méthodes permettant de :

1. Lire des fichiers aux formats présentés plus haut et modifier l'objet appelant en fonction
2. Sauvegarder une `Matrice` ou un `Vecteur` sur disque au format proposé (pour une réutilisation future)

Vous pouvez aller plus loin en implémentant un constructeur qui prend en argument un nom de fichier et construit la `Matrice` ou le `Vecteur` associé. Il s'utiliserait alors de la façon suivante (exemple !) :

```cpp
Matrice A("laplacien_A.txt");
Vecteur b("laplacien_b.txt");
```