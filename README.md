# [Advent of code](https://adventofcode.com)

# &nbsp;[2022](./2022/ts) - [AoC 2022](https://adventofcode.com/2022)

Mon objectif est de réaliser tous les problèmes, si possible le jour de leur sortie.  
Si j'ai le temps, j'avancerai aussi sur les problèmes de l'AoC 2020 en Go.

Languages choisis :

-   TypeScript

Pour afficher une solution : aller sous 2022/ts `(cd 2022/ts)` et lancer `npm install` puis `npm run dayXX`.

---

## --- [Day 01: "Calorie Counting"](https://adventofcode.com/2022/day/1) ---

-   [Ma solution](./2022/ts/day01/day01.ts)

-   Exemple d'entrée :

```
1000
2000
3000

4000

5000
6000
```

-   Remarque :
    -   Utilisation des fonctions sur les tableaux (split, map, reduce, splice, ...) pour obtenir le résultat en une ligne.

---

## --- [Day 02: "Rock Paper Scissors"](https://adventofcode.com/2022/day/2) ---

-   [Ma solution](./2022/ts/day02/day02.ts)

-   Exemple d'entrée :

```
A Y
B X
C Z
```

-   Remarque :
    -   Une meilleure implémentation serait d'utiliser des dictionnaires avec key = "A X" ... et value = le résultat en point au lieu d'un switch pas beau.

---

## --- [Day 03: "Rucksack Reorganization"](https://adventofcode.com/2022/day/3) ---

-   [Ma solution](./2022/ts/day03/day03.ts)

-   Exemple d'entrée :

```
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

-   Remarques :
    -   Les majuscules sont placées avant les minuscules en ASCII :) ;
    -   Utilisation de filter pour trouver les éléments en commun dans plusieurs tableaux ;
    -   Une meilleur implémentation serait d'utiliser des ensembles (Set) et de regarder leur intersection.

---

## --- [Day 04: "Camp Cleanup"](https://adventofcode.com/2022/day/4) ---

-   [Ma solution](./2022/ts/day04/day04.ts)

-   Exemple d'entrée :

```
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
```

-   Remarque :
    -   R.A.S.

---

## --- [Day 05: "Supply Stacks"](https://adventofcode.com/2022/day/5) ---

-   [Ma solution](./2022/ts/day05/day05.ts)

-   Exemple d'entrée :

```
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
```

-   Remarque :
    -   Ce problème est un bon entrainement au parsing, l'astuce est de créer les stacks en prenant les caractères tous les 1 + 4 \* j. Mais ça aurait plus rapide de créer ces listes manuellement.

---

## --- [Day 06: "Tuning Trouble"](https://adventofcode.com/2022/day/6) ---

-   [Ma solution](./2022/ts/day06/day06.ts)

-   Exemple d'entrée :

```
bvwbjplbgvbhsrlpgdmjqwftvncz
```

-   Remarques :
    -   Attention slice != splice ^^ ;
    -   L'utilisation d'ensemble (Set) pour trouver le mot sans répétition trivialise le problème.

---

## --- [Day 07: "No Space Left On Device"](https://adventofcode.com/2022/day/7) ---

-   [Ma solution](./2022/ts/day07/day07.ts)

-   Exemple d'entrée :

```
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
```

-   Remarques :
    -   Attention au fait que les clés d'un dictionnaire doivent être uniques ;
    -   Merci à la FAT32 pour les chemins de fichier <3.

---

## --- [Day 08: "Treetop Tree House"](https://adventofcode.com/2022/day/8) ---

-   [Ma solution](./2022/ts/day08/day08.ts)

-   Exemple d'entrée :

```
30373
25512
65332
33549
35390
```

-   Remarques :
    -   Première réelle utilisation des types ;
    -   On peut travailler uniquement sur des lignes si on sait transposer une matrice et retourner des listes (reverse).

---

## --- [Day 09: "Rope Bridge"](https://adventofcode.com/2022/day/9) ---

-   [Ma solution](./2022/ts/day09/day09.ts)

-   Exemple d'entrée :

```
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
```

-   Remarques :
    -   L'égalité de tableau nécessite de vérifier l'égalité de chaque valeur ;
    -   Lire l'énoncé c'est fort : la queue ne prend pas forcément la position précédente de la tête, dommage de l'avoir découvert uniquement à la partie 2.

---

## --- [Day 10: "Cathode-Ray Tube"](https://adventofcode.com/2022/day/10) ---

-   [Ma solution](./2022/ts/day10/day10.ts)

-   Exemple d'entrée :

```
noop
addx 3
addx -5
```

-   Remarque :
    -   Passage d'indice d'un tableau 2D à 1D : index = x + width \* y.

---

## --- [Day 11: "Monkey in the Middle"](https://adventofcode.com/2022/day/11) ---

-   [Ma solution](./2022/ts/day11/day11.ts)

-   Exemple d'entrée :

```
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0
```

-   Remarques :
    -   PART 1 : R.A.S ;
    -   PART 2 : Obtention de valeurs infinies. J'ai essayé d'utiliser des BigInt mais même problème. La solution est de prendre le reste de la division euclidienne par le produit des tests de divisibilité de chaque singe. Ce reste possède les mêmes propriétés de multiplicité que le nombre initial ;
    -   Le parsing manuel aurait été plus rapide.

---

## --- [Day 12: "Hill Climbing Algorithm"](https://adventofcode.com/2022/day/12) ---

-   [Ma solution](./2022/ts/day12/day12.ts)

-   Exemple d'entrée :

```
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
```

-   Remarques :
    -   Dans un premier temps, j'ai essayé de créer un algorithme naïf avec une marche aléatoire conditionnée et de le lancer un très grand nombre de fois mais je n'arrivais pas à atteindre la fin ne serait-ce qu'une fois donc j'ai abandonné l'idée et j'ai cherché un algorithme de recherche de plus cours chemin ;
    -   La base de ma solution est un [algorithme de parcours en largeur ou BFS pour Breadth-First Search](https://en.wikipedia.org/wiki/Breadth-first_search) dont j'ai trouvé une bonne explication sur le site [Red Blob Games](https://www.redblobgames.com/pathfinding/a-star/introduction.html). Je n'avais jamais traité de problème de ce type donc la phase d'appréhension de l'algo a été longue ;
    -   J'ai trouvé ce problème beaucoup plus difficile que les précédents. J'ai eu plein de problèmes : je me suis perdu avec les indices de ma grille (j'ai inversé X et Y tout au long de la résolution), les clés d'un dictionnaire doivent toujours être uniques (même PB que day07) et elles ne peuvent pas être des objets (=> penser à passer en string pour vérifier que la clé existe déjà), le 'E' est toujours avant les lettres minuscules en ASCII (même PB que day03 ; je l'ai remplacé par un 'z' ici) et l'utilisation de TypeScript m'a plus handicapé qu'autre chose aujourd'hui ;
    -   Pour la partie 2, j'ai d'abord pensé à calculer tous les plus cours chemin en partant de chaque 'a' mais le temps de calcule était trop long. La solution que j'ai trouvé est de partir de l'arrivée puis de chercher le premier 'a' avec une méthode de recherche différente (si on part d'en haut, il faut descendre pour arriver en bas) et enfin calculer la longueur du chemin entre ce 'a' et l'arrivée.

---

## --- [Day 13: "Distress Signal"](https://adventofcode.com/2022/day/13) ---

-   [Ma solution](./2022/ts/day13/day13.ts)

-   Exemple d'entrée :

```
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]
```

-   Remarques :
    -   J'ai perdu pas mal de temps à essayer de parser l'input avant de découvrir la sainte fonction JSON.parse() mais je connaissais déjà Array.sort() pour la partie 2 ;
    -   J'ai aussi perdu du temps dans ma fonction de comparaison car j'avais un cas où je renvoyais des undefined parce que JS ne lance pas d'erreur quand on fait des OutOfBound.

---

## --- [Day 14: "Regolith Reservoir"](https://adventofcode.com/2022/day/14) ---

-   [Ma solution](./2022/ts/day14/day14.ts) // Peut ne pas fonctionner sur d'autres inputs à cause de l'offset utilisé (voir remarque)

-   Exemple d'entrée :

```
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
```

-   Remarque :
    -   J'ai représenté la grille avec des tableaux de tableau, on pouvait aussi utiliser un ensemble contenant chaque point (son tableau de coordonnées transformait en String) et un string représentant sa valeur. L'avantage des tableaux de tableau est de pouvoir "print" la grille facilement et ainsi voir ce qu'il se passe. Par contre, pour la partie 2, j'agrandis le tableau artificielement avec un offset pour simuler le sol infini : c'est pas très élégant et ce n'est pas adapté à tous les inputs (sauf si je mets un offset très très très grand).

---

## --- [Day 15: "Beacon Exclusion Zone"](https://adventofcode.com/2022/day/15) ---

-   [Ma solution](./2022/ts/day15/day15.ts) // Peut ne pas fonctionner sur d'autres inputs à cause de l'offset utilisé (voir remarque)

-   Exemple d'entrée :

```
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
```

-   Remarques :
    -   J'ai utilisé un tableau pour représenté la ligne de la partie 1 (avec un offset pour prendre en compte les points vu par le sensor en dehors de la grille (définie par les coordonnées des points extrémaux)), j'ai donc décalé tous les points sur une grille commençant à 0,0, il faut faire attention à redécaler les points pour le résultat de la partie 2 ;
    -   L'offset définie pour la partie 1 ne rend pas le programme adapté à tous les inputs, il faut donc le modifier pour chaque input ;
    -   Pour la partie 2, en premier essai, j'étais parti pour regarder tous les points de la grille 4000000x4000000 mais je me suis vite rendu compte que ça ne marcherai pas, ensuite je regardais pour tous les sensors, le carré autour de leur vision mais ça ne marchait pas non plus parce que trop de points. Enfin, j'ai regardé uniquement les points sur le cercle extérieur et ça a marché du premier coup.

---

## --- [Day 16: "Proboscidea Volcanium"](https://adventofcode.com/2022/day/16) ---

-   [Ma solution](./2022/ts/day16/day16.ts) // Ne résout pas le problème (voir remarques)
-   [Solution de hyper-neutrino](./2022/ts/day16/day16_2.ts) // voir : [hyper-neutrino](https://www.youtube.com/watch?v=bLMj50cpOug)

-   Exemple d'entrée :

```
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
```

-   Remarques :
    -   Je passe ce problème pour l'instant car je n'ai pas le temps de le faire et il à l'air assez compliqué ;
    -   Update (19/12/22) : après avoir essayé plusieurs méthodes (bruteforce par BFS) que je n'ai par réussi à réellement implémenter, j'ai implémenté une méthode "naïve" qui consiste à choisir au hasard si on ouvre la valve ou si on change de tunnel (choisi aussi aléatoirement). J'éxécute cet algorithme un grand nombre de fois (10_000_000) et je calcule à chaque fois la pression libérée. Cette méthode me donne un borne inférieure de la pression libérée maximale par mon input (1605) -> résultat "too low" sur le site adventofcode. J'ai ensuite réduit l'intervalle de recherche en essayant 1650 (en pensant que ma méthode trouverait une valeur de pression libérée maximale assez proche de la réalité (car les pressions libérées par les valves sont assez faibles et car j'éxécute un grand nombre de fois)) -> résultat "too high". Il me restait donc 44 possibilités, j'ai donc essayé bêtement (pas si bêtement que ça car je continuais en même temps à lancer mon algorithme pour trouver une nouvelle borne inférieure donc c'était mieux de diminuer la borne supérieure) 1649 puis 1648 puis 1647 et 1647 était la bonne réponse !!
    -   (Malheureusement pour ma 2ème étoile, je ne peux pas faire pareil pour la partie 2 car toutes mes valeurs trouvées sont "too low" (mais j'ai quand même trouvé une borne inférieure pour mon input de 1830)) ;
    -   Update (22/12/22) : j'ai implémenté (copié ^^) la solution de hyper-neutrino, elle consiste en un DFS bruteforce avec un cache pour la mémoisation et quelques optimisations ;
    -   Comme le jour 19, je ne peux pas compter ce jour comme réussi mais j'ai quand même appris beaucoup de choses (DFS, bitmask) en essayant de le résoudre et en regardant les solutions des autres.

---

## --- [Day 17: "Pyroclastic Flow"](https://adventofcode.com/2022/day/17) ---

-   [Ma solution](./2022/ts/day17/day17.ts) // Ne résout pas la partie 2 du problème (voir remarques)

-   Exemple d'entrée :

```
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
```

-   Remarques :
    -   Pour la partie 1 de ce problème, je me suis d'abord inspiré de ma solution du day14 car le problème semblait équivalent mais l'ajout de jet de gaz m'empéchait de faire des fonctions récursives car j'avais besoin de stocker l'index du jet et de modifier le tableau. J'ai donc opter pour des boucles qui s'arrêtent quand la pierre ne doit plus tomber. (J'ai contourné le problème de déplacer la pierre avant d'essayer de la faire descendre en faisant une boucle while(true) et en faisant un break quand la pierre ne doit plus tomber). Le fait de travailler sur un tableau de toutes les colonnes m'a permis d'afficher facilement ce tableau en le transposant et donc de facilement trouver les conditions d'arrêt où de déplacement des pierres ;
    -   Le calcul de la hauteur de la tour a aussi été un argument pour faire des tableaux de colonnes, il suffisait alors de trouver la colonne la plus haute, c'est à dire la colonne qui possède le "#" le plus haut ;
    -   Pour la partie 2, je me suis vite rendu compte que changer 2022 en 1000000000000 ne marcherait pas (trop long + pb de mémoire). J'ai pensé à plusieurs solutions : trouver un pattern qui se répétait mais je n'ai pas réussi dans un premier temps. Ensuite, j'ai essayé de travailler sur un tableau plus petit et l'augmenter à chaque fois qu'une pierre se posait (et en même temps couper le bas du tableau) mais je n'ai pas réussi à l'implémenter. Enfin, je suis revenu sur la recherche de pattern en cherchant une astuce sur Internet, j'ai trouvé que la pierre en forme "-" était la clé pour trouver le pattern car c'est pas possible qu'une autre pierre de même forme passe en dessous d'elle. Le cycle trouvé correspond au position x de cette pierre et à l'index de jet dans la liste qui se répétent (ça se voit très bien sur l'exemple (cycle court) mais moins bien sur le puzzle (cycle long)). Il suffit alors de mesurer le nombre de pierre dans un cycle et la différence de hauteur de la tour en un cycle. Pour le calcul, on part du nombre de pierre souhaité et on soustrait le nombre de pierre avant le départ du cycle (nommé base), ensuite on divise (euclidienne) par le nombre de pierre dans un cycle (on garde le reste) et on multiplie par la hauteur sur un cycle. Enfin, on ajoute la hauteur correspondante au reste de la division et de la base ;
    -   Je n'ai pas implémenté dans mon programme la recherche de pattern (= cycle), j'ai juste fait le calcul à la main ;
    -   // TODO (part2 ): implémenter la recherche de pattern.

---

## --- [Day 18: "Boiling Boulders"](https://adventofcode.com/2022/day/18) ---

-   [Ma solution](./2022/ts/day18/day18.ts)

-   Exemple d'entrée :

```
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
```

-   Remarques :
    -   Pour la partie 1, je commence avec une surface de 6x le nombre de cube puis je diminue cette surface pour chaque pair de cube qui se touchent (je diminue seulement de 1 par pair car les pairs de cubes vont apparaître deux fois) ;
    -   Pour la partie 2, je suis passé à la représentation des cubes dans tableau 3D où "#" est un cube de lave, "." est un cube d'air (= initialement tous les cubes qui ne sont pas de la lave puis uniquement les cubes à l'intérieur de la goutte de lave)et "O" est un cube d'eau (= cubes à l'extérieur de la goutte de lave) ;
    -   Pour remplacer l'air (".") à l'extérieur de la goutte de lave par de l'eau ("O"), j'ai implémenté un [algorithme de remplissage par diffusion (ou Flood fill algorithm)](https://fr.wikipedia.org/wiki/Algorithme_de_remplissage_par_diffusion#:~:text=L'algorithme%20de%20remplissage%20par,d'images%20matricielles%20comme%20Paint.) que j'ai trouvé sur [CodeGuru](https://www.codeguru.co.in/2021/10/flood-fill-algorithm-in-javascript.html) ;
    -   Enfin, la surface extérieure de la goutte de lave est la surface totale calculée à la partie 1 moins la surface intérieure de la goutte de lave.

---

## --- [Day 19: "Not Enough Minerals"](https://adventofcode.com/2022/day/19) ---

-   [Ma solution](./2022/ts/day19/day19.ts) // Trèèèès long et très inspiré (copié) de la solution de [jonathanpaulson](https://www.youtube.com/watch?v=yT3yHDp6hss)

-   Exemple d'entrée :

```
Blueprint 1:
  Each ore robot costs 4 ore.
  Each clay robot costs 2 ore.
  Each obsidian robot costs 3 ore and 14 clay.
  Each geode robot costs 2 ore and 7 obsidian.

Blueprint 2:
  Each ore robot costs 2 ore.
  Each clay robot costs 3 ore.
  Each obsidian robot costs 3 ore and 8 clay.
  Each geode robot costs 3 ore and 12 obsidian.
```

-   Remarques :
    -   J'ai pensé à prendre le problème comme un problème de programmation linéaire (avec des contraintes et un objectif (maximiser le nombre de géode produites)) mais je n'ai pas réussi à l'implémenter (et je n'ai pas trouvé de solver de programmation linéaire en JavaScript) ;
    -   Je passe ce problème (pour l'instant?) ;
    -   Update (21/12/22) : Après avoir regardé plusieurs solutions (notamment celle de [jonathanpaulson](https://www.youtube.com/watch?v=yT3yHDp6hss) et celle de [hyper-neutrino](https://www.youtube.com/watch?v=H3PSODv4nf0)), lu beaucoup d'astuces sur le Reddit [adventofcode](https://www.reddit.com/r/adventofcode/comments/zpihwi/2022_day_19_solutions/) et avoir lu beaucoup de choses sur comment faire un algorithme "bruteforce" par BFS ou DFS, qu'est-ce que la mémoisation et la programmation dynamique. J'ai adapté ce que j'avais fait grâce à l'algorithme de jonathanpaulson et aux optimisations heuristiques ou logiques trouvées. Mon algorithme finit en 12min pour la partie 1 et presque 1h30 pour la partie 2. Je n'ai pas compris pourquoi ça prend autant de temps alors que celui de jonathanpaulson finit en moins d'une minute ;
    -   Je ne peux pas compter ce jour comme réussi car j'ai dû regarder la solution mais je retiens quand même la méthode de résolution (bruteforce par BFS) et les optimisations heuristiques ou logiques trouvées.

---

## --- [Day 20: "Grove Positioning System"](https://adventofcode.com/2022/day/20) ---

-   [Ma solution](./2022/ts/day20/day20.ts)

-   Exemple d'entrée :

```
1
2
-3
3
-2
0
4
```

-   Remarques :
    -   Il faut faire attention au fait qu'il y ait des doublons dans le fichier, j'ai donc utilisé une liste pour les valeurs et une liste pour les indices (il est possible de factoriser ses deux listes en une seule). Pour chaque indice sur la liste de départ, je récupère l'indice de la liste d'indice modifiée qui à pour valeur celui de la liste de départ. Ensuite je modifie la liste d'indice puis la liste de valeur en respectant la condition de déplacement (si 3 est à la position 2 alors on le déplace à la position 3 + 2 = 5 (modulo la taille de la liste)) ;
    -   Il faut aussi garder en tête que la liste est circulaire donc en affichant la liste, on n'obtient une rotation du résultat attendu sur l'énoncé du problème (car on déplace toute la liste en ajoutant une valeur) ;
    -   J'ai appris à mettre des couleurs, surligner, souligner, ... dans le terminal, c'est bo.

---

## --- [Day 21: "Monkey Math"](https://adventofcode.com/2022/day/21) ---

-   [Ma solution](./2022/ts/day21/day21.ts)

-   Exemple d'entrée :

```
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
```

-   Remarques :
    -   Ma structure de données est la suivante : 1 dictionnaire (yelled) pour les singes qui crient des nombres et 1 dictionnaire (waiting) pour les singes qui ont des équations. Tant que waiting n'est pas vide, je résouds les équations possibles et j'ajoute dans yelled les nombres criés ;
    -   Pour la partie 2, j'ai d'abord fait une dichotomie "à la main" en calculant le résultat des deux parties (gauche et droite) de l'équation de root pour une valeur de "humn" (notée "me") comprise entre 0 et 1000. Comme je n'obtenais pas de résultat, j'ai affiché la valeur de gauche-droite et je me suis rendu compte qu'elles étaient très éloignées donc j'ai changé les bornes inférieures et supérieures en tatonant (en sachant que si la différence obtenue diminuait quand me augmentait alors il fallait que j'augmente me et réciproquement). Ca marche parce que la fonction est monotone de humn. C'est donc comme ça que j'ai eu mon étoile ;
    -   Ensuite, j'ai implémenté une vraie dichotomie (qui commence entre 0 et 10^20 (arbitrairement) pour être sûr que ça marche sur tous les inputs), elle s'arrête quand elle a trouvé la valeur de me qui vérifie l'équation de root. Cependant, il faut faire attention au sens de la dichotomie (le fait d'augmenter ou de diminuer me si la différence gauche-droite est positive ou négative). Pour ça, je regarde la première valeur de la différence, si celle-ci est positive, je sais que je dois diminuer me (car je travaille avec un me très grand de base) et ce pour tous les récursions suivantes, et réciproquement.

---

## --- [Day 22: "Monkey Map"](https://adventofcode.com/2022/day/22) ---

-   [Ma solution](./2022/ts/day22/day22.ts) // Ne fonctionne pas pour l'exemple et pour les inputs qui n'ont pas exactement la même forme que le mien

-   Exemple d'entrée :

```
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
```

-   Remarques :
    -   Pour la première partie, j'ai simplement simulé les instructions sur la grille donnée ;
    -   Pour la seconde partie, j'ai codé en dur les règles de déplacement spéciales quand on changé de face sur le cube. Ainsi, mon programme ne fonctionne que pour les inputs qui ont exactement la même forme que le mien (donc pas pour l'exemple) ;
    -   J'ai aussi pris pas mal de temps à réfléchir à une solution générique mais je n'ai pas trouvé de solution ;
    -   Deux petits points à faire attention : ne pas oublier de renvoyer la direction à la fin du déplacement (utile uniquement pour la deuxième partie) et ne pas oublier de bloquer le déplacement quand on arrive sur un mur '#'.

---

## --- [Day 23: coming soon...](https://adventofcode.com/2022/day/23) ---

-   [Ma solution](./2022/ts/day23/day23.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 24: coming soon...](https://adventofcode.com/2022/day/24) ---

-   [Ma solution](./2022/ts/day24/day24.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 25: coming soon...](https://adventofcode.com/2022/day/25) ---

-   [Ma solution](./2022/ts/day25/day25.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

<br>

# &nbsp;[2020](./2020) - [AoC 2020](https://adventofcode.com/2020)

Languages choisis :

-   js/ts (uniquement pour les premiers jours)
-   Go

Pour afficher une solution en js/ts : aller sous 2020/js ou 2020/ts `(cd 2020/js` ou `cd 2020/ts)` et lancer `npm install` puis `npm run dayXX`.  
Pour afficher une solution en Go : aller sous 2020/go/dayXX et lancer `go run .` ou `go run dayXX.go`.

---

## &nbsp;&nbsp;&nbsp;// TODO : Liens + remarques sur AoC 2020 en Golang.

---
