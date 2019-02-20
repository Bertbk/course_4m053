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
  parent = "direct_solvers"
  identifier = "direct_perf"
  name = "Comparaison des Performances"
  weight = 40

+++

## Objectifs

1. Retrouver les temps de complexité pour la LU et Cholesky
2. Comparer le temps d'exécution entre les factorisations de Cholesky et LU

## Préparation des classes/fonctions/méthodes

### Temps CPU

Nous baserons nos tests sur le temps CPU mis par chaque méthode/fonction de factorisation. Pour cela, modifiez les afins de pouvoir calculer ce temps CPU, [en vous aidant si vous le souhaitez du code minimaliste]({{<relref "help_cpu.md">}}).

### Format de sortie et visualisation

Nosu vous invitons aussi à préparer/modifier vos classes/fonctions/méthodes pour [sortir et traiter vos données]({{< relref "help_format.md">}}). Vous pouvez par exemple ajouter des paramètres `double cpu_lu_` et `double cpu_cholesky_` à votre classe `Matrice` ou calculer directement le temps CPU des factorisations dans la fonction `main` au moment des appels à celles-ci.

## Matrice Test : Laplacien

Nous baserons nos tests sur la [matrice du Laplacien]({{<relref "dense_matrices_test.md">}}) $A\_N$.


{{% alert exercise %}}

Pour N=50, 100, 150, ... (ou autre, à vous de voir!) :

1. Calculez les temps d'exécution pour factoriser chacune des deux méthodes
2. Dessinez les graphes du temps d'exécution par rapport à la taille de la matrice. Placez-vous en échelle logarithmique sur l'axe des abscisse afin de retrouver la complexité des algorithmes ($N^3$ pour les deux).
{{% /alert %}}
