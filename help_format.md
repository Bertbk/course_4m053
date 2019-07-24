+++
title = "Sortie : JSON"

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
  parent = "help"
  name = "Sortie : JSON"
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

## *Writer* JSON

Il existe naturellement des [parser JSON pour le C++](https://github.com/nlohmann/json), cependant nous proposons d'apprendre à le faire nous même, étant donné nos besoins "minimes".

Nous pouvons créer un writer "manuellement", c'est à dire ouvrir un fichier et le remplir au fur et à mesure de vos besoins : cela fonctionnera parfaitement.


{{% alert tips %}}
Vous pouvez vous aider de lecteur en ligne pour mieux comprendre le format, comme [jsonviewer](http://jsonviewer.stack.hu/), et valider les fichiers de sortie.
{{% /alert %}}

Nous proposons une classe `JSON` relativement simple qui ajoute les données ligne par ligne dans le fichier de sortie. Cela simplifie les méthodes mais rend impossible la modification a posteriori de données déjà imprimées sur disque : à l'utilisateur / utilisatrice d'utiliser correctement cette classe. Nous vous fournissons les débuts, à vous de l'adapter pour ajouter d'autres fonctionnalités. Nous vous fournissons les fichiers `src/JSON.cpp` et `include/JSON.hpp` permettant de créer cette classe avec le constructeur de base ainsi qu'une méthode pour ajouter des entiers.

### `JSON.hpp`

```cpp
#pragma once
#include<fstream>
#include<string>
class JSON{
private:
  std::ofstream file_;
  bool comma_add_;   // Should we place a comma between two JSON::add ?
  bool comma_start_; // same for JSON::start
public:
  JSON(std::string filename); // Constructeur  
  void start(std::string key); // Début d'un jeu de données
  void end(); // Clôture d'un jeu de données
  void add(std::string key, int val); // Ajout d'une donnée de type int
  void close();  // Fermeture du fichier
};
```

### `JSON.cpp`

```cpp
#include "json.hpp"
#include <string>
//Constructeur
JSON::JSON(std::string filename)
{
  file_.open(filename, std::ofstream::out);
  file_ << "{";
  comma_add_ = false;
  comma_start_ = false;
}

// Fermeture du fichier
void JSON::close(){
  if(file_.is_open())
    {
      file_ << "\n}";
      file_.close();
    }
}

// Début d'un jeu de données
void JSON::start(std::string key){
  if(file_.is_open())
    {
      if(comma_start_)
	file_ << ",";
      file_ << "\n  \"" << key << "\" : {";
      comma_start_ = true; // Le prochain appel à JSON::start écrira une virgule
      comma_add_ = false;  // Mais pas le prochain appel à JSON::add()
    }
}

// Clôture d'un jeu de données
void JSON::end(){
  if(file_.is_open())
    {
    file_ << "\n  }";
    comma_add_ = false; // Le prochain appel à JSON::add n'écrira pas de virgule
    }
}

// Ajout d'une donnée de type int
void JSON::add(std::string key, int val){
  if(file_.is_open())
    {
      if(comma_add_)
	file_ << ",";
      file_ << "\n    \"" << key << "\" : " << std::to_string(val);
      comma_add_ = true; // Pas de virgule pour les prochains appels
    }
}
```
{{% alert tips %}}
Un des soucis est la virgule en fin de ligne : doit-on la placer ou non ? Ce problème est ici contourné par l'ajout de deux paramètres de type `bool` permettant de détecter si `JSON::start()` a déjà été appelé ou non, de même pour `add()` au sein d'un jeu de données.
{{% /alert %}}


{{% alert note %}}
Le programme que nous vous fournissons ne peut ajouter que des entiers, à vous de rajouter des méthodes `JSON::add(...)` pour pouvoir ajouter des `std::vector<double>` ou autre...
{{% /alert %}}

### Exemple d'utilisation

```cpp
//Les données sont écrites ici en "dure" pour l'exemple...
int N=4;
std::vector<double> resvecJ = {12.1, 8.2, 5.4, 3.2};
std::vector<double> resvecG = {6.1, 2.2};
//
JSON json("sortie.json");
//Jacobi
json.start("jacobi");
json.add("method", "jacobi");
json.add("N", 4);
json.add("n_iter", static_cast<int>(resvecJ.size());
json.add("resvec", resvecJ);
json.add("cpu_time", 3.2323);
json.end()
//Gauss
json.start("gauss");
json.add("method", "Gauss");
json.add("N", 2);
json.add("n_iter", static_cast<int>(resvecG.size());
json.add("resvec", resvecG);
json.add("cpu_time", 1.397);
json.end();
json.close();
```

Le résultat serait le suivant :
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