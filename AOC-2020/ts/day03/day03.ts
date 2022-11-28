console.time("Execution Time");

import { readFileSync } from "fs";

const exemple03: string[] = readFileSync(
    "./day03/inputs03/exemple03.in",
    "utf-8"
)
    .trim()
    .split("\n");

const puzzle03: string[] = readFileSync("./day03/inputs03/puzzle03.in", "utf-8")
    .trim()
    .split("\n");

// PART 1 :
let count1 = 0;
puzzle03.forEach((line: string, i: number) => {
    if (line.split("")[(3 * i) % line.length] == "#") {
        count1++;
    }
    i++;
});
console.log(count1);

// PART 2 :
type Fraction = {
    num: number;
    denom: number;
};
const cas = (pente: Fraction) => {
    let count = 0;
    puzzle03.forEach((line: string, i: number) => {
        if (
            line.split("")[((pente.num / pente.denom) * i) % line.length] == "#"
        ) {
            count++;
        }
        i++;
    });
    return count;
};
console.log(
    cas({ num: 1, denom: 1 }) *
        cas({ num: 3, denom: 1 }) *
        cas({ num: 5, denom: 1 }) *
        cas({ num: 7, denom: 1 }) *
        cas({ num: 1, denom: 2 })
);
console.timeEnd("Execution Time");
