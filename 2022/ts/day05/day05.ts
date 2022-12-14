import * as fs from "fs";

console.time("\nExecution Time");

const crateMover9000 = (quantity: number, from: string[], to: string[]) => {
    for (let i = 0; i < quantity; i++) {
        if (from.length != 0) {
            let temp = from[from.length - 1] != undefined ? from.pop() : "bug1";
            temp != undefined ? to.push(temp) : "bug2";
        }
    }
};

const crateMover9001 = (quantity: number, from: string[], to: string[]) => {
    let temp = [];
    for (let i = 0; i < quantity; i++) {
        if (from.length != 0) {
            temp.push(from[from.length - 1] != undefined ? from.pop() : "bug1");
        }
    }
    temp.reverse().forEach((elt) => (elt != undefined ? to.push(elt) : "bug2"));
};

const partsOneTwo = (input: string, part: number) => {
    let crates = fs
        .readFileSync(`./day05/inputs/${input}.in`, "utf-8")
        .split("\n\n")[0]
        .split("\n");
    const numberOfStacks = crates
        .reverse()[0]
        .split("")
        .filter((x) => x !== " " && x !== "[" && x !== "]").length;
    crates.reverse();
    crates.pop();
    let stacks1: string[][] = new Array();
    let stacks2: string[][] = new Array();
    for (let j = 0; j < numberOfStacks; j++) {
        stacks1.push([]);
        stacks2.push([]);
    }
    crates.reverse().map((line) => {
        for (let j = 0; j < numberOfStacks; j++) {
            if (line[1 + 4 * j] !== " ") stacks1[j].push(line[1 + 4 * j]);
            if (line[1 + 4 * j] !== " ") stacks2[j].push(line[1 + 4 * j]);
        }
    });

    let procedure = fs
        .readFileSync(`./day05/inputs/${input}.in`, "utf-8")
        .trim()
        .split("\n\n")[1]
        .split("\n");
    let proc = new Array();
    procedure.map((line) => {
        proc.push([
            parseInt(line.split(" ")[1]),
            parseInt(line.split(" ")[3]),
            parseInt(line.split(" ")[5]),
        ]);
    });

    proc.forEach((move) => {
        crateMover9000(move[0], stacks1[move[1] - 1], stacks1[move[2] - 1]);
        crateMover9001(move[0], stacks2[move[1] - 1], stacks2[move[2] - 1]);
    });

    return part === 1
        ? stacks1.map((stack) => stack[stack.length - 1]).join("")
        : stacks2.map((stack) => stack[stack.length - 1]).join("");
};
console.log('\n--- Day 05: "Supply Stacks" ---\n');
["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 (crateMover9000) : The crates ends up on top of each stacks for the input "${input}" are _${partsOneTwo(
            input,
            1
        )}_`
    );
});
["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 (crateMover9001) : The crates ends up on top of each stacks for the input "${input}" are _${partsOneTwo(
            input,
            2
        )}_`
    );
});

console.timeEnd("\nExecution Time");
