import * as fs from "fs";

console.time("\nExecution Time");

const itemToPriority = (item: string) => {
    return item.charCodeAt(0) >= 97
        ? item.charCodeAt(0) - 96
        : item.charCodeAt(0) - 96 + 32 + 26;
};

const partOne = (input: string) => {
    let rucksacks: string[] = fs
        .readFileSync(`./day03/inputs/${input}.in`, "utf-8")
        .trim()
        .split("\n");
    let firstCompartiment: string[][] = rucksacks.map((rucksack) =>
        rucksack.slice(0, Math.floor(rucksack.length / 2)).split("")
    );
    let secondCompartiment: string[][] = rucksacks.map((rucksack) =>
        rucksack
            .slice(Math.floor(rucksack.length / 2), rucksack.length)
            .split("")
    );
    let sameItemByRucksack: string[] = firstCompartiment.map(
        (rucksack, index) =>
            rucksack.filter((item) =>
                secondCompartiment[index].includes(item)
            )[0]
    );
    let totalPriority: number = sameItemByRucksack.reduce(
        (prev, curr) => prev + itemToPriority(curr),
        0
    );

    return totalPriority;
};

const logResults = (inputs: string[]) => {
    inputs.forEach((input) =>
        console.log(
            `PART 1 : total priority for the input "${input}" is equal to _${partOne(
                input
            )}_`
        )
    );
};

logResults(["exemple", "puzzle"]);

console.timeEnd("\nExecution Time");
