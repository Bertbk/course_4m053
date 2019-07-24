+++
title = "Gradient Conjugué"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true

weight = 260
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "krylov_solvers"
  name = "Gradient Conjugué"
  weight = 10

+++

## Objectifs

- Implémenter la méthode du Gradient Conjugué
- Ajouter un éventuel préconditionneur
- Comparer les performances


## Méthode du Gradient Conjugué

### Pseudo-code

Remarque : `(z,r)` représente le produit scalaire en `z` et `r`.

```
x_0 = 0
r_0 = b - A*x_0
p_0 = r_0
k = 0
while (|r| / |b| > tolerance && k < nmax)
  k++
  alpha_k = |r_k|²/(p_k, A*p_k)
  x_{k+1} = x_k + alpha_k * p_k
  r_{k+1} = r_k - alpha_k*(A*p_k)
  beta_k  = |r_{k+1}|²/|r_k|²
  p_{k+1} = r_{k+1} + beta_k*p_k
end
return x_{k+1}
```

## Implémentation

Implémentez la méthode du Gradient Conjugué. Validez ensuite votre code la sur la [matrice du Laplacien]({{<relref "dense_matrices_test.md">}}).

## Comparaison  des performances

### Entre solveur 

{{% alert exercise %}}
Pour une tolérance de 0.1, une taille de matrice N = 1000 et un nombre maximal d'itération égal à N, affichez les historiques de convergence du gradient conjugué et des autres méthodes itératives. Comparez également le temps CPU entre les différentes méthodes.
{{% /alert %}}

Vous devriez obtenir des résultats similaires à ceux ci-dessous (sauf pour le temps CPU !) :

<div id="convergence_history"></div>

{{% div id="table_cg"%}}
| Méthode             |     |     |     |     |
| ------------------- | --- | --- | --- | --- |
| Nombre d'itérations |     |     |     |     |
| Temps CPU (s)       |     |     |     |     |
{{% /div %}}




### En fonction de la taille de la matrice


{{% alert exercise %}}
Pour une tolérance de 0.001 et une taille N = 100, 200, ..., 1000, affichez le nombre d'itérations requises par le gradient conjugué ainsi que le temps CPU.
{{% /alert %}}

Vous devriez obtenir des résultats proches de ceux-ci (sauf pour le temps CPU) :

| N                   | 100    | 200   | 300   | 400   | 500   | 600   | 700    | 800    | 900    | 1000   |
| ------------------- | ------ | ----- | ----- | ----- | ----- | ----- | ------ | ------ | ------ | ------ |
| Nombre d'itérations | 50     | 100   | 150   | 200   | 250   | 300   | 350    | 400    | 450    | 500    |
| Temps CPU (s)       | 0.0534 | 0.178 | 0.613 | 1.429 | 3.303 | 7.485 | 11.771 | 15.939 | 24.415 | 34.409 |


<script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script type="text/javascript" src="../cg.js"></script>

