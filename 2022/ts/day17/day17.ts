import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partOne = (input: string) => {
    const jet = fs
        .readFileSync(`./day17/inputs/${input}.in`, "utf-8")
        .split("");
    let chamberWidth = 9;
    let chamberHeight = 2022 * 2; // just to be sure to have enough space
    let chamber = new Array();
    for (let x = 0; x < chamberWidth + 1; x++) {
        chamber.push([]);
        for (let y = 0; y < chamberHeight; y++) {
            if (x === chamberWidth + 1 - 1) {
                chamber[x].push(y);
            } else chamber[x].push(".");
        }
    }
    let nRocks = 5; // nombre de type de rochers
    let nJet = 0;
    let towerHeight = 0;
    let totalSpawnedRocks = 2022; // nombre de rochers total = 2022
    for (let nRock = 0; nRock < totalSpawnedRocks; nRock++) {
        if (nRock % nRocks === 0) {
            let x = 3;
            let y = chamberHeight - towerHeight - 4;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    chamber[x + 4][y] === "." &&
                    x + 3 < chamber.length - 3
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
        }
        if (nRock % nRocks === 1) {
            let x = 3;
            let y = chamberHeight - towerHeight - 6;
            while (true) {
                if (
                    jet[nJet] === ">" &&
                    x + 2 < chamber.length - 3 &&
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
                    x + 2 < chamber.length - 3 &&
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
                    x < chamber.length - 3 &&
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
                    x + 1 < chamber.length - 3 &&
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
    let transposed = chamber[0].map((_: string[], colIndex: number) =>
        chamber.map((row) => row[colIndex])
    );
    console.log(transposed.map((row: string[]) => row.join("")).join("\n"));
    console.log(towerHeight);
};

partOne("puzzle");

// part1 : 3206 is too high

//console.log('\n--- Day 17: "Pyroclastic Flow" ---\n');
