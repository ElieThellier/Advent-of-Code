import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partOne = (input: string) => {
    const program = fs
        .readFileSync(`./day10/inputs/${input}.in`, "utf-8")
        .split("\n");
    let cycle = [0];
    let X = [1];
    let signalStrenght = 0;
    program.forEach((instruct, index) => {
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
    console.log(signalStrenght);

    let CRT = [];
    for (let y = 0; y < 6; y++) {
        let temp: string[] = [];
        for (let x = 0; x < 40; x++) {
            let i = x + 40 * y;
            if (
                X[i] - 1 === cycle[i] % 40 ||
                X[i] === cycle[i] % 40 ||
                X[i] + 1 === cycle[i] % 40
            ) {
                temp.push("#");
            } else {
                temp.push(".");
            }
        }
        CRT.push(temp.join(""));
    }
    console.log(CRT);
};

partOne("puzzle");
