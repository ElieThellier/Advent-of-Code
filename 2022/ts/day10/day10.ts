import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partsOneAndTwo = (input: string) => {
    const program = fs
        .readFileSync(`./day10/inputs/${input}.in`, "utf-8")
        .split("\n");
    let cycle = [0];
    let X = [1];
    let signalStrenght = 0;
    program.forEach((instruct) => {
        if (instruct[0] === "a") {
            cycle.push(cycle[cycle.length - 1] + 1);
            X.push(X[X.length - 1]);
            cycle.push(cycle[cycle.length - 1] + 1);
            X.push(X[X.length - 1] + parseInt(instruct.split(" ")[1]));
        } else {
            cycle.push(cycle[cycle.length - 1] + 1);
            X.push(X[X.length - 1]);
        }
    });
    cycle.forEach((n, index) => {
        if ((n + 20) % 40 === 0) {
            signalStrenght += cycle[index] * X[index - 1];
        }
    });
    console.log(
        `PART 1 "${input}" : The signal strenght is equal to _${signalStrenght}_`
    );

    // PART 2
    let CRT = [];
    const height = 6;
    const width = 40;
    for (let y = 0; y < height; y++) {
        let temp: string[] = [];
        for (let x = 0; x < width; x++) {
            let i = x + width * y;
            if (
                X[i] - 1 === cycle[i] % width ||
                X[i] === cycle[i] % width ||
                X[i] + 1 === cycle[i] % width
            ) {
                temp.push("#");
            } else {
                temp.push(".");
            }
        }
        CRT.push(temp.join(""));
    }
    console.log(
        `PART 2 "${input}" : The rendered image given by the program is :`
    );
    console.log(CRT);
};
console.log('\n--- Day 10: "Cathode-Ray Tube" ---\n');
console.log(`\nBoth parts executed in ${timer(partsOneAndTwo, "exemple2")}\n`);
console.log(`\nBoth parts executed in ${timer(partsOneAndTwo, "puzzle")}\n`);
