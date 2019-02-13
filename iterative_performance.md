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

{{% alert note %}}
Pensez à préparer vos classes/fonctions pour [sortir et traiter vos données]({{< relref "help_format.md">}}).
{{% /alert %}}

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
