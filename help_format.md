+++
title = "Données de Sortie : Format & Visualisation"

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
  parent = "help"
  name = "Sortie : Format & Visu"
  weight = 10

+++
{{% alert warning%}}
En cours de construction...
{{% /alert %}}

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
  "simu1": {
    "method": "jacobi",
    "N": 4,
    "ntier": 3,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323,
  },
}
```

Un tel format présente l'avantage d'être lisible par Python ou JavaScript (d'où son nom) à travers certaines bibliothèques. En particulier, un script mis à disposition en fin de page permet de lire un tel fichier au format JSON et affiche la courbe associée à la clé `resvec` en échelle logarithmique. Vous pouvez alors librement l'adapter pour afficher une autre quantité.

### En détail

Un fichier JSON commence par `{` et se termine par `}`. Entre les accolades se trouvent les données qui peuvent être :

1. Une paire clé/valeur, ex. `"method" : "jacobi"
2. Une liste ordonnée de valeurs : `"resvec" : [ 12.1, 8.2, 5.4, 3.2]`

Une clé peut aussi faire référence à un objet, entouré alors d'accolades, comme `"simu1"` ci-dessous qui regroupe plusieurs paramètres :
```json
{
  "simu1": {
    "method": "jacobi",
    "N": 4,
    "ntier": 3,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323,
  }
}
```

Nous pouvons concaténer ainsi plusieurs résultats de simulations dans un même fichier :

<div id="#jsonfile"></div>

```json
{
  "simu1": {
    "method": "jacobi",
    "N": 4,
    "ntier": 4,
    "resvec":  [ 12.1, 8.2, 5.4, 3.2],
    "cpu_time": 3.2323
  },
  "simu2": {
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

Dans des fichiers à part, par exemple `src/JSON.cpp` et `include/JSON.hpp`, créez une classe `JSON` permettant d'écrire des données relative à une simulation dans un fichier (ou plutôt, à la suite, dans un fichier).

Vous pouvez vous aider de lecteur en ligne pour mieux comprendre le format, comme [jsonviewer](http://jsonviewer.stack.hu/), et valider les fichiers de sortie.

Nous proposons que cette classe `JSON` ait les méthodes et paramètres suivants. Bien entendu, à vous de vous adapter à vos besoins : ce n'est ici qu'une proposition !

### Besoins

Nous aurons besoin d'imprimer sur fichier des `int`, `double`, `string` ainsi que des tableaux de `double`.

### Paramètres

- `filename_` : nom du fichier de sortie
- `main_key_` : nom de la clé principale

### Méthodes

- Constructeur par nom de fichier et par clé principale

```cpp
JSON(std::string filename, std::string main_key);
```

- Ajout d'un entier `int`

```cpp
JSON::add(std::string key, int val);
```

- Ajout d'un entier `double`

```cpp
JSON::add(std::string key, double val);
```

- Ajout d'un entier `string`

```cpp
JSON::add(std::string key, std::string val);
```

- Ajout d'un tableau de double `std::vector<double>` (par pointeur ou référence !)

```cpp
JSON::add(std::string key, const std::vector<double> val);
```

### Exemple d'utilisation

```cpp
//calcul de données...
//...
// Ouvre le fichier sortie.json et place le curseur en fin de fichier (et supprime l'éventuelle accolade fermante)
JSON json("sortie.json", "iterative");
//Imprime un jeu de données de type int/double/string
double cpu_time = 23.2;
json.add("cpu_time", cpu_time);
std::string method = "jacobi";
json.add("method", jacobi);
//Imprime un tableau de données
std::vector<double> resvec = {2.3, 2.1, 23.1};
json.add("resvec", resvec);
// Ferme le fichier et ajoute les accolades fermantes
json.close();
```

Le résultat serait le suivant ici :
```
{
  "iterative":
  {
    "method": "jacobi",
    "cpu_time": 23.2,
    "resvec": [2.3, 2.1, 23.1],
  }
}
```

## Python & Matplotlib

Nous pouvons utiliser [Pandas](https://pandas.pydata.org/) pour lire le fichier JSON ou alors, le petit script ci-dessous affichera la courbe de convergence associée à la quantité `resvec` de la clé `simu1`, du fichier JSON précédént :

```python
# Python 3
import json
import matplotlib.pyplot as plt

data_file = open('data.json', 'r')
data = json.load(data_file)
print(data['simu1']['resvec'])
data_file.close()

fig, ax = plt.subplots()
ax.plot(data['simu1']['resvec'])
plt.show()
```