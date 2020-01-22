+++
title = "I. Introduction"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = false
weight = 1
diagram = false
#markup = "mmark"


edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"


# Add menu entry to sidebar.
[menu.4m053]
  name = "I. Introduction"
  weight = 1


+++

## Deux objectifs couplés

Les TPs associés au cours 4M053 "Calcul scientifique pour les grands systèmes linéaires" ont deux objectifs :

1. **Implémenter** une bibliothèque en `C++` pour :
  - Gérer des matrices sous différents formats (stockage, opérations usuelles, ...)
  - Résoudre des systèmes linéaires avec les solveurs étudiés en cours (directs, itératifs, ...)
2. **Analyser** le comportement des solveurs et des méthodes de stockage à l'aide de cette bibliothèque

## Langages choisis

### Pour le développement : `C++`

Ces TPs vous demandent d'être **familié avec au moins un langage compilé** (`C`, `C++`, `Fortran`, ...) et le langage retenu ici sera le `C++`. Si vous n'êtes ni familié avec un langage compilé ni avec le `C++`, vous allez devoir **travailler dure** pour rattraper le retard : ces TPs **ne sont pas** des TPs d'informatique ! Rien n'est impossible mais nous **ne ferons pas le travail à votre place**. Nous avons mis en place [une section contenant des liens pour vous aider]({{<relref "help_cpp.md">}}).

### Pour l'analyse : `Python`, `Julia`, `MATLAB`, ...

À vous de décider le langage que vous préférez pour afficher les courbes et traiter les données. Nous vous incitons à utiliser [Python](https://www.python.org/) avec les bibliothèques [Matplotlib](https://matplotlib.org/) pour l'affichage et [Numpy](https://www.numpy.org/) pour toute opération de calcul scientifique (matrice, vecteur, ...). À noter que [Julia](https://julialang.org) peut également appeler Matplotlib.

Dans la rubrique d'aide, nous fournissons [un script Python]({{<relref "help_format.md">}}) permettant de lire un fichier JSON, d'en extraire des données et d'afficher une courbe.

## Organisation

La partie ["Premiers pas"]({{<relref "start_hello_world.md">}}) présente la compilation pour le `C++` et surtout introduit une organisation possible pour le code et les fichiers. Les bonnes pratiques de programmation, à prendre *dès le début*, seront aussi soulignées. Ensuite seulement commencera l'implémentation de la bibliothèque.

## Environnement

### OS

Les terminaux mis à disposition tournent sous Linux et disposent des outils nécessaires (voir ci-après). Vous pouvez cependant utiliser votre propre machine, mais **nous n'assurons pas le SAV** dans ce cas et nous vous invitons à utiliser Linux ou Mac OS plutôt que Windows.

### Logiciels

Sauf si vous disposez déjà de votre propre environnement de travail (*workflow*), alors c'est parfait ! Autrement, nous vous suggérons les outils suivants. 

#### Traitement de textes

Un éditeur de textes peut intégrer un certain nombre d'outils qui peuvent vous aider tels qu'un indenteur automatique, un débogueur, un compilateur, un analyseur statique, un profiler, etc. Maîtriser un (bon) éditeur de texte est un investissement (très) rentable ! De base, vous disposez de GEdit, mais ce traitement de texte est (trop) basique. Voici trois exemples :

- [VSCode](https://code.visualstudio.com/) : intuitif avec une prise en main rapide et [rempli de packages très agréables](https://ljll.math.upmc.fr/infomath/tools/vscode). VSCode est disponible sous windows, mac et linux. Probablement et malheureusement pas disponible avec les terminaux de l'université.
- [Emacs](https://www.gnu.org/software/emacs/) : extrêmement puissant mais avec une courbe d'apprentissage assez raide. Très probablement disponible. 
- [Vim](https://www.vim.org/) : tout aussi puissant qu'emacs et avec une courbe d'apprentissage tout aussi raide.

#### Gérez vos sources avec [Git](https://git-scm.com/)

Stockez votre dépôt sur [Github](https://github.com)[^1] ou [Gitlab](https://gitlab.com). Notez que des packages pour utiliser Git directement dans le traitement de textes sont disponibles pour VScode, Emacs et Vim. Une [section d'aide y est consacrée]({{<relref "help_git.md">}}).

{{% alert tips %}}
Vous ne savez pas utiliser Git ? C'est le moment d'apprendre ! Nous n'avons toutefois et malheureusement pas le temps d'apprendre à utiliser cet outil - pourtant extrêmement utile ! Cependant, nous sommes disponible pour vous aider. Nous vous **encourageons fortement** à apprendre à vous en servir.
{{% /alert %}}

[^1]: En tant qu'étudiant(e) vous pouvez souscrire au [Student Developper Pack](https://education.github.com/pack).


## Contribuez !

Vous avez repéré une erreur : grammaire, typo, de mathématiques ou d'informatique ? Ou avez des suggestions ? C'est le moment de participer ! Le code des tps est en [accès libre sur github](https://github.com/Bertbk/course_4m053) (le lien est aussi fourni sur le menu à droite). Vous pouvez alors soumettre un Pull Request, soit :

1. [Par la voie standard](https://help.github.com/articles/about-pull-requests/) :
  - [Forker le dépôt](https://help.github.com/articles/fork-a-repo/) dans votre compte github
  - Récupérer le code sur votre ordinateur avec `git clone`
  - Créer une branche dédié
  ```
  git branch correction
  git checkout correction
  ```
  - Effectuer les modifications
  - Versionner et envoyer au serveur
  ```
  git commit -m "blabla" -a
  git push
  ```
  - Retourner sur [le dépôt du cours](https://github.com/Bertbk/course_4m053) : on vous propose de faire un Pull Request
  - De notre côté, nous validerons (ou pas ;-))


2. Via le lien Prose.io à droite (Edit this Page), qui effectuera toutes les étapes précédentes en votre nom.



## Comment lire ces TPs

Nous vous conseillons de suivre les étapes **dans l'ordre**. Tout au long des TPs, des exercices vous seront proposés. Ils sont là pour vous guider et sont indiqués comme cela :

{{% alert exercise %}}
Ceci est un exercice
{{% /alert %}}

{{% alert note %}}
Parfois, vous rencontrerez des remarques indiquées comme cela...
{{% /alert %}}

{{% alert tips %}}
... Ou bien des astuces ...
{{% /alert %}}

{{% alert warning %}}
... Ou encore des avertissements.
{{% /alert %}}
