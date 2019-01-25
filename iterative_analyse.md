+++
title = "Analyse"

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
  name = "Analyse"
  weight = 10

+++

## Objectif

Pour les différentes méthodes itératives standards, nous souhaitons comparer :

1. La **vitesse de convergence** 
2. Le **temps CPU** (*time to solution*)



#### Méthodes d'affichage

Pensez à ajouter des fonctions membres permettant de :

- Afficher le nombre d'itérations (après résolution).
- Afficher le vecteur `resvec_`, ou plutôt le stocker sur disque [au format JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation). 

Pour simplifier, le format JSON est un format de transfers de données. À chaque clé (*key*) est associé une valeur ou un tableau de valeurs. Vous pouvez ajouter autant de clés que vous le voulez. Par exemple, le fichier de sortie pourrait ressembler à celui-ci (valeurs choisies au hasard !):

```json
{ "method": "jacobi" }
{ "niter" : 3 }
{ "resvec": [ 12.1, 8.2, 5.4, 3.2]}
```
[Les scripts mis à dispositions]({{< relref "help_matplotlib.md" >}}) permettent de lire un fichier au format JSON et d'afficher la courbe associée à un tableau. Nous serons par exemple intéressés pour afficher la courbe $\log\_{10}($`resvec_`$)$ en fonction du numéro de l'itération. 

## Vitesse de Convergence

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



### Méthode de Jacobi

Nous cherchons à estimer le nombre d'itérations de la méthode pour une tolérance $\varepsilon$ donnée, tout d'abord pour la méthode de Jacobi. Pour cette technique, nous rappelons que $M = {\rm diag}(A)$ ce qui, dans notre cas, ce simplifie par $M = \frac{1}{2}I$ où $I$ est la matrice identité. La matrice d'itération $J$ est alors donnée par :
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
Avec cette expression, nous pouvons calculer une estimation théorique du nombre d'itérations nécessaires à la convergence. Cependant, nous pouvons également obtenir une estimation plus facile à calculer (et à interpréter). Pour cela, après avoir appliqué [un développement limité de Taylor](http://www.h-k.fr/publications/data/adc.ps__annexes.maths.pdf) à l'ordre 2 de $\rho(J)$ lorsque $N\to+\infty$, nous donne :
$$
\rho(J) = 1 - \frac{\pi^2}{2(N+1)^2} + O\left(\left(\frac{1}{N+1}\right)^4\right)
$$
Enfin, utilisant l'équation \eqref{eq:niter}, nous en déduisons une estimation du nombre d'itérations :

{{% boxed red %}}
\begin{equation}
\label{eq:iterJ}
n\_{iter}(J) \simeq - 2\frac{\ln(\varepsilon)}{\pi^2}(N+1)^2.
\end{equation}
{{% /boxed %}}

{{% alert exercise %}}
Optionnel : refaites les calculs.
{{% /alert %}}

Nous fixons la tolérance $\varepsilon = 10^{-1}$ et le nombre maximal d'itérations $n\_{max} = 10^5$. Nous pouvons calculer deux estimations du nombre d'itérations nécessaires : 

1. "Analytique" : en utilisant les expressions \eqref{eq:niter} et \eqref{eq:rhoj}
2. "Dév. Lim." : en appliquant \eqref{eq:iterJ} obtenue par développement limité. 

Ensuite, nous pouvons bien entendu calculer le nombre d'itérations nécessaires numériquement (*ie* : en pratique par l'ordinateur) et comparer avec les estimations.

{{% alert exercise %}}
Pour $N=10$, $50$ et $N=100$, calculez ces trois valeurs : estimation "analytique", estimation "Dév. Lim." et le nombre d'itérations obtenu numériquement :

| Nb. d'iterations...   | Analytique (\eqref{eq:niter} +\eqref{eq:rhoj})  | "Dév. Lim." \eqref{eq:iterJ}   | Numérique  |
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
{{% boxed red %}}
\begin{equation}
\label{eq:iterG}
n\_{iter}(G) \simeq - \frac{\ln(\varepsilon)}{\pi^2}(N+1)^2 \simeq \frac{n\_{iter}(J)}{2}.
\end{equation}
{{% /boxed %}}

{{% alert exercise %}}
Comparez le nombre d'itérations théoriques, estimés et pratiques pour $N=10$, $50$ et $N=100$.
{{% /alert %}}


### Méthode de Relaxation

Pour la méthode de relaxation, le rayon spectral de la matrice d'itération $G\_{\omega}$ est donnée par $\rho(G\_{\omega}) = \omega - 1$. D'autre part, comme $A\_N$ est symétrique définie positive, alors le paramètre optimal $\omega^\*$ pour la méthode de relaxation est donné par
$$
\omega^* = \frac{2}{1 + \sqrt{1 - \rho(J)^2}}.
$$
Quand $N\to+\infty$, nous obtenons le développement limité de $\omega^\*$ :
$$
\omega^\* = 2\left(1 - \frac{\pi}{N+1}  \right)+O\left(\left(\frac{1}{N+1}\right)^2\right).
$$
Nous pouvons en déduire une estimation du nombre d'itérations

{{% boxed red %}}
\begin{equation}
\label{eq:iterR}
n\_{iter}(G\_{\omega^\*}) \simeq - \frac{\ln(\varepsilon)}{\pi^2}(N+1).
\end{equation}
{{% /boxed %}}
La dépendance en $N$ est maintenant linéaire et non plus quadratique !

{{% alert exercise %}}
Comparez le nombre d'itérations théoriques, estimés et pratiques pour $N=10$, $50$ et $N=100$.
{{% /alert %}}

### Comparaison et conclusion

{{% alert exercise %}}
Des trois méthodes, quelle est la plus rapide en terme de nombre d'itérations ?
{{% /alert %}}


<!--
### Méthode de Richardson

Pour une matrice définie positive, le pas optimal $\alpha$ est donné par
$$
\alpha = \frac{2}{\lambda_{min} + \lambda_{max}},
$$
où $\lambda_{min}$ et $\lambda_{max}$ sont respectivement les plus petites et plus grandes valeurs propres de la matrice du système linéaire.

{{% alert exercise %}}
Calculez analytiquement le pas optimal $\alpha$ et, à l'aide des calculs précédents, en déduire le comportement de la méthode de Richardson.
{{% /alert %}}

-->

## Comparaison des méthodes

### Préparation des Classes

#### Temps CPU

Adaptez les fonctions membres `Solve()` de chaque classe de méthode itérative pour pouvoir calculer le temps d'exécution de la résolution. **Vous pouvez bien entendu ajouter des paramètres/méthodes si vous le désirez**.

Naturellement, vous pouvez réutiliser le code TODO:. 

#### Norme de résidu

À chaque itération, nous calculons la norme de $\|r\|$ et nous souhaitons la stocker dans `resvec`. Cependant, plutôt que de stocker cette valeur, il est préférable de stocker sa valeur normalisé et pris en logarithme (nous l'appelerons *résidu relatif*): 
\begin{equation}
\label{eq:rel}
\text{Résidu relatif} = \log\_{10}\left(\frac{\\|r\\|}{\\|b\\|}\right).
\end{equation}

{{% alert exercise %}}
Adaptez les fonctions membres `Solve()` de chaque classe de méthode itérative pour que :

- Le temps d'exécution de la méthode soit calculé et stocké dans un paramètre
- Le tableau paramètre `std::vector<double> resvec` contienne  les résidus relatifs \eqref{eq:rel} de chaque itération

**Vous pouvez bien entendu ajouter des paramètres/méthodes si vous le désirez**, notamment pour **afficher** ou avoir **accès** à ces valeurs.

{{% /alert %}}

### Historique de Convergence

Nous considérons une matrice $A\_N$ de taille $200$ et un vecteur membre de droite $b$ rempli de $1$. Dans cet exercice, nous fixons de plus la tolérance à $10^{-1}$ et le nombre d'itérations maximal de 20000.

{{% alert exercise %}}
Sur une même figure, affichez les courbes "norme du résidu" (normalisé \eqref{eq:rel}) en fonction du "numéro de l'itération" pour chaque méthode itérative. Cette figure s'appelle **l'historique de convergence**.

Quelle méthode itérative est la plus rapide (en terme de nombre d'itérations) ?
{{% /alert %}}

TODO: figure ?

### Temps CPU

{{% alert exercise %}}
Pour $N=10$ à $200$, avec un pas de $10$, calculez le temps CPU (en secondes) pour chaque méthode itérative. Affichez sur une même figure chaque courbe "temps CPU (s)" en fonction du "numéro de l'itération".

Quelle méthode itérative est la plus rapide (en terme de temps CPU) ?
{{% /alert %}}

TODO: figure ?
