console.time("Execution Time");

import { readFileSync } from "fs";

const exemple02: string[] = readFileSync(
    "./day02/inputs02/exemple02.in",
    "utf-8"
)
    .trim()
    .split("\n");

const puzzle02: string[] = readFileSync("./day02/inputs02/puzzle02.in", "utf-8")
    .trim()
    .split("\n");

const min = (line: string) => parseInt(line.split(" ")[0].split("-")[0]);
const max = (line: string) => parseInt(line.split(" ")[0].split("-")[1]);

const char = (line: string) => line.split(" ")[1][0];
const word = (line: string) => line.split(" ")[2];

// PART 1 :
let valid1: number[] = [];
puzzle02.forEach((line: string) => {
    let temp = word(line);
    let charCount = 0;
    // le comptage de charactère peut être fait avec un reduce
    while (temp.indexOf(char(line)) > -1) {
        temp = temp.replace(char(line), "");
        charCount++;
    }
    if (charCount >= min(line) && charCount <= max(line)) {
        valid1.push(1);
    } else {
        valid1.push(0);
    }
});
//console.log(valid1);
console.log(valid1.reduce((acc, val) => acc + val, 0));

// PART 2 :
let valid2: number[] = [];
puzzle02.forEach((line: string) => {
    let temp = word(line);
    let divisedTemp = temp.split("");
    // le ou 'strict' peut se faire avec ^
    if (
        divisedTemp[min(line) - 1] === char(line) ||
        divisedTemp[max(line) - 1] === char(line)
    ) {
        if (
            divisedTemp[min(line) - 1] === char(line) &&
            divisedTemp[max(line) - 1] === char(line)
        ) {
            valid2.push(0);
        } else {
            valid2.push(1);
        }
    } else {
        valid2.push(0);
    }
});
//console.log(valid2);
console.log(valid2.reduce((acc, val) => acc + val, 0));

console.timeEnd("Execution Time");
