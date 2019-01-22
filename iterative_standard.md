+++
title = "Méthodes Standards"

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
  name = "Méthodes Standards"
  weight = 5

+++

## Objectifs

1. Implémenter toutes les méthodes itératives standards du type Jacobi ou Richardson.
2. Comparer le nombre d’itération de ces méthodes.


##  Algorithme générique

Pour résoudre le problème linéaire $A x= b$, une technique consiste à réécrire la matrice $A$ sous la forme $A = M - (M-A)$, où $M$ est une matrice bien choisie,  et d'appliquer le schéma itératif suivant
\begin{equation}\label{eq:split}
Mx_{n+1} = (M-A)x_n + b
\end{equation}
à convergence, nous retrouvons bien $(M-(M-A))x = Ax = b$.

{{% alert exercise %}}
En introduisant le résidu $r_n := b - Ax_n$, montrez que l'équation \eqref{eq:split} se réécrit :
$$
x_{n+1} = x_n + M^{-1}r_n.
$$
{{% /alert %}}

L'algorithme de résolution décrit par l'équation \eqref{eq:split} s'écrit alors, pour une tolérance $\varepsilon$ et un nombre maximal d'itérations $n_{max}$ donnés :
```
n=0
x = 0
r = b
While((|r| > tolerance * |b|) && (n < n_max))
    y = M^{-1}r
    x = x + y
    r = b - Ax
    n = n+1
```


Pour chaque méthode itérative, nous construirons une classe spécifique.

### Notations

La matrice $A$ se décompose comme $A = D - E -F$, où $D$, $E$ et $F$ sont des matrices de la même taille que $A$ et telles que :
\begin{itemize}[label=\textbullet]
\item $D$ : Matrice ne contenant que les termes diagonaux de $A$
\item $E$ : Matrice ne contenant que \textbf{l'opposé} des coefficients de  partie triangulaire supérieur de $A$
\item $F$ : Matrice ne contenant que \textbf{l'opposé} des coefficients de  partie triangulaire inférieur de $A$
\end{itemize}

\begin{remark}
  \begin{itemize}
  \item   Cette décomposition n'a aucun rapport avec la factorisation $LU$.
    \item Pour plus de lisibilité, il est conseillé de créer un couple de fichier .cpp/.hpp par méthode itérative (par exemple \texttt{Jacobi.cpp} et \texttt{Jacobi.hpp}).
    \end{itemize}
\end{remark}
\section{Les différentes méthodes}

\subsection{Méthode de Jacobi}

Pour la méthode de Jacobi, la matrice $M$ est la diagonale de la matrice $A$ :
$$
M = D.
$$

{{% alert exercise %}}
  Construisez une classe \texttt{Jacobi} avec les fonctionnalités suivantes :

  \begin{enumerate}[label=\arabic*.]
  \item  \textbf{Données membres.} celles-ci seront séparées en deux, les données ``entrantes'', fournies par l'utilisateur, et les données ``sortantes'', calculées lors de la résolution du problème linéaire\footnote{En pratique, rien ne les différencie ces deux types de données qui sont de type \texttt{private}, seule leur utilisation permet de les distinguer.}. Les données sortantes pourront ensuite être, par exemple, affichées sur l'écran ou imprimées dans un fichier pour un traitement ultérieur.

    \begin{center}
    \begin{minipage}{0.45\textwidth}
     ``Entrées'' :
      \begin{itemize}[label=\textbullet]
      \item $A$ : Matrice (dense) du système.
      \item $b$ : Vecteur (membre de droite)
      \item $\varepsilon$ : Tolérance
      \item  $n_{max}$ : Nombre maximum d'itérations
      \end{itemize}
    \end{minipage}
    \begin{minipage}{0.4\textwidth}
      ``Sorties'' :
      \begin{itemize}[label=\textbullet]
      \item $X$ : Vecteur solution
      \item $niter$ : Nombre d'itérations
      \item $resvec$ : tableau des normes des résidus (\texttt{std::vector<double>})
      \end{itemize}
    \end{minipage}
    \end{center}

    \begin{remark}
      \begin{itemize}
      \item Pour gagner en efficacité et limiter le coût mémoire, il est plus intéressant de ne pas stocker les Matrice et Vecteur, mais plutôt leur adresse.
      \item Pour l'instant nous travaillons avec des matrices denses, nous verrons dans la section \ref{sec:template} comment utiliser des matrices creuses à l'aide de Template.
      \end{itemize}
      \end{remark}
  \item \textbf{Fonctions membres.} Outre les accesseurs (\emph{getter}) et les mutateurs (\emph{setter}), nous avons besoin de :
    \begin{itemize}
      \item Une fonctions membre qui résout le système linéaire en appliquant l'algorithme précédent. Celle-ci aura (probablement) le prototype suivant
      \begin{lstlisting}[language=C++]
void Jacobi::Solve();
      \end{lstlisting}
      Durant l'appel de cette méthode, la norme du vecteur résidu $r$ de chaque itération sera stocké dans $resvec$ et la donnée membre de sortie $niter$ sera également mise à jour. La solution obtenue par l'algorithme sera stockée dans la donnée membre de sortie $X$.
      \begin{remark} vous aurez certainement besoin de modifier la classe \texttt{Vecteur} comme par exemple le calcul de sa norme.
      \end{remark}
    \item Une fonction membre pour afficher les paramètres d'entrées (pour vérification), et une pour afficher le nombre d'itérations qui a été nécessaires pour atteindre la convergence - si celle-ci a été atteinte.
    \end{itemize}
  \item \textbf{Constructeurs.} libre à vous de décider ce dont vous avez besoin : un constructeur vide ou bien un qui prend toutes les données d'entrée en argument, par exemple :
    \begin{lstlisting}[language=C++]
Jacobi(const Matrice &A, const Vecteur &b, double tol, int maxit);
    \end{lstlisting}
  \end{enumerate}

  Une fois la classe implémentée, n'oubliez surtout pas de :
  \begin{enumerate}
  \item Testez la compilation
  \item Testez le résultat de votre implémentation sur un cas petit et simple.
  \item Comparez la solution obtenue avec Jacobi avec celle obtenue par résolution directe.
  \item Tant que les trois points ci-dessus ne sont pas validés, ne passez pas à la suite !
  \end{enumerate}
{{% /alert %}}

\subsection{Méthode de Gauss-Seidel}
  Pour la méthode de Gauss-Seidel, la matrice $M$ choisie est donnée par
  \begin{align*}
  M = (D -E).
  \end{align*}

  {{% alert exercise %}}

    Utilisez la même procédure que pour la méthode de Jacobi, c'est-à-dire :
    \begin{itemize}
    \item Construisez une classe \texttt{GaussSeidel}
    \item Rentrez les mêmes données membres d'entrée/sortie (ou plus si besoin) que pour \texttt{Jacobi}
    \item Construisez la fonction membre \texttt{Solve()}, comme pour \texttt{Jacobi}. Afin de faciliter la lecture, nous vous conseillons d'utiliser le même nom et prototype pour chaque méthode itérative.
      \item     \textbf{Avant} de passer à la suite, \textbf{testez et validez} votre classe sur un \textbf{cas simple}.
    \end{itemize}


    \begin{remark}
      Contrairement à la méthode de Jacobi, la méthode de Gauss-Seidel requiert la résolution d'un problème linéaire dont la matrice est triangulaire supérieure. Pour cela, nous pourrons utiliser la fonction résolvant un système linéaire triangulaire supérieur que vous avez déjà implémenté.
    \end{remark}


{{% /alert %}}

\subsection{Méthode de relaxation}
Pour la méthode de relaxation de paramètre $0 < \omega < 2$, la matrice $M$ est donnée par :
  \begin{align*}
    M = \left(\frac{1}{\omega}D - E\right).
  \end{align*}

{{% alert exercise %}} Implémentez cette méthode en procédant de la même manière que pour les autres méthodes itératives.
{{% /alert %}}

\subsection{Méthode de Richardson}

Pour cette méthode, nous avons
\begin{align*}
    M=\dfrac{1}{\alpha} I
\end{align*}
où $I$ est la matrice identité.
{{% alert exercise %}}
    Implémentez la méthode de Richardson de la même manière que les autres méthodes itératives.
{{% /alert %}}
\subsection{Méthode de Gradient à pas optimal}

Pour cette méthode, la matrice $M$ est modifiée à chaque itération. En particulier, à l'itération $n$, la méthode de gradient à pas optimal a pour matrice $M_n$ :
  \begin{align*}
  M_n = \frac{1}{\alpha_n} I,
  \end{align*}
  où $I$ est la matrice identité et $\alpha_n$ est donné par ($\langle \cdot , \cdot \rangle$ est le produit scalaire euclidien) :
  \begin{align*}
\alpha_n = \frac{\|r_n\|^2}{\langle Ar_n, r_n \rangle}.
  \end{align*}


{{% alert exercise %}}
  Implémentez la méthode de gradient à pas optimal de la même manière que pour les autres méthodes itératives.

{{% /alert %}}



%% \section{Une classe abstraite pour les gouverner toutes}




%% Nous proposons donc de construire une classe abstraite \texttt{IterativeSolver} qui servira de cadre pour différents solveurs itératifs. La partie algorithmique sera contenue dans cette classe mère, tandis que le calcul de la direction de descente $y$ sera calculé par les classes dérivées. Autrement dit, ajouter une méthode de résolution sera rapide.


%% {{% alert exercise %}}

%%   Construire une classe abstraite \texttt{IterativeSolver} telle que :

%%   \begin{enumerate}[label=\arabic*.]
%%   \item  Paramètres :
%%     \begin{itemize}
%%     \item Entrées : Matrice (Pointeur !), Vecteur (Pointeur !), Tolérance, nombre maximum d'itérations.
%%     \item Sorties : Nombre d'itérations, Vecteur de la norme des résidus (\texttt{std::vector<double>})
%%     \end{itemize}
%%   \item Méthodes :
%%     \begin{itemize}
%%     \item Méthode virtuelle \texttt{ComputeDirection} pour calculer la direction. Cette méthode restera abstraite (d'où le \texttt{virtual} et le ``=0'') puisqu'elle dépend de la méthode de résolution.
%%       \begin{lstlisting}[language=C++,style=C++]
%% virtual Vecteur ComputeDirection(const Vecteur &r) const = 0;
%%       \end{lstlisting}

%%     \item \texttt{ComputeResidual} pour calculer le résidu ($r = b - Ax$):
%%       \begin{lstlisting}[language=C++,style=C++]
%% Vecteur IterativeSolver::ComputeResidual(const Vecteur &x);
%%       \end{lstlisting}
%%     \item \texttt{Solve} pour résoudre le système. Elle prend en argument un vecteur (membre de droite) et retourne la solution. Celle-ci suit le schéma décrit précédemment.
%%       \begin{lstlisting}[language=C++,style=C++]
%% Vecteur IterativeSolver::Solve();
%%       \end{lstlisting}
%%       A chaque itération, stockez la norme du vecteur résidu $r$ dans le paramètre adéquat ainsi que le paramètre ``nombre d'itérations''.
%%   \item Une Méthode pour afficher le nombre d'itérations
%%     \end{itemize}
%%   \item Constructeur : l'avantage de fournir un constructeur pour une classe mère, est que celui-ci pourra être appelé par les classes dérivées. Cela nous évitera des copier/coller. Par exemple :
%%     \begin{lstlisting}[language=C++,style=C++]
%% IterativeSolver(Matrice *A, Vecteur *b, double tol, int maxit);
%%     \end{lstlisting}
%%   \end{enumerate}

%%   Remarque 1 : tout paramètre/méthode ``private'' sera ``protected'', pour qu'il soit accessible à ses classes dérivées. En effet, les éléments \texttt{protected} de la classe mère peuvent être vus comme \texttt{private} pour les classes dérivées, tandis que ce qui est \texttt{public} le reste. Attention, les éléments \texttt{private} de la classe mère ne sont pas accessibles par la classe dérivée !

%%   Remarque 2 : nous aurons sans doute besoin de méthodes permettant de calculer la norme d'un vecteur\ldots

%%   Remarque 3 : Bien entendu, nous ne pouvons pas encore tester cette classe, mais nous vérifierons tout de même que notre programme compile avant de passer à la suite !
%% {{% /alert %}}


\section{Application aux matrices creuses}
\label{sec:template}

Pour l'instant, notre code possède :
\begin{itemize}
\item Une classe pour les matrices denses
\item Une classe pour les matrices creuses
\item Une classe pour chaque méthode itérative pour les matrices denses
\end{itemize}

Il serait très intéressant de disposer aussi d'une classe pour chaque méthode itérative mais pour des \emph{matrices creuses}. Remarquez que les méthodes itératives ont principalement besoin du produit matrice-vecteur de la classe \verb!Matrice! et qu'il suffirait \textbf{plus ou moins} de copier/coller les méthodes itératives que vous avez implémentées dans la section précédente en remplaçant dans les déclarations les types \verb!Matrice! par \verb!MatriceCreuse!. Cependant, une alternative est d'utiliser les \emph{templates} en \verb!C++!. Comme ceci est un point de language et que ce n'est pas l'objet du cours, vous avez le choix entre l'exercice \ref{exo:iteratif_creux} ou, si vous êtes \textbf{à l'aise avec la programmation}, vous pouvez faire les exercices
\ref{exo:iteratif_template_1} et \ref{exo:iteratif_template_2}.
{{% alert exercise %}}
\label{exo:iteratif_creux}
Pour chaque méthode itérative vue dans la section précédente, créez une classe identique mais qui prend une matrice creuse en entrée à la place d'une matrice dense.
{{% /alert %}}

\begin{remark}
  Pour se lancer dans les template, nous devons remettre à plat ce que vous venez de coder, avec les risques que cela entrainent. Aussi, avant de vous lancer dans les template nous vous suggérons de faire un copie de votre code. Si vous utilisez un gestionnaire de version (comme git), alors vous ne craignez rien.
\end{remark}

{{% alert exercise %}}
\label{exo:iteratif_template_1}
  Commencez par rendre la classe \texttt{Jacobi} ouverte aux template. Autrement dit, le type \texttt{T} de la matrice membre devient un paramètre de la classe. Nous construirons un objet \texttt{Jacobi} comme cela :
  \begin{lstlisting}[language=C++]
// Si Matrice est la classe pour les matrices denses :
Jacobi<Matrice> MonBeauJacobiDense;
// Si MatriceCreuse est la classe pour les matrices CSR :
Jacobi<MatriceCreuse> MonBeauJacobiCreux;
\end{lstlisting}
\begin{remark}
Pour utiliser les template, vous devez, \emph{grosso-modo}, déplacer le code contenu dans le fichier .cpp vers le fichier .hpp. Pensez ensuite à supprimer le fichier .cpp pour ne pas le compiler !
\end{remark}
{{% /alert %}}

{{% alert exercise %}}
\label{exo:iteratif_template_2}
Une fois la classe \texttt{Jacobi} ``templatisée'', attaquez vous aux autres !
{{% /alert %}}




\section{Analyse numérique}

Nous disposons maintenant d'une implémentation des quatre méthodes itératives, nous allons maintenant les analyser et les comparer. Pour cela, nous allons utiliser la matrice $A_N$ de taille $N\times N$:
\[
  A_N =
  \begin{pmatrix}
    2 & -1 & 0 & 0 & \ldots & 0 & 0\\
    -1 & 2 & -1 &  0 & \ldots & 0 & 0\\
     0 & -1 & 2 & -1 & \ldots & 0 & 0 \\
     \vdots & \ddots& \ddots& \ddots & \ldots & \vdots  & \vdots\\
     0 & 0 & 0 & 0 & \ldots & -1 & 2 \\
  \end{pmatrix}
\]

Les $N$ valeurs propres de la matrice $A_N$ sont données par
\begin{align*}
\lambda_k = 4 \sin^2\left(\frac{k\pi}{2(N+1)}\right) \quad \text{ pour } k=1,\cdots, N.
\end{align*}



Pour atteindre une erreur $\varepsilon$, le nombre d'itérations estimé est donné par
\begin{equation}\label{eq:niter}
  n_{iter} = \frac{{ \ln}(\varepsilon)}{{ \ln}(\rho(\mathcal{L}))},
\end{equation}
  où $\mathcal{L} :=M^{-1}(M - A) $ est la matrice d'itération (Jacobi, Gauss-Seidel, etc.).



\subsection{Méthode de Jacobi}

{{% alert exercise %}}
  \label{ex:jacob1}
À l'aide de ce qui précède :
  \begin{enumerate}
    \item Calculez analytiquement les valeurs propres de $J$, la matrice d'itération de Jacobi.
    \item En déduire son rayon spectrale $\rho(J)$.
    \item Effectuez un développement de Taylor à l'ordre 2 de $\rho(J)$ lorsque $N\to+\infty$.
    \item Faites de même sur le nombre d'itérations donné par l'équation (\ref{eq:niter}).
  \end{enumerate}
{{% /alert %}}

{{% alert exercise %}}
  \label{ex:jacob2}
Nous fixons $N=10$, la tolérance $\varepsilon = 0.1$ et le nombre maximal d'itérations $n_{max} = 10^5$.
  \begin{enumerate}
  \item Estimez le nombre d'itérations nécessaire pour converger à l'aide des développements de Taylor de l'exercice précédent
  \item Comparez avec les résultats obtenus numériquement. Est-ce satisfaisant ?
  \item Faites de même avec $N=50$ et $N=100$.
  \end{enumerate}
{{% /alert %}}

\subsection{Méthode de Gauss-Seidel}

{{% alert exercise %}}
  Comme la matrice $A_N$ est tri-diagonale, le rayon spectrale de la matrice de Gauss-Seidel $\rho(G)$ est donnée par $\rho(G) = \rho(J)^2$.  Sachant cela, procédez de la même manière que les exercices \ref{ex:jacob1} et \ref{ex:jacob2}.
{{% /alert %}}

\subsection{Méthode de Relaxation}

Comme $A_N$ est symétrique définie positive, alors le paramètre optimale $\omega^*$ pour la méthode de relaxation est donné par
\begin{align*}
\omega^* = \frac{2}{1 + \sqrt{1 - \rho(J)^2}}.
\end{align*}

{{% alert exercise %}}
  à l'aide des exercices précédents, donnez une estimation de $\omega^*$ quand $N\to+\infty$.
{{% /alert %}}

{{% alert exercise %}}
Sachant que, pour la méthode de relaxation, le rayon spectral de la matrice d'itération $G_{\omega}$ est donnée par $\rho(G_{\omega}) = \omega - 1$, procédez de la même manière que les exercices \ref{ex:jacob1} et \ref{ex:jacob2} pour le paramètre optimal $\omega^*$.
{{% /alert %}}

\subsection{Méthode de Richardson}



Pour une matrice définie positive, le pas optimal $\alpha$ est donné par
$$
\alpha = \frac{2}{\lambda_{min} + \lambda_{max}},
$$
où $\lambda_{min}$ et $\lambda_{max}$ sont respectivement les plus petites et plus grandes valeurs propres de la matrice du système linéaire.
{{% alert exercise %}}
  Calculez analytiquement le pas optimal $\alpha$ et, à l'aide des calculs précédents, en déduire le comportement de la méthode de Richardson.
{{% /alert %}}



\section{Comparaison des performances}

{{% alert exercise %}}
 Nous considérons une matrice $A_N$ de taille $200$ et un vecteur membre de droite $b$ rempli de $1$. Dans cet exercice, nous fixons de plus la tolérance à $0.1$ et le nombre d'itération maximal de 20000.
  \begin{enumerate}[label=\Alph*)]
\item \textbf{Préparation des données de sorties:}
\begin{enumerate}[label=\arabic*.]
\item Adaptez vos fonctions membres \texttt{Solve()} de chaque classe de méthode itérative pour pouvoir calculer le temps d'exécution de la résolution. \textit{Vous pouvez ajouter des paramètres/fonctions membres si vous le désirez}
\item Résolvez le problème avec les méthodes de Jacobi, Gauss-Seidel, Relaxation ($\omega^*$), Richardson et de Gradient à pas optimal, pour des matrices creuses et denses.
\item Pour chaque méthode, normalisez le vecteur de norme du résidu par rapport à la norme de $b$ (\textit{i.e.} stocker $\|r\|/\|b\|$) et prenez-en le logarithme ($\log_{10}$).
\item Stockez les normes des résidus normalisés par la norme de $b$ pour chaque itération et chaque méthode et affichez les temps CPU mis par chaque méthode.
\end{enumerate}
\item \textbf{Analyse des résultats de convergence :}
\begin{enumerate}[label=\arabic*.]
\item Sur une même figure, affichez les courbes ``norme du résidu'' (normalisé) en fonction du ``numéro de l'itération'' pour chaque méthode itérative. Cette figure s'appelle l'historique de convergence.
\item Quelle méthode itérative est la plus rapide (en terme de nombre d'itérations) ?
\end{enumerate}
\item \textbf{Comparaison des performances entre matrices denses et creuses :}
\begin{enumerate}[label=\arabic*.]
\item Affichez et comparez le temps CPU mis pour chaque méthode itérative pour chaque type de matrice.
\item Pour la méthode de Gauss-Seidel uniquement, résolvez le problème avec une taille de la matrice différente (par ex. $N=100$ à $2000$ avec un pas de $100$). Pour chaque taille, stockez le temps CPU (en secondes) mis par la méthode avec stockage dense et creux de la matrice. Affichez la courbe et comparez les deux méthodes de stockage.
\end{enumerate}
\end{enumerate}
{{% /alert %}}


\end{document}
