+++
title = "Matrice Test"

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
  parent = "dense"
  identifier = "matrices_denses_test"
  name = "Matrice Test"
  weight = 25

+++

## Objectif

Implémenter des fonctions permettant de construire rapidement des matrices de test.

## Matrice du Laplacien

Afin de valider nos solveurs linéaires, nous avons besoin d'une matrice teste. Nous faisons le choix de la matrice tribande symétrique et définie positive $A\_N$ de taille $N\times N$ :

\begin{equation}
\label{eq:LapN}
A\_N =
\begin{pmatrix}
  2 & -1 & 0 & 0 & \ldots & 0 & 0\\\\\\
  -1 & 2 & -1 &  0 & \ldots & 0 & 0\\\\\\
    0 & -1 & 2 & -1 & \ldots & 0 & 0 \\\\\\
    \vdots & \ddots& \ddots& \ddots & \ldots & \vdots  & \vdots\\\\\\
    0 & 0 & 0 & 0 & \ldots & -1 & 2 \\\\\\
\end{pmatrix}
\end{equation}

{{% alert exercise %}}

Implémenter une fonction renvoyant une `Matrice`, prenant en argument $N$ et retournant la matrice $A\_N$ donnée par \eqref{eq:LapN}. Plutôt qu'une fonction, vous pouvez implémenter une méthode de la classe `Matrice` modifiant la Matrice appelante par $A\_N$.
{{% /alert %}}