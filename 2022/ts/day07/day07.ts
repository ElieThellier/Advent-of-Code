import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partsOneAndTwo = (input: string) => {
    let lines = fs
        .readFileSync(`./day07/inputs/${input}.in`, "utf-8")
        .split("\n");
    let currentPath: string[] = [];
    let directories: any = { "/": 0 }; // dictionary with key=path of dir and value=size of dir
    lines.forEach((line) => {
        let splittedLine = line.split(" ");
        // if line is cd (smthg) : initiate dir in dictionary and update currentPath
        if (splittedLine[0] === "$" && splittedLine[1] === "cd") {
            if (splittedLine[2] !== "..") {
                currentPath.push(`${splittedLine[2]}`);
                directories[currentPath.join("")] = 0; // initiate dir in dictionary
            } else {
                currentPath.pop();
            }
        }
        // if line is a file : add the size of the file into current folder and the ones that preceed
        if (splittedLine[0] !== "$" && splittedLine[0] !== "dir") {
            for (let i = 0; i < currentPath.length; i++) {
                directories[currentPath.slice(0, i + 1).join("")] += parseInt(
                    splittedLine[0]
                );
            }
        }
    });
    // for part1
    let sumSizeLittleDirectories = 0;
    // for part2
    const sizeDevice = 70000000;
    let currentUnusedSpace = sizeDevice - directories["/"];
    const sizeUpdate = 30000000 - currentUnusedSpace;
    let possibleDelete = [];
    for (let dir in directories) {
        // for part1
        if (directories[dir] <= 100000) {
            sumSizeLittleDirectories += directories[dir];
        }
        // for part2
        if (directories[dir] >= sizeUpdate) {
            possibleDelete.push(parseInt(directories[dir]));
        }
    }
    console.log(
        `\nPART 1 : The sum of the total sizes of the directories with a size smaller than 1 000 000 for the input "${input}" is equal to _${sumSizeLittleDirectories}_`
    );

    console.log(
        `\nPART 2 : The total size of the directory that free up enough space to run the update for the input "${input}" is equal to _${Math.min(
            ...possibleDelete
        )}_`
    );
};
console.log('\n--- Day 07: "No Space Left On Device" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `\nAlgorithm for both parts was executed in ${timer(
            partsOneAndTwo,
            input
        )} (for the input ${input} and with prints included)\n`
    );
});
