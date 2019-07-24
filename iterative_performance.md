+++
title = "Comparaison des Performances"

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
  parent = "iterative_solvers"
  name = "Comparaison des Performances"
  weight = 20

+++

## Objectifs

Pour les différentes méthodes itératives standards, nous souhaitons comparer :

1. Les **historiques de convergence**
2. Le **temps CPU** (_time to solution_)

{{% alert tips %}}
Pensez à préparer vos classes/fonctions pour [sortir et traiter vos données]({{< relref "help_format.md">}}).
{{% /alert %}}

## Problème modèle

Nous utilisons toujours la matrice $A\_N$ du Laplacien, [introduite précédemment]({{<relref "dense_matrices_test.md">}}), de taille $N\times N$:

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

Naturellement, vous pouvez réutiliser [le code minimaliste proposé dans ces tps]({{<relref "help_cpu.md">}}).

## Historiques de Convergence

Nous considérons une matrice $A\_N$ de taille $200$ et un vecteur membre de droite $b$ rempli de $1$. Dans cet exercice, nous fixons de plus la tolérance à $10^{-1}$ et le nombre d'itérations maximal de 20000.

{{% alert exercise %}}
Sur une même figure, affichez les courbes de la norme du résidu relatif $\frac{\\|\mathbf{r}\\|}{\\|\mathbf{b}\\|}$ en fonction du numéro de l'itération pour chaque méthode itérative. Cette figure s'appelle **l'historique de convergence**.

Quelle méthode itérative est la plus rapide (en terme de nombre d'itérations) ?
{{% /alert %}}

Vous devriez obtenir une courbe ressemblant à celle ci-dessous :

<div id="convergence_history"></div>

Avec les résultats suivants (**le temps CPU dépend bien évidemment de l'ordinateur** et de l'implémentation !) :

{{% div id="table_iterative_standard" %}}

| Méthode             | Jacobi | Gauss-Seidel | Relaxation (optimal) |
| ------------------- | ------ | ------------ | -------------------- |
| Nombre d'itérations |        |              |                      |
| Temps CPU (s)       |        |              |                      |

{{% /div %}}

## Temps CPU

{{% alert exercise %}}
Pour $N=10$ à $200$, avec un pas de $10$, calculez le temps CPU (en secondes) pour chaque méthode itérative. Affichez sur une même figure chaque courbe ["temps CPU (s)"]({{<relref "help_cpu.md">}}) en fonction du "numéro de l'itération".

Quelle méthode itérative est la plus rapide (en terme de secondes) ?
{{% /alert %}}

<script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script type="text/javascript" src="../standard_iterative.js"></script>
