import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partOne = (input: string) => {
    let lines = fs
        .readFileSync(`./day07/inputs/${input}.in`, "utf-8")
        .split("\n");
    let currentPath: string[] = [];
    let directories: any = { "/": 0 };
    for (let line of lines) {
        let splittedLine = line.split(" ");
        if (splittedLine[0] === "$" && splittedLine[1] === "cd") {
            if (splittedLine[2] !== "..") {
                currentPath.push(`${splittedLine[2]}`);
                directories[currentPath.join("")] = 0;
            } else {
                currentPath.pop();
            }
        }
        if (splittedLine[0] !== "$" && splittedLine[0] !== "dir") {
            for (let i = 1; i < currentPath.length + 1; i++) {
                let temp = [];
                for (let j = 0; j < currentPath.length; j++) {
                    temp.push(currentPath[j]);
                }
                directories[temp.splice(0, i).join("")] += parseInt(
                    splittedLine[0]
                );
            }
        }
    }
    let ans1 = 0;
    for (let dir in directories) {
        if (directories[dir] <= 100000) {
            ans1 += directories[dir];
        }
    }
    console.log(ans1);

    const sizeDevice = 70000000;
    let currentUnusedSpace = sizeDevice - directories["/"];
    console.log(currentUnusedSpace);
    const sizeUpdate = 30000000 - currentUnusedSpace;
    console.log(sizeUpdate);
    let possibleDelete = [];
    for (let dir in directories) {
        if (directories[dir] >= sizeUpdate) {
            possibleDelete.push(parseInt(directories[dir]));
        }
    }
    console.log(Math.min(...possibleDelete));
};

partOne("puzzle");

console.log(timer(partOne, "puzzle"));
