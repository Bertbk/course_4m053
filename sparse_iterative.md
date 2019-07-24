+++
title = "Gradient Conjugué Creux"

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
  parent = "sparse_matrices"
  name = "Gradient Conjugué Creux"
  weight = 50

+++

## Objectifs

- Implémenter le Gradient Conjugué prenant en charge une matrice CSR
- Comparer les temps CPU entre le Gradient Conjugué "Dense" et "CSR"


## Gradient Conjugué "Creux"

### Implémentation

La méthode du Gradient Conjugué nécessite, à chaque itération, un produit matrice-vecteur et aucune inversion de matrice. Nous pouvons implémenter très facilement une version *creuse* du Gradient Conjugué. Sous réserve de disposer d'une classe `MatriceCSR` fonctionnelle et utilisant le **même nom pour le produit matrice vecteur** que la classe `Matrice`, alors la seule différence entre la version *dense* et *creux* du Gradient Conjugué est le type du paramètre `const Matrice & A_` qui devient `const MatriceCSR &A_`.


{{% alert exercise %}}
Implémenter une nouvelle classe pour résoudre le Gradient Conjugué dont la matrice est au format CSR.
{{% /alert %}}


{{% alert tips %}}
[Le templating](openclassrooms.com/courses/c-les-templates) de votre classe du Gradient Conjugué est possible mais alors il faut fusionner le fichier `.cpp` dans le `.hpp`.
{{% /alert %}}


### Performances

{{% alert exercise %}}
Comparez les performances, en terme de temps CPU, entre la méthode du Gradient Conjugué *dense* et *creux* pour une matrice de taille suffisamment importante.
{{% /alert %}}

{{% alert tips %}}
Le nombre d'itérations entre la version Dense et Creuse doit être exactement le même !
{{% /alert %}}