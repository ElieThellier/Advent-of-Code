import { readFileSync } from "fs";

console.time("Execution Time");

const exemple01 = readFileSync("./day01/inputs01/exemple01.in", "utf-8")
    .trim()
    .split("\n")
    .map((x) => parseInt(x));
const puzzle01 = readFileSync("./day01/inputs01/puzzle01.in", "utf-8")
    .trim()
    .split("\n")
    .map((x) => parseInt(x));

exemple01.sort((a, b) => a - b);
puzzle01.sort((a, b) => a - b);

/*
// solution naive pour la part 2 (pour la part 1, enlever une boucle)
outerloop: for (let i = 0; i < puzzle01.length; i++) {
    for (let j = 0; j < puzzle01.length; j++) {
        for (let k = 0; k < puzzle01.length; k++) {
            if (puzzle01[i] + puzzle01[j] + puzzle01[k] === 2020) {
                console.log(puzzle01[i] * puzzle01[j] * puzzle01[k]);
                break outerloop;
            }
        }
    }
}
*/

/*
// utilisation de filter part 1
for (let i = 0; i < puzzle01.length; i++) {
    let goal = 2020 - puzzle01[i];
    let filtered = puzzle01.filter((x) => x === goal);
    if (filtered.length === 1) {
        console.log(filtered[0] * puzzle01[i]);
        break;
    }
}
*/

// utilisation de filter + solution naive pour faire la part 2
outerloop: for (let i = 0; i < puzzle01.length; i++) {
    let filtered1 = puzzle01.filter((x) => x <= 2020 - puzzle01[i]);
    for (let j = 0; j < filtered1.length; j++) {
        let goal = 2020 - puzzle01[i] - filtered1[j];
        let filtered2 = filtered1.filter((x) => x === goal);
        if (filtered2.length === 1) {
            console.log(filtered2[0] * puzzle01[i] * filtered1[j]);
            break outerloop;
        }
    }
}

/*
// Other solution with combinaisons (from colinfay.me)

// doing combinaisons :
let puzzle01_cop = puzzle01;
let comb = puzzle01.flatMap((i) => puzzle01_cop.map((j) => [i, j]));
// getting the 2020 :
let twentytwenty = comb.filter((x) => x[0] + x[1] === 2020);
// solution :
console.log(twentytwenty);
let sol = twentytwenty.reduce((y) => y[0] * y[1]);
console.log(sol);
*/

console.timeEnd("Execution Time");
