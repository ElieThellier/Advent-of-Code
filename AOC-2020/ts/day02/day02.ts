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

let valid: number[] = [];
puzzle02.forEach((line: string) => {
    let temp = word(line);
    let charCount = 0;
    while (temp.indexOf(char(line)) > -1) {
        temp = temp.replace(char(line), "");
        charCount++;
    }
    if (charCount >= min(line) && charCount <= max(line)) {
        valid.push(1);
    } else {
        valid.push(0);
    }
});
console.log(valid);
console.log(valid.reduce((acc, val) => acc + val, 0));

console.timeEnd("Execution Time");
