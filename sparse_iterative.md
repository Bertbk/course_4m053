+++
title = "Méthodes Itératives"

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
  name = "Méthodes Itératives"
  weight = 50

+++

{{% alert warning %}}
En cours de construction !
{{% /alert %}}

## Objectifs

- Implémenter le Gradient Conjugué prenant en charge une matrice CSR
- Comparer les temps CPU entre le Gradient Conjugué "Dense" et "CSR"

{{% alert note %}}
Si le produit matrice-vecteur est surchargé pour les `MatriceCSR` alors vous n'avez qu'à changer le type de la matrice dans votre programme du Gradient Conjugué.

[Le templating](openclassrooms.com/courses/c-les-templates) de votre classe du Gradient Conjugué est possible mais alors il faut fusionner le fichier `.cpp` dans le `.hpp`.
{{% /alert %}}