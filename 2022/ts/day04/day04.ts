import * as fs from "fs";

console.time("\nExecution Time");

const parser = (input: string) =>
    fs.readFileSync(`./day04/inputs/${input}.in`, "utf-8").trim().split("\n");

const partOne = (input: string) => {
    let pairs: string[] = parser(input);
    let firstElves: string[] = pairs.map((pair) => pair.split(",")[0]);
    let minFirstElves: number[] = firstElves.map((elve) =>
        parseInt(elve.split("-")[0])
    );
    let maxFirstElves: number[] = firstElves.map((elve) =>
        parseInt(elve.split("-")[1])
    );
    let secondElves: string[] = pairs.map((pair) => pair.split(",")[1]);
    let minSecondElves: number[] = secondElves.map((elve) =>
        parseInt(elve.split("-")[0])
    );
    let maxSecondElves: number[] = secondElves.map((elve) =>
        parseInt(elve.split("-")[1])
    );
    let countFullyOverlapping: number = 0;
    pairs.forEach((pair, index) => {
        if (
            (minFirstElves[index] <= minSecondElves[index] &&
                maxFirstElves[index] >= maxSecondElves[index]) ||
            (minFirstElves[index] >= minSecondElves[index] &&
                maxFirstElves[index] <= maxSecondElves[index])
        )
            countFullyOverlapping++;
    });
    return countFullyOverlapping;
};

const partTwo = (input: string) => {
    let pairs: string[] = parser(input);
    let firstElves: string[] = pairs.map((pair) => pair.split(",")[0]);
    let minFirstElves: number[] = firstElves.map((elve) =>
        parseInt(elve.split("-")[0])
    );
    let maxFirstElves: number[] = firstElves.map((elve) =>
        parseInt(elve.split("-")[1])
    );
    let secondElves: string[] = pairs.map((pair) => pair.split(",")[1]);
    let minSecondElves: number[] = secondElves.map((elve) =>
        parseInt(elve.split("-")[0])
    );
    let maxSecondElves: number[] = secondElves.map((elve) =>
        parseInt(elve.split("-")[1])
    );
    let countOverlapping: number = 0;
    pairs.forEach((pair, index) => {
        if (
            (minFirstElves[index] <= minSecondElves[index] &&
                maxFirstElves[index] >= maxSecondElves[index]) ||
            (minFirstElves[index] >= minSecondElves[index] &&
                maxFirstElves[index] <= maxSecondElves[index]) ||
            (minFirstElves[index] <= minSecondElves[index] &&
                maxFirstElves[index] >= minSecondElves[index]) ||
            (minFirstElves[index] >= minSecondElves[index] &&
                maxFirstElves[index] <= minSecondElves[index]) ||
            (minFirstElves[index] <= maxSecondElves[index] &&
                maxFirstElves[index] >= maxSecondElves[index]) ||
            (minFirstElves[index] >= maxSecondElves[index] &&
                maxFirstElves[index] <= maxSecondElves[index])
        )
            countOverlapping++;
    });
    return countOverlapping;
};

const logResults = (inputs: string[]) => {
    inputs.forEach((input) =>
        console.log(
            `PART 1 : The total fully overlapping pairs for the input "${input}" is equal to _${partOne(
                input
            )}_`
        )
    );
    inputs.forEach((input) =>
        console.log(
            `PART 2 : The total fully overlapping pairs for the input "${input}" is equal to _${partTwo(
                input
            )}_`
        )
    );
};

logResults(["exemple", "puzzle"]);

console.timeEnd("\nExecution Time");
