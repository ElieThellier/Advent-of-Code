# [Advent of code](https://adventofcode.com)

# &nbsp;[2020](./2020) - [AoC 2020](https://adventofcode.com/2020)

Languages choisis :

-   js/ts
-   Go

Pour afficher une solution : aller sous 2020/js ou 2020/ts et lancer `npm install` puis `npm run dayXX`.

---

## &nbsp;&nbsp;&nbsp;// TO DO

---

# &nbsp;[2022](./2022) - [AoC 2022](https://adventofcode.com/2022)

Mon objectif est de réaliser tous les problèmes, si possible le jour de leur sortie.

Languages choisis :

-   TypeScript

Pour afficher une solution : aller sous 2022/ts et lancer `npm install` puis `npm run dayXX`.

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

7000
8000
9000

10000
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
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
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

-   ## Remarques :
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
    -   La base de ma solution est un [algorithme A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) dont j'ai trouvé une bonne explication sur le site [Red Blob Games](https://www.redblobgames.com/pathfinding/a-star/introduction.html). Je n'avais jamais traité de problème de ce type donc la phase d'appréhension de l'algo a été longue ;
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

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
```

-   Remarques :
    -   J'ai perdu pas mal de temps à essayer de parser l'input avant de découvrir la sainte fonction JSON.parse() mais je connaissais déjà Array.sort() pour la partie 2;
    -   J'ai aussi perdu du temps dans ma fonction de comparaison car j'avais un cas où je renvoyais des undefined parce que JS ne lance pas d'erreur quand on fait des OutOfBound.

---

## --- [Day 14: coming soon...](https://adventofcode.com/2022/day/14) ---

-   [Ma solution](./2022/ts/day14/day14.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 15: coming soon...](https://adventofcode.com/2022/day/15) ---

-   [Ma solution](./2022/ts/day15/day15.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 16: coming soon...](https://adventofcode.com/2022/day/16) ---

-   [Ma solution](./2022/ts/day16/day16.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 17: coming soon...](https://adventofcode.com/2022/day/17) ---

-   [Ma solution](./2022/ts/day17/day17.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 18: coming soon...](https://adventofcode.com/2022/day/18) ---

-   [Ma solution](./2022/ts/day18/day18.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 19: coming soon...](https://adventofcode.com/2022/day/19) ---

-   [Ma solution](./2022/ts/day19/day19.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 20: coming soon...](https://adventofcode.com/2022/day/20) ---

-   [Ma solution](./2022/ts/day20/day20.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 21: coming soon...](https://adventofcode.com/2022/day/21) ---

-   [Ma solution](./2022/ts/day21/day21.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

---

## --- [Day 22: coming soon...](https://adventofcode.com/2022/day/22) ---

-   [Ma solution](./2022/ts/day22/day22.ts)

-   Exemple d'entrée :

```

```

-   Remarques :
    -   .

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
