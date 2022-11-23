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

const min = (line: string) => line.split(" ")[0].split("-")[0];
const max = (line: string) => line.split(" ")[0].split("-")[1];

const char = (line: string) => line.split(" ")[1][0];
const word = (line: string) => line.split(" ")[2];

let valid: number = 0;
exemple02.forEach((line: string) => {
    let temp = word(line);
    while (temp.indexOf(char(line)) > -1) {
        temp = temp.slice(temp.indexOf(char(line)) + 1);
        valid++;
    }
});
console.log(valid);
console.timeEnd("Execution Time");
