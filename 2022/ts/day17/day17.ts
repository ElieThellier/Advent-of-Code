import * as fs from "fs";

const timer = (
    script: (i: string, n: number) => number,
    input: string,
    n: number
) => {
    const start = performance.now();
    script(input, n);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

// can be refactored by reducing duplicate code
const partOne = (input: string, totalRocks: number) => {
    const jet = fs
        .readFileSync(`./day17/inputs/${input}.in`, "utf-8")
        .split("");
    let chamberWidth = 8;
    let chamberHeight = 6000; // just to be sure to have enough space -> breaks if you want to put more rocks
    let chamber = new Array();
    for (let x = 0; x < chamberWidth + 1; x++) {
        chamber.push([]);
        for (let y = 0; y < chamberHeight; y++) {
            chamber[x].push(".");
        }
    }
    let nRocks = 5; // nombre de type de rochers
    let nJet = 0;
    let towerHeight = 0;
    for (let nRock = 0; nRock < totalRocks; nRock++) {
        if (nRock % nRocks === 0) {
            let x = 3;
            let y = chamberHeight - towerHeight - 4;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    chamber[x + 4][y] === "." &&
                    x + 3 < chamber.length - 2
                ) {
                    x += 1;
                } else if (
                    jet[nJet] === "<" &&
                    x > 1 &&
                    chamber[x - 1][y] === "."
                ) {
                    x -= 1;
                }
                nJet++;
                if (nJet === jet.length) {
                    nJet = 0;
                }
                if (
                    chamber[x][y + 1] !== "." ||
                    chamber[x + 1][y + 1] !== "." ||
                    chamber[x + 2][y + 1] !== "." ||
                    chamber[x + 3][y + 1] !== "."
                )
                    break;
                y++;
            }
            chamber[x][y] = "#";
            chamber[x + 1][y] = "#";
            chamber[x + 2][y] = "#";
            chamber[x + 3][y] = "#";

            // POUR TROUVER LE PATTERN DE LA PARTIE 2
            /* if (
                towerHeight !==
                chamberHeight -
                    Math.min(
                        ...chamber
                            .map((col) => col.indexOf("#"))
                            .filter((x) => x !== -1)
                    )
            ) {
                console.log(x, nJet, nRock, towerHeight);
            } */
        }
        if (nRock % nRocks === 1) {
            let x = 3;
            let y = chamberHeight - towerHeight - 6;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    x + 2 < chamber.length - 2 &&
                    chamber[x + 2][y] === "." &&
                    chamber[x + 3][y + 1] === "." &&
                    chamber[x + 2][y + 2] === "."
                ) {
                    x += 1;
                } else if (
                    jet[nJet] === "<" &&
                    x > 1 &&
                    chamber[x][y] === "." &&
                    chamber[x - 1][y + 1] === "." &&
                    chamber[x][y + 2] === "."
                ) {
                    x -= 1;
                }
                nJet++;
                if (nJet === jet.length) {
                    nJet = 0;
                }
                if (
                    chamber[x][y + 2] !== "." ||
                    chamber[x + 1][y + 3] !== "." ||
                    chamber[x + 2][y + 2] !== "."
                )
                    break;
                y++;
            }
            chamber[x][y + 1] = "#";
            chamber[x + 1][y] = "#";
            chamber[x + 1][y + 1] = "#";
            chamber[x + 1][y + 2] = "#";
            chamber[x + 2][y + 1] = "#";
        }
        if (nRock % nRocks === 2) {
            let x = 3;
            let y = chamberHeight - towerHeight - 6;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    x + 2 < chamber.length - 2 &&
                    chamber[x + 3][y] === "." &&
                    chamber[x + 3][y + 1] === "." &&
                    chamber[x + 3][y + 2] === "."
                ) {
                    x += 1;
                } else if (
                    jet[nJet] === "<" &&
                    x > 1 &&
                    chamber[x + 1][y] === "." &&
                    chamber[x + 1][y + 1] === "." &&
                    chamber[x - 1][y + 2] === "."
                ) {
                    x -= 1;
                }
                nJet++;
                if (nJet === jet.length) {
                    nJet = 0;
                }
                if (
                    chamber[x][y + 3] !== "." ||
                    chamber[x + 1][y + 3] !== "." ||
                    chamber[x + 2][y + 3] !== "."
                )
                    break;
                y++;
            }

            chamber[x + 2][y] = "#";
            chamber[x + 2][y + 1] = "#";
            chamber[x + 2][y + 2] = "#";
            chamber[x + 1][y + 2] = "#";
            chamber[x][y + 2] = "#";
        }

        if (nRock % nRocks === 3) {
            let x = 3;
            let y = chamberHeight - towerHeight - 7;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    x < chamber.length - 2 &&
                    chamber[x + 1][y] === "." &&
                    chamber[x + 1][y + 1] === "." &&
                    chamber[x + 1][y + 2] === "." &&
                    chamber[x + 1][y + 3] === "."
                ) {
                    x += 1;
                } else if (
                    jet[nJet] === "<" &&
                    x > 1 &&
                    chamber[x - 1][y] === "." &&
                    chamber[x - 1][y + 1] === "." &&
                    chamber[x - 1][y + 2] === "." &&
                    chamber[x - 1][y + 3] === "."
                ) {
                    x -= 1;
                }
                nJet++;
                if (nJet === jet.length) {
                    nJet = 0;
                }
                if (chamber[x][y + 4] !== ".") break;
                y++;
            }

            chamber[x][y] = "#";
            chamber[x][y + 1] = "#";
            chamber[x][y + 2] = "#";
            chamber[x][y + 3] = "#";
        }

        if (nRock % nRocks === 4) {
            let x = 3;
            let y = chamberHeight - towerHeight - 5;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    x + 1 < chamber.length - 2 &&
                    chamber[x + 2][y] === "." &&
                    chamber[x + 2][y + 1] === "."
                ) {
                    x += 1;
                } else if (
                    jet[nJet] === "<" &&
                    x > 1 &&
                    chamber[x - 1][y] === "." &&
                    chamber[x - 1][y + 1] === "."
                ) {
                    x -= 1;
                }
                nJet++;
                if (nJet === jet.length) {
                    nJet = 0;
                }
                if (chamber[x][y + 2] !== "." || chamber[x + 1][y + 2] !== ".")
                    break;
                y++;
            }

            chamber[x][y] = "#";
            chamber[x][y + 1] = "#";
            chamber[x + 1][y] = "#";
            chamber[x + 1][y + 1] = "#";
        }

        towerHeight =
            chamberHeight -
            Math.min(
                ...chamber
                    .map((col) => col.indexOf("#"))
                    .filter((x) => x !== -1)
            );
    }
    /* let transposed = chamber[0].map((_: string[], colIndex: number) =>
        chamber.map((row) => row[colIndex])
    );
    console.log(transposed.map((row: string[]) => row.join("")).join("\n")); */

    return towerHeight;
};

// part1 : 3206 is too high
console.log('\n--- Day 17: "Pyroclastic Flow" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : _${partOne(
            input,
            2022
        )}_ is the height of the tower of rocks after 2022 rocks (executed in ${timer(
            partOne,
            input,
            2022
        )})`
    );
});
console.log("");

// pour la part2 ça prendrai un temps environ infini ^^
//partOne("example", 1_000_000_000_000);
//partOne("puzzle", 1_000_000_000_000);

// Pour la partie 2, je cherche à trouver une formule qui donne la hauteur de la tour à partir du nombre de rochers tombés et en fonction des données déjà connues mais j'ai pas l'impression qu'il y ai une vraie répétition.
// J'ai aussi chercher à trouver un pattern en gardant les n dernières lignes de la grille et en les comparant au n dernières lignes de hauteur de tour mais je ne trouve pas de pattern de 10 lignes sur 50000 répétitions.
// remarque : si on lance 3851 pierres, on obtient une même hauteur que si on en lance 100 000 000
// J'ai d'abord essayé à taton mais ça marchait pas donc j'ai essayé sur l'exemple

// autre astuce trouvée sur internet : couper la grille sur les 40 dernières hauteurs et garder en mémoire la hauteur de la tour uniquement mais j'ai pas réussi à la mettre en place

// J'ai trouvé sur Internet qu'il suffisait de chercher le pattern sur les pierres de forme - car celles d'après pouvait pas passer en dessous (ce que je fais avec la ligne 67)

// RAISONNEMENT :
// pour MON input puzzle : j'ai une base de 115 pierres avant la ligne qui commence le pattern (= cycle)
// le pattern fait 1740 pierres et 2716 de hauteur de tour
// le calcul est le suivant : 1_000_000_000_000 - 115 = 999999999885
// puis 999999999885 % 1740 = 1065 et 999999999885 / 1740 = 574712643
// 574712643 * 2716 = 1560919538388
// il reste plus qu'à ajouter la hauteur de la tour avant le pattern et la hauteur du reste (1065), pour ça on peut lancer le programme de calcul de hauteur sur base+reste = 115+1065 = 1180 pierres
// on obtient 1857 de hauteur de tour
// en additionnant, on obtient pour 1_000_000_000_000 pierres : 1560919538388 + 1857 = 1560919540245

// part2 : 317359569 is too low
// part2 : 494559842 is too low
// part2 : 1560919540227 not good
// part2 : 1560919538573 not good

console.log(
    `PART 2 "example" : _1514285714288_ is the height of the tower of rocks after 1000000000000 rocks (not executed : done with seeking pattern and maths)`
);
console.log(
    `PART 2 "puzzle" : _1560919540245_ is the height of the tower of rocks after 1000000000000 rocks (not executed : done with seeking pattern and maths)`
);
console.log("");
