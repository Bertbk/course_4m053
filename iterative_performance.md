+++
title = "Comparaison des Performances"

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
  name = "Comparaison des Performances"
  weight = 20

+++
{{% alert warning%}}
En cours de construction...
{{% /alert %}}

## Objectifs

Pour les différentes méthodes itératives standards, nous souhaitons comparer :

1. Les **historiques de convergence** 
2. Le **temps CPU** (*time to solution*)

## Calcul du temps CPU

TODO:

## JSON: de C++ à Python

### Format JSON

Pour simplifier, [le format JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) est un format spécialisé dans le transfert de données. À chaque clé (*key*) est associée une valeur ou un tableau de valeurs. Vous pouvez ajouter autant de clés que vous le voulez. 

Par exemple, imaginons que l'on ait lancé une résolution avec $N=4$, la méthode de Jacobi, que notre vecteur `resvec_` contiennent trois valeures (au hasard) et le tout avec un temps CPU de 3.2s. Notre fichier de sortie pourrait ressembler à celui-ci (rappel : les valeurs ont été choisies au hasard):

```json
{ "method": "jacobi" }
{ "N": 4}
{ "niter": 3 }
{ "resvec": [ 12.1, 8.2, 5.4, 3.2] }
{ "cpu_time": 3.2 }
```

Un tel format présente l'avantage d'être lisible par Python à travers certaines bibliothèques. En particulier, [les scripts mis à dispositions]({{< relref "help_matplotlib.md" >}}) peuvent lire un tel fichier au format JSON et affiche la courbe associée à `resvec` en échelle logarithmique. Vous pouvez alors librement l'adapter pour afficher une autre quantité.

### *Writer* JSON
TODO: Dans un fichier à part, par exemple `src/JSON.cpp` (et `include/JSON.hpp`), créez une classe `JSON` permettant d'écrire des données à la suite.

### Données de sortie

Ajoutez une fonction membre à vos classes de méthode itérative pour écrire un fichier de sortie JSON contenant les données que vous souhaitez. Réutilisez bien entendu votre *writer* écrit précédemment.


## Problème modèle

Nous utilisons toujours la matrice $A\_N$ de taille $N\times N$:
$$
A\_N =
\begin{pmatrix}
  2 & -1 & 0 & 0 & \ldots & 0 & 0\\\\\\
  -1 & 2 & -1 &  0 & \ldots & 0 & 0\\\\\\
    0 & -1 & 2 & -1 & \ldots & 0 & 0 \\\\\\
    \vdots & \ddots& \ddots& \ddots & \ldots & \vdots  & \vdots\\\\\\
    0 & 0 & 0 & 0 & \ldots & -1 & 2 \\\\\\
\end{pmatrix}
$$


## Temps CPU

Adaptez les fonctions membres `Solve()` de chaque classe de méthode itérative pour pouvoir calculer le temps d'exécution de la résolution. **Vous pouvez bien entendu ajouter des paramètres/méthodes si vous le désirez**.

Naturellement, vous pouvez réutiliser le code TODO:. 


## Historiques de Convergence

Nous considérons une matrice $A\_N$ de taille $200$ et un vecteur membre de droite $b$ rempli de $1$. Dans cet exercice, nous fixons de plus la tolérance à $10^{-1}$ et le nombre d'itérations maximal de 20000.

{{% alert exercise %}}
Sur une même figure, affichez les courbes "norme du résidu" (normalisé \eqref{eq:rel}) en fonction du "numéro de l'itération" pour chaque méthode itérative. Cette figure s'appelle **l'historique de convergence**.

Quelle méthode itérative est la plus rapide (en terme de nombre d'itérations) ?
{{% /alert %}}

TODO: figure ?

## Temps CPU

{{% alert exercise %}}
Pour $N=10$ à $200$, avec un pas de $10$, calculez le temps CPU (en secondes) pour chaque méthode itérative. Affichez sur une même figure chaque courbe "temps CPU (s)" en fonction du "numéro de l'itération".

Quelle méthode itérative est la plus rapide (en terme de temps CPU) ?
{{% /alert %}}

TODO: figure ?
