+++
title = "1. C++ : Aide & bonnes pratiques"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = false
weight = 10
diagram = false
#markup = "mmark"

edit_page = {repo_url = "https://github.com/Bertbk/course_4m053", repo_branch = "master", submodule_dir="content/course/4m053/"}

[git]
  icon = "github"
  repo = "https://github.com/Bertbk/course_4m053"
  submodule_dir = "content/course/4m053/"

# Add menu entry to sidebar.
[menu.4m053]
  parent = "II. Aides & Bonnes Pratiques"
  name = "1. C++"
  weight = 2


+++

## Quelques habitudes à prendre

1. Le nom du fichier doit refléter sa **fonctionnalité**, choisissez des noms cohérents

    > `fonctions`, `fichier`, `tp1`, ... ne donnent aucune indication sur le contenu !

2. **Une fonction = Une fonctionnalité**. Autrement dit, une fonction ne doit faire **que** ce que l'on attend d'elle ([*KISS : Keep It Simple, Stupid*](https://fr.wikipedia.org/wiki/Principe_KISS)). 

    > Par exemple, une fonction dont le but est de créer et renvoyer un tableau **ne doit pas** afficher quelque chose ni modifier une variable ! Elle doit juste créer et renvoyer un tableau. Sauf cas pathologique, quand vous commandez un café vous ne souhaitez pas que le serveur y ajoute une sardine dedans, même avec le sourire.

3. Les fonctions et variables doivent avoir des noms compréhensibles et surtout en rapport avec leurs fonctions !

    > `int truc = 2` n'est pas très parlant

4. À chaque nouvelle fonctionnalité, suivez la procédure suivante :
  1. **Compilation** : tant qu'elle plante, on corrige[^1], sinon...
  2. ... **Validation** ! Tant que le résultat n'est pas bon, on corrige, sinon...
  3. ... **Passer à la suite**

[^1]: Vous apprendrez vite à comprendre ce que vous dit le compilateur

## Concernant les classes

### Nom des paramètres

Une `class` en `C++` dispose (souvent) de paramètres *privés* (`private`) ou *publiques* (`public`). Le choix du nom de ces variables n'est pas sans incidence. Nous vous conseillons de terminer le nom de ces variables par un "underscore" `_`. Cela permet d'éviter toute confusion avec d'autres variables, par exemple :

```cpp
class MaClasse{
  private:
    int N_;
  public:
    MaClasse(int N){ N_ = N;}
};
```
Sans le underscore , nous pourrions confondre l'arguement `N` (extérieure) avec la variable privée de la classe.

{{% alert warning %}}
Vous n'avez pas le droit de [commencer un nom de variable par un underscore](https://stackoverflow.com/questions/228783/what-are-the-rules-about-using-an-underscore-in-a-c-identifier). Ceci est réservé au compilateur. Au cours de votre carrière, vous croiserez de nombreux programmes qui, malhereusement, ne suivent pas cette règle...
{{% /alert %}}

### Méthode `const`

Une *méthode* est une *fonction membre* d'une classe. Si le prototype d'une méthode se termine par `const` cela signifie (au compilateur) que la méthode n'altère pas les paramètres de l'instance de la classe. Prenez l'habitude de placez des `const` quand il faut **dès le début**, sinon vous allez au delà de grands changements...

```cpp
class MaClasse{
  private:
    int N_;
  public:
    MaClasse(int N){N_ = N;}
    // Méthode "constante" :
    void Print() const{std::cout << "N = " << N_;} 
    // Méthode non "constante" modifiant le paramètre N_
    void Set(int N) {N_ = N;}
};
```


## Où trouver de l'aide et des informations pertinentes ?

Google (ou autre) sera votre bras droit dans la recherche d'information sur le `C++`. Citons tout de même les sites suivants qui sont des valeurs sûres :

- Pour la syntaxe : [cppreference.com](https://fr.cppreference.com/) ou [cplusplus.com](http://www.cplusplus.com/)
- Pour des questions pointues : [Stack Overflow](http://stackoverflow.com/)
- L'excellente [FAQ de isocpp](https://isocpp.org/faq) présentant des exemples de cas pathologiques

## Tutoriels en ligne

Ces derniers ne manquent pas, tels que :

- [LearnC++](https://www.learncpp.com/)
- [OpenClassRoom](https://openclassrooms.com/fr/courses/1894236-programmez-avec-le-langage-c)


## Les erreurs classiques

Avant de nous appeler et au risque de *patienter* longuement avant notre venue : Google est votre ami (encore et pour une fois). Mais en général, l'erreur est classique...

### Erreur de compilateur

Le compilateur renvoie un message d'erreur ? **Stop.** On arrête tout : on doit débugguer. On ne continue surtout pas son code au risque de rendre l'erreur encore plus incompréhensible.

1. Regardez le **premier** message d'erreur, celui le plus en haut (d'autres erreurs découlent probablement de l'erreur primaire)
double operator() (int i) const; // Accès à la valeur (recopie)
2. Essayez de lire et de comprendr
double operator() (int i) const; // Accès à la valeur (recopie)que dit votre compilateur. Au début, on galère, après on y arrive (un peu).

Quelques erreurs classiques :

1. Oublie d'un **point virgule** à
double operator() (int i) const; // Accès à la valeur (recopie)in d'une commande
2. Oublie de **typer** une variabl
double operator() (int i) const; // Accès à la valeur (recopie)une fonction
3. Oublie de **déclarer** la fonct
double operator() (int i) const; // Accès à la valeur (recopie)t/ou d'inclure le fichier d'en-tête contenant la dite fonction
4. Erreur de **typographie** : `sdt::vector` au lieu de `std::vector`

Certains `warning` méritent aussi de s'y attarder.

{{% alert tips %}}
Théorème : Si vous pensez avoir raison mais que le compilateur prétend que vous avez tort, alors vous avez tort.
{{% /alert %}}

### Erreur au lancement

La compilation se passe bien, le programme se lance mais ne donne pas le résultat voulu et/ou plante. **Stop.** On arrête tout. On débugue.

L'utilisation d'un débugueur (un vrai) est conseillé, comme gdb (notez qu'il y en a un dans VSCode). Nous utiliserons cependant la *mauvaise habitude* de débuguer à coup de `cout << "coucou"` pour vérifier si le programme plante avant ou après une commande. Le but est de localiser l'erreur, ensuite en général, ça saute aux yeux.

1. **Segmentation Fault** : la pire erreur à débuguer. C'est un problème de mémoire: votre programme cherche à lire ou à écrire sur un emplacement mémoire pour lequel il n'a pas le droit de le faire. Pour les débusquer, c'est délicat car le programme peut fonctionner une fois, et pas la fois suivante. Le débuguage à cout de `cout` est parfois mis à mal. En général il faut :
  1. Surveillez l'utilisation que vous avez des pointeurs/références
  2. Surveillez les sorties de vos fonctions : retournez vous une variable qui est, en fait, détruite ?
2. Le **résultat est faux** : bon courage, il faut mettre les mains dans le cambouis ! Car non, **l'erreur ne vient pas** de l'ordinateur, mais bien de **votre code**.

## Quelques mauvaises habitudes

 - Évitez le plus possible `using namespace std` : [voir ici](https://stackoverflow.com/a/1453605/14065) et surtout **à prohiber** [dans les fichiers header](https://stackoverflow.com/questions/5849457/using-namespace-in-c-headers) !
- Passage d'argument par recopie : en C++, les arguments sont **par défaut passés par copie***. Rendre **constant un argument passé par copie est alors inutile**. Nous banirons donc ce genre de pratique :

```cpp
... fonction(const Type T){...}
```

- Passage d'argument par référence : cette pratique permet d'envoyer non pas la valeur mais l'adresse de la variable à la fonction :
```cpp
... fonction(const Type &T){...}
```
  - Cette méthode est très intéressante quand `Type` **n'est pas élémentaire** (`double`, `float`, `int`, ...) et nécessite une taille mémoire importante (tableaux (`std::vector`) ou matrice par exemple) :

```cpp
... fonction(const std::vector<double> & v, ...){...}
```
  - Pour des **entités élémentaires**, c'est à la fois [**inutile et potentiellement dangereux**](https://stackoverflow.com/questions/4705593/int-vs-const-int). D'autre part, l'optimisation effectuée par le compilateur perd en efficacité avec de tels arguments. Ainsi, les prototypes de ce type seront *persona non grata* :

```cpp
... fonction(const double & d, const int & a, ...){...}
```


## Quelques liens utiles

- [`friend operator<<` ou `operator<<` ?](https://stackoverflow.com/questions/236801/should-operator-be-implemented-as-a-friend-or-as-a-member-function)
- [`operator` : méthode ou fonction ?](https://stackoverflow.com/questions/4622330/operator-overloading-member-function-vs-non-member-function)
- [`const int &` en argument de fonction ?](https://stackoverflow.com/questions/4705593/int-vs-const-int)