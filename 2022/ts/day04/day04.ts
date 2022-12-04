import * as fs from "fs";

console.time("\nExecution Time");

const parser = (input: string) =>
    fs
        .readFileSync(`./day04/inputs/${input}.in`, "utf-8")
        .trim()
        .split("\n")
        .map((pair) => pair.split(","))
        .map((elf) =>
            elf.flatMap((minmax) => minmax.split("-")).map((x) => parseInt(x))
        );

const partOne = (input: string) => {
    let minsMaxsByPairs: number[][] = parser(input);
    let countFullyOverlapping: number = 0;
    minsMaxsByPairs.forEach((pair) => {
        if (
            (pair[0] <= pair[2] && pair[1] >= pair[3]) ||
            (pair[0] >= pair[2] && pair[1] <= pair[3])
        )
            countFullyOverlapping++;
    });
    return countFullyOverlapping;
};

const partTwo = (input: string) => {
    let minsMaxsByPairs: number[][] = parser(input);
    let countOverlapping: number = 0;
    minsMaxsByPairs.forEach((pair) => {
        if (
            (pair[0] <= pair[3] && pair[1] >= pair[2]) ||
            (pair[2] <= pair[1] && pair[3] >= pair[0])
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
            `PART 2 : The total overlapping pairs for the input "${input}" is equal to _${partTwo(
                input
            )}_`
        )
    );
};

logResults(["exemple", "puzzle"]);

console.timeEnd("\nExecution Time");
