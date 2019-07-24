+++
title = "Analyse Numérique"

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
  name = "Analyse Numérique"
  weight = 10

+++

## Objectifs

Pour les différentes méthodes itératives standards, nous souhaitons comparer :

1. **Estimer la vitesse de convergence** (*ie* le nombre d'itérations) 
2. **Comparer cette estimation** à celle **obtenue numériquement**


## Problème modèle

Nous disposons maintenant d'une implémentation des trois principales méthodes itératives standards : nous devons maintenant les analyser et les comparer. Pour cela, nous utilisons la matrice $A\_N$ de taille $N\times N$:
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

Les $N$ valeurs propres de la matrice $A\_N$ sont données par, pour $k=1,\ldots, N$ :
$$
\lambda\_k = 4 \sin^2\left(\frac{k\pi}{2(N+1)}\right).
$$
En notant $L :=M^{-1}(M - A) = I - M^{-1}A$ la matrice d'itération de la méthode itérative (Jacobi, Gauss-Seidel, Relaxation) et $\rho(L)$ son [rayon spectral](https://en.wikipedia.org/wiki/Spectral_radius), alors pour atteindre une erreur relative de $\varepsilon$, le nombre d'itérations estimé est donné par la formule :
\begin{equation}\label{eq:niter}
  n_{iter} = \frac{{ \ln}(\varepsilon)}{{ \ln}(\rho(L))},
\end{equation}

En particulier, si nous connaissons le rayon spectral de la matrice d'itération, alors nous disposons d'une estimation du nomre d'itérations nécessaires pour aboutir à la convergence.

{{% alert tips %}}
Notez que cette matrice $A\_N$ fait partie [des matrices de test régulière]({{<relref "dense_matrices_test.md">}}). 
{{% /alert %}}


## Méthode de Jacobi

### Nombre d'itérations : analytique

Nous cherchons à estimer le nombre d'itérations de la méthode pour une tolérance $\varepsilon$ donnée, tout d'abord pour la méthode de Jacobi. Pour cette technique, nous rappelons que $M = {\rm diag}(A)$ ce qui, dans notre cas, se simplifie par $M = \frac{1}{2}I$ où $I$ est la matrice identité. La matrice d'itération $J$ est alors donnée par :
$$
J = I - ({\rm diag}(A))^{-1}A = I - \frac{1}{2}A.
$$ 
Les valeurs propres $\mu\_k(J)$ de $J$ vérifient donc $\mu\_k(J) = 1 -\frac{\lambda\_k}{2}$. En utilisant la propriété 
$$
\sin^2\left(\frac{k\pi}{N+1}\right) = \frac{1-\cos\left({\frac{k\pi}{N+1}}\right)}{2},
$$
nous obtenons l'expression des valeurs propres de $J$ :
$$
\mu\_k(J) = \cos\left(\frac{k\pi}{N+1}\right).
$$
Ensuite, en utilisant le fait que $\cos(\pi - x) = \cos(x)$, nous en déduisons le rayon spectral de $J$ :
\begin{equation}
\label{eq:rhoj}
\rho(J) = \cos\left(\frac{\pi}{N+1}\right).
\end{equation}
Nous en déduisons le nombre d'itérations :
\begin{equation}
\label{eq:iterJanalytique}
n\_{iter}(J) = \frac{\ln(\varepsilon)}{\ln\left(\cos\left(\frac{\pi}{N+1}\right)\right)}.
\end{equation}

### Nombre d'itérations : estimation par DL

L'expression \eqref{eq:iterJanalytique} est très précise mais difficilement interprétable pour les humains que nous sommes. Nous calculons ici une estimation de cette estimation. Pour cela, après avoir appliqué [un développement limité de Taylor](http://www.h-k.fr/publications/data/adc.ps__annexes.maths.pdf) à l'ordre 2 de $\rho(J)$ lorsque $N\to+\infty$, nous obtenons :
$$
\rho(J) = 1 - \frac{\pi^2}{2(N+1)^2} + O\left(\left(\frac{1}{N+1}\right)^4\right).
$$
En reportant cette relation dans l'équation \eqref{eq:niter}, nous en déduisons une estimation du nombre d'itérations :
\begin{equation}
\label{eq:iterJ}
n\_{iter}(J) \simeq - 2\frac{\ln(\varepsilon)}{\pi^2}(N+1)^2.
\end{equation}

{{% alert exercise %}}
Optionnel : refaites les calculs.
{{% /alert %}}

### Comparaison des estimations avec le numérique

Nous fixons la tolérance $\varepsilon = 10^{-1}$ et le nombre maximal d'itérations $n\_{max} = 10^5$. Nous pouvons calculer deux estimations du nombre d'itérations nécessaires : 

1. "Analytique" : l'équation \eqref{eq:iterJanalytique}
2. "DL" : l'équation \eqref{eq:iterJ} 

Ensuite, nous pouvons bien entendu calculer le nombre d'itérations de manière numérique (*ie* : en pratique par l'ordinateur) et comparer avec les estimations.

{{% alert exercise %}}
Pour $N=10$, $50$ et $N=100$, calculez ces trois valeurs : estimation "analytique", estimation "Dév. Lim." et le nombre d'itérations obtenu numériquement :

| Nb. d'iterations...   | Analytique \eqref{eq:iterJanalytique}  | "DL" \eqref{eq:iterJ}   | Numérique  |
| --- | --- | --- | --- |
| $N = 10$    | ?  | ? |?  |
| $N = 50$    | ? | ? | ? |
| $N = 100$    | ? |?  | ? |

Que pouvez-vous en conclure sur les estimations du nombre d'itérations ? Est-ce que \eqref{eq:iterJ} est satisfaisante et si oui, à partir de quelle valeur de $N$ ? 
{{% /alert %}}


### Méthode de Gauss-Seidel

Comme la matrice $A_N$ est tri-diagonale, le rayon spectral de la matrice de Gauss-Seidel $\rho(G)$ est donnée par $\rho(G) = \rho(J)^2$. Nous pouvons ainsi en déduire :

$$
\begin{array}{r c l}
\rho(G) &=&\displaystyle \rho(J)^2 \\\\\\
&=&\displaystyle \cos\left(\frac{\pi}{N+1}\right)^2\\\\\\
&=&\displaystyle  \left(1 - \frac{\pi^2}{2(N+1)^2} + O\left(\left(\frac{1}{N+1}\right)^4\right)\right)^2\\\\\\
&=&\displaystyle  1 - \frac{\pi^2}{(N+1)^2} + O\left(\left(\frac{1}{N+1}\right)^4\right)
\end{array}
$$
Nous pouvons alors en déduire une estimation du nombre d'itérations :
\begin{equation}
\label{eq:iterG}
n\_{iter}(G) \simeq - \frac{\ln(\varepsilon)}{\pi^2}(N+1)^2 \simeq \frac{n\_{iter}(J)}{2}.
\end{equation}

{{% alert exercise %}}
Comparez le nombre d'itérations théoriques, estimés et pratiques pour $N=10$, $50$ et $N=100$.
{{% /alert %}}


### Méthode de Relaxation

Pour la méthode de relaxation, comme $A\_N$ est triagonale alors le paramètre optimal $\omega^\*$ pour la méthode de relaxation est donné par
$$
\omega^\* = \frac{2}{1 + \sqrt{1 - \rho(J)^2}},
$$
et le rayon spectral de la matrice d'itération est alors donné par $\rho(G\_{\omega^\*}) = \omega^\* - 1$.  Ci-dessous une courbe du rayon spectrale en fonction de $\omega$ pour $N=10$ :

<div id="relaxation"></div>

{{% alert note %}}
Pour $\omega \geq \omega^\*$, nous avons $\rho(G\_{\omega}) = \omega - 1$. La courbe ci-dessus montre qu'il est préférable de choisir $\omega$ légèrement plus grand que $\omega^\*$ plutôt que plus petit.
{{% /alert %}}

Quand $N\to+\infty$, nous obtenons le développement limité de $\omega^\*$ :
$$
\omega^\* = 2\left(1 - \frac{\pi}{N+1}  \right)+O\left(\left(\frac{1}{N+1}\right)^2\right).
$$
Nous pouvons en déduire une estimation du nombre d'itérations

\begin{equation}
\label{eq:iterR}
n\_{iter}(G\_{\omega^\*}) \simeq - \frac{\ln(\varepsilon)}{\pi^2}(N+1).
\end{equation}
La dépendance en $N$ est maintenant linéaire et non plus quadratique !

{{% alert exercise %}}
Comparez le nombre d'itérations théoriques, estimés et pratiques pour $N=10$, $50$ et $N=100$.
{{% /alert %}}

<script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script type="text/javascript" src="../relaxation.js"></script>
