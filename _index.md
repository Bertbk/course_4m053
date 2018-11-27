+++
title = "Introduction"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  issue = "https://github.com/Bertbk/course_4m053/issues"
  prose = "https://prose.io/#Bertbk/course_4m053/edit/master/"


# Add menu entry to sidebar.
[menu.4m053]
  parent = "introduction"
  name = "Objectifs"
  weight = 1


+++

## Deux objectifs couplés

Les TPs associés au cours 4M053 "Calcul scientifique pour les grands systèmes linéaires" ont deux objectifs :

1. **Implémenter** une bibliothèque en `C++` pour :
  - Gérer des matrices sous différents formats (stockage, opérations usuelles, ...)
  - Résoudre des systèmes linéaires avec les solveurs étudiés en cours (directs, itératifs, ...)
2. **Analyser** le comportement des solveurs et des méthodes de stockage à l'aide de cette bibliothèque


## Langage choisi : `C++`

Ces TPs vous demandent d'être **familié avec au moins un langage compilé** (`C`, `C++`, `Fortran`, ...) et le langage retenu ici sera le `C++`. Si vous n'êtes ni familié avec un langage compilé ni avec le `C++`, vous allez devoir **travailler dure** pour rattraper le retard : ces TPs **ne sont pas** des TPs d'informatique ! Rien n'est impossible mais nous **ne ferons pas le travail à votre place**. Nous avons mis en place [une section contenant des liens pour vous aider]({{<relref "help.md">}}).


## Organisation

La partie ["Premiers pas"]({{<relref "hello_world.md">}}) présente la compilation pour le `C++` et surtout introduit une organisation possible pour le code et les fichiers. Les bonnes pratiques de programmation, à prendre *dès le début*, seront aussi soulignées. Ensuite seulement commencera l'implémentation de la bibliothèque.

## Environnement

### OS

Les terminaux mis à disposition tournent sous Linux et disposent des outils nécessaires (voir ci-après). Vous pouvez cependant utiliser votre propre machine, mais nous n'assurons pas le SAV dans ce cas et nous vous invitons à utiliser Linux ou Mac OS plutôt que Windows.

### Logiciels

Sauf si vous disposez déjà de votre propre environnement de travail (ex. : emacs, vim, ...), nous vous suggérons les outils suivants. Remarquez qu'un éditeur de texte peut intégrer un certain nombre d'outils qui peuvent vous aider tels qu'un indenteur automatique, un débogueur, un compilateur, un analyseur statique, un profiler, etc. Maîtriser un (bon) éditeur de texte est un investissement (très) rentable !

- [VSCode](https://code.visualstudio.com/) pour rédiger le code: intuitif, une prise en main rapide et [remplit de packages très agréables](https://ljll.math.upmc.fr/infomath/tools/vscode). VSCode est disponible sous windows, mac et linux. De base, vous disposez de GEdit, mais ce traitement de texte est (trop) basique.
- [Git](https://git-scm.com/) pour gérer vos sources et vos versions, couplé avec par exemple un dépôt sut [Github](https://github.com)[^1] ou [Gitlab](https://gitlab.com). Nous n'avons toutefois et malheureusement pas le temps d'apprendre à utiliser cet outil - pourtant extrêmement utile ! Il faudrait que vous [appreniez par vous même](https://ljll.math.upmc.fr/infomath/tools/git).


[^1]: En tant qu'étudiant(e) vous pouvez souscrire au [Student Developper Pack](https://education.github.com/pack) qui vous offre la possibilité d'obtenir des dépôts privés


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

