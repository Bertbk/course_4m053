+++
title = "4. Sortie : JSON"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

math = true

weight = 30
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
  name = "4. Sortie : JSON"
  weight = 10

+++

## Contexte

Nous serons amenés à calculer des quantités d'intérêts de différents types comme :

- Le temps CPU d'une fonction en secondes (`double`)
- Le nombre d'itérations pour une méthode itérative (`int`)
- Le vecteur des résidus (tableau de `double`)
- Le nom de la méthode itérative (`string`)
- La taille du système linéaire (`int`)
- Date et heure de la simulation (`date` ou `string`)
- ...

Si nous ne nous organisons pas un minimum, nous risquons de nous retrouver noyés sous un nombre important de fichiers de données sans pour autant arriver à savoir quels sont les paramètres associés (*nous parlons ici de vécu*). Le choix du format de fichier de sortie et de leur organisation devient alors primordiale. 

Il existe de nombreuses façon de stocker des données résultant de simulations numériques, comme une base SQL (en local ou non) ou un format de fichiers simple, comme le [CSV](https://fr.wikipedia.org/wiki/Comma-separated_values), [JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) ou encore [ENO](https://eno-lang.org/). L'utilisation d'un fichier binaire permet de réduire le coût de stockage de celui-ci au prix (trop) fort de l'illisibilité humaine. Nous privilégiron donc le format texte (ASCII). Le CSV est de loin le plus format le simple mais est un peu moins flexible que le format JSON, qui permet de plus de stocker plusieurs jeux de données dans un même fichier, c'est pourquoi nous proposons de l'utiliser. Cependant, libre à vous d'utiliser celui que vous voulez !

{{% alert note %}}
Une tendance naturelle est d'utiliser le nom du fichier de sortie pour les paramètres, cependant :

- Peu ou pas pratique pour des paramètres à virgule
- Peu ou pas pratique pour plus de 2 paramètres : "output_a_10.232942_b_201_c_34342.txt"

Nous déconseillons cette pratique.
{{% /alert %}}

## Format JSON

### Généralités

Pour simplifier, [le format JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) est un format spécialisé dans le transfert de données. À chaque clé (*key*) est associée une valeur ou un tableau de valeurs. Par exemple `"cpu_time"` associé à `3.343` ou `"method"` à `jacobi`. Vous pouvez ajouter autant de clés que vous le voulez. 

Un fichier JSON est compatimentés entre des accolades `{` et `}`. Par exemple, imaginons que l'on ait lancé une résolution avec $N=4$, la méthode de Jacobi, que notre vecteur `resvec_` contiennent trois valeures (au hasard) et le tout avec un temps CPU de 3.2s. Notre fichier de sortie pourrait ressembler à celui-ci (rappel : les valeurs ont été choisies au hasard):

```json
{
  "jacobi": {
    "method": "jacobi",
    "N": 4,
    "ntier": 3,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323,
  },
}
```

Un tel format présente l'avantage d'être lisible par Python ou JavaScript (d'où son nom) à travers certaines bibliothèques. En particulier, un script mis à disposition en fin de page permetx de lire un tel fichier au format JSON et affiche la courbe associée à la clé `resvec` en échelle logarithmique. Vous pouvez alors librement l'adapter pour afficher une autre quantité.

### En détail

Un fichier JSON commence par `{` et se termine par `}`. Entre les accolades se trouvent les données qui peuvent être :

1. Une paire clé/valeur, ex. `"method" : "jacobi"
2. Une liste ordonnée de valeurs : `"resvec" : [ 12.1, 8.2, 5.4, 3.2]`

Une clé peut aussi faire référence à un objet, entouré alors d'accolades, comme `"jacobi"` ci-dessous qui regroupe plusieurs paramètres :
```json
{
  "jacobi": {
    "method": "jacobi",
    "N": 4,
    "ntier": 3,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323,
  }
}
```

Nous pouvons concaténer ainsi plusieurs résultats de simulations dans un même fichier :

```json
{
  "jacobi": {
    "method": "jacobi",
    "N": 4,
    "ntier": 4,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323
  },
  "gauss": {
    "method": "gauss",
    "N": 4,
    "ntier": 2,
    "resvec":  [ 6.1, 2.2],
    "cpu_time": 1.397
  }
}
```


{{% alert note %}}
Selon les lecteurs JSONS, il n'est pas nécessaire que le dernier élément se termine par une virgule `,`. Cependant, en Python, il faut éviter de placer une virgule à chaque dernier élément d'une liste.
{{% /alert %}}

## JSON : Input/Output (I/O)

Nous utilisons un parser JSON pour le C++ [disponible sur Github](https://github.com/nlohmann/json). Très simple à utiliser, vous devez uniquement télécharger [le fichier *header* json.hpp](https://raw.githubusercontent.com/nlohmann/json/develop/single_include/nlohmann/json.hpp) et le placer dans votre dossier `include`. Ensuite, il vous suffit de l'inclure via
```cpp
#include "json.hpp"
// for convenience
using json = nlohmann::json;
```

Les opérateurs de flux entrant et sortant, il est très facile d'écrire sur disque et de lire un tel fichier.

{{% alert warning %}}
Du fait de notre configuration, **vous ne pouvez pas inclure** `json.hpp` dans **un fichier source** `.cpp` placé dans le dossier `src` ! En effet cela pourrait amener à une erreur de compilation (multiple définitions de fonctions) : le fichier `json.hpp` sera compilé autant de fois qu'il sera appelé...

Réservez `json.hpp` **uniquement** pour vos fichiers principaux (contenant la fonction `main()`).
{{% /alert %}}

### Écriture : exemple

```cpp
#include <iomanip> // Pour std::setw(2)
#include <fstream>
#include <vector>
#include "json.hpp"

// for convenience
using json = nlohmann::json;

int main(){
  //Jacobi
  double cpu_jac = 3.2323;
  std::vector<double> resvec_jac({12.1, 8.2, 5.4, 3.2});
  // create an empty structure (null)
  json j;
  j["jacobi"]["method"] = "jacobi";
  j["jacobi"]["N"] = 4;
  j["jacobi"]["niter"] = 4;
  j["jacobi"]["resvec"] = resvec_jac;
  j["jacobi"]["cputime"] = cpu_jac;
  // Gauss
  double gauss_cpu = 1.397;
  std::vector<double> resvec_gauss({6.1, 2.2});
  j["gauss"]["method"] = "gauss";
  j["gauss"]["N"] = 4;
  j["gauss"]["niter"] = 2;
  j["gauss"]["resvec"] = resvec_gauss;
  j["gauss"]["cputime"] = gauss_cpu;

  std::ofstream f("data.json");
  // std::setw(2) impose tabulation = 2 espace (plus joli)
  f << std::setw(2)<< j;
  f.close();
  return 0;
}
```

Le résultat est alors celui souhaité plus haut :
```json
{
  "gauss": {
    "N": 4,
    "cputime": 1.397,
    "method": "gauss",
    "niter": 2,
    "resvec": [
      6.1,
      2.2
    ]
  },
  "jacobi": {
    "N": 4,
    "cputime": 3.2323,
    "method": "jacobi",
    "niter": 4,
    "resvec": [
      12.1,
      8.2,
      5.4,
      3.2
    ]
  }
}
```


### Lecture : exemple

En général, nous ne lirons pas les fichiers en `C++` mais en Python avec Matplotlib, [comme expliqué ensuite]({{<relref "help_matplotlib.md">}}). Cependant, la lecture d'un fichier avec ce parser JSON est aisée :

```cpp
#include <iomanip> // Pour std::setw(2)
#include <iostream>
#include <fstream>
#include "json.hpp"

// for convenience
using json = nlohmann::json;

int main(){
  json j;
  std::ifstream f("data.json");
  f >> j;
  f.close();
  return 0;
}
```