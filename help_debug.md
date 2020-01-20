+++
title = "2. Debuguer avec GDB"

date = 2018-09-09T00:00:00

# lastmod = 2018-09-09T00:00:00

draft = false # Is this a draft? true/false
toc = true # Show table of contents? true/false
type = "docs" # Do not modify.

math = false
weight = 20
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
name = "2. Debug: GDB"
weight = 5

+++## Contexte

La méthode "naturelle" est d'insérer des `printf` ou `cout` dans le programme afin d'afficher la valeur d'une variable en cerains endroits ou pour vérifier que le programme _passe_ bien dans telle ou telle portion du code. Néanmoins, cette méthode rudimentaire montre très (très) vite ses limites et nous ne l'encourageons pas.

Nous préférons vous proposer d'utiliser le logiciel [GDB](https://fr.wikipedia.org/wiki/GNU_Debugger). Vous y trouverez ici un tutoriel minimaliste, d'autres sont disponibles en ligne ([ici par exemple](http://perso.ens-lyon.fr/daniel.hirschkoff/C_Caml/docs/doc_gdb.pdf)).

## Fonctionnalités

Lorsqu'il est lancé, GDB permet d'exécuter un code pas à pas, ou alors de le lancer et il s'arrêtera en cas d'erreur comme une `Segmentation Fault`. En outre, il est possible :

- D'accéder aux valeurs des variables en mémoire et leur adresse mémoire
- De remonter la trace (_backtrace_) de la fonction ayant causé l'erreur
- Placer des points d'arrêt (_breakpoints_) dans le programme, pour lancer le programme pas à pas

## Compiler en mode debug

{{% alert warning %}}
Compiler (et exécuter) en mode débug est beaucoup plus lent qu'en mode standard ! N'utilisez cette option qu'en cas de débug.
{{% /alert %}}

La première chose à faire est de compiler en mode débug avec l'option `-g`. Le [`Makefile` proposé]({{<relref "start_makefile.md">}}) dispose déjà de l'option nativement, il suffit de compiler avec l'argument `debug` :

```makefile
make debug
```

## Tutoriel

Dans un dossier de teste (ne mélangeons pas tout !), copiez/coller le code source suivant dans un fichier `main.cpp`:

```cpp
#include <vector>
using namespace std;
// Fonction qui remplit un vector de vector (=matrice)
void fill(vector<vector<double> > &in, int n, double a)
{
  // Les boucles sont mal programmées : les indices i et j vont "trop loin" !
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j ++)
      in[i][j] = a;
}

int main(){
  int n = 5;
  vector<vector<double> > p(n);
  for (int i = 0; i < n ;i ++)
    p[i].resize(n);
  fill(p, n, 4.); // Crash probable !
  return 0;
}
```

Compilez ce programme et lancez le. Le programme devrait planter et votre terminal devrait ressembler à ceci :

```bash
❯ g++ main.cpp -o
❯ ./main
[1]    12023 segmentation fault  ./main
```

Comme prévu, le programme plante. Compilez maintenant le programme en mode debug et lancez `gdb` :

```bash
❯ g++ main.cpp -o -g
❯ gdb main
GNU gdb (Debian 8.3.1-1) 8.3.1
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
[...]
Reading symbols from main...
(gdb)
```

Vous êtes maintenant dans le terminal `gdb`. Exécutez le programme avec `run` (ou `r`):

```bash
(gdb) run
Starting program: /home/bertrand/codes/cpp/gdb/main

Program received signal SIGSEGV, Segmentation fault.
0x0000555555555213 in fill (in=std::vector of length 5, capacity 5 = {...}, n=5, a=4) at main.cpp:7
7             in[i][j] = a;
```

Le programme a planté à la ligne 7 au moment d'effectuer l'opération `in[i][j] = a;`. Nous pouvons demander des informations supplémentaires comme les variables locales (`info locals`) ou la backtrace (`bt`) qui nous désignera quelle fonction est coupable et les arguments qu'elle a reçu (`info args`):

```bash
(gdb) bt
#0  0x0000555555555213 in fill (in=std::vector of length 5, capacity 5 = {...}, n=5, a=4) at main.cpp:7
#1  0x00005555555552c6 in main () at main.cpp:15
(gdb) info locals
j = 1e
i = 5
(gdb) info args
in = std::vector of length 5, capacity 5 = {std::vector of length 5, capacity 5 = {0, 0, 0, 0, 0},
  std::vector of length 5, capacity 5 = {0, 4, 4, 4, 4}, std::vector of length 5, capacity 5 = {0, 4, 4, 4, 4},
  std::vector of length 5, capacity 5 = {0, 4, 4, 4, 4}, std::vector of length 5, capacity 5 = {0, 4, 4, 4, 4}}
n = 5
a = 4
```

Nous comprenons maintenant que le programme a crashé pour `i=5` et `j=1`. Nous pouvons demander la valeur de `in[i]` pour comprendre pourquoi à l'aide de `print` (ou `p`) :

```
(gdb) print in[i]
$1 = std::vector of length -6, capacity -6 = {Cannot access memory at address 0x31
(gdb) p in[0]
$2 = std::vector of length 5, capacity 5 = {0, 0, 0, 0, 0}
```

On comprend alors que `in[5]` (=`in[i]`) n'est pas accessible (car inexistant). Nous pouvons aussi exécuter le code ligne par ligne à l'aide de _breakpoints_ (point d'arrêts). Ajoutons en un de la boucle `for` sur `j` de la fonction fill:

```
(gdb) break fill:4
Breakpoint 1, fill (in=std::vector of length 5, capacity 5 = {...}, n=5, a=4) at main.cpp:5
(gdb) run
The program being debugged has been started already.
Start it from the beginning? (y or n) y
Starting program: /home/bertrand/codes/cpp/gdb/main

Breakpoint 1, fill (in=std::vector of length 5, capacity 5 = {...}, n=5, a=4) at main.cpp:5
5         for (int i = 1; i <= n; i++)
```

`gdb` s'est arrêté et attend nos instructions. Nous pouvons passer à la ligne suivante avec `next` (ou `n`) et afficher de temps en temps les variables `i` et `j`:

```bash
(gdb) n
6           for (int j = 1; j <= n; j ++)
(gdb) n
7             in[i][j] = a;
(gdb)  info locals
j = 1
i = 1
```

En appuyant sur `n`, nous parcourerons les boucles étape par étape.

## Quelques commandes utiles

| Nom                | Raccourcis | Désignation                                                  |
| ------------------ | ---------- | ------------------------------------------------------------ |
| `help`             | `h`        | Aide                                                         |
| `run`              | `r`        | Exécute le programme                                         |
| `backtrace`        | `bt`       | Remonte le fil des appels de fonctions                       |
| `info`             | `i`        | Toutes les informations possibles                            |
| `info locals`      | `i locals` | Variables locales                                            |
| `info args`        | `i args`   | Arguments reçus par la fonctions                             |
| `break`            |            | Liste les points d'arrêt                                     |
| `break fun:I`      |            | Ajoute un point d'arrêt à la fonction `fun` à la ligne `I`   |
| `break file.cpp:I` |            | Ajoute un point d'arrêt au fichier `file.cpp` à la ligne `I` |
| `next`             | `n`        | Exécute la ligne suivante                                    |
| `continue`         | `c`        | Exécute jusqu'au prochain breakpoint                         |
| `delete N`         |            | Supprime le breakpoint numéro `N`                            |
| `quit`             | `q`        | Quitter                                                      |
