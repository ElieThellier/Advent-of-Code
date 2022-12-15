import * as fs from "fs";

console.time("\nExecution Time");

const parser = (input: string) =>
    fs.readFileSync(`./day03/inputs/${input}.in`, "utf-8").trim().split("\n");

const itemToPriority = (item: string) => {
    return item.charCodeAt(0) >= 97
        ? item.charCodeAt(0) - 96
        : item.charCodeAt(0) - 96 + 32 + 26;
};

const partOne = (input: string) => {
    let rucksacks: string[] = parser(input);
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

const partTwo = (input: string) => {
    let rucksacks: string[] = parser(input);
    let groups = new Array();
    for (let i = 0; i < rucksacks.length; i += 3) {
        groups.push([
            rucksacks[i].split(""),
            rucksacks[i + 1].split(""),
            rucksacks[i + 2].split(""),
        ]);
    }
    // find the badge = the item that is in the 3 rucksacks of each group
    let sameItemByGroup: string[][] = groups.map(
        (group) =>
            group[0].filter(
                (item: string) =>
                    group[1].includes(item) && group[2].includes(item)
            )[0]
    );
    let totalPriority: number = sameItemByGroup.reduce(
        (prev, curr) => prev + itemToPriority(curr[0]),
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
    inputs.forEach((input) =>
        console.log(
            `PART 2 : total priority for the input "${input}" is equal to _${partTwo(
                input
            )}_`
        )
    );
};

console.log('\n--- Day 03: "Rucksack Reorganization" ---\n');

logResults(["example", "puzzle"]);

console.timeEnd("\nExecution Time");
