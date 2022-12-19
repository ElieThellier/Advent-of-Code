import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partsOneAndTwo = (input: string, part: number) => {
    let parsed = fs
        .readFileSync(`./day16/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) =>
            line
                .replace("Valve ", "")
                .replace(" has flow rate=", "_")
                .replace("; tunnels lead to valves ", "_")
                .replace("; tunnel leads to valve ", "_")
                .split("_")
                .map((elt, i) => {
                    if (i == 1) {
                        return parseInt(elt);
                    } else if (i == 2) {
                        return elt.split(", ");
                    }
                    return elt;
                })
        );
    let graph = new Map();
    parsed.forEach((elt: any) => {
        graph.set(elt[0], {
            ID: elt[0],
            state: false,
            flow: elt[1],
            tunnels: elt[2],
        }); // state: false = closed, true = opened
    });

    const baseGraph = new Map(JSON.parse(JSON.stringify(Array.from(graph))));
    let randomResult = [];
    let currentV = graph.get("AA");
    let currentV2 = graph.get("AA");
    let timer = 1;
    let total = 0;
    let maxtimer = 0;
    if (part === 1) maxtimer = 30;
    else if (part === 2) maxtimer = 26;
    let nIterations = 3_000_000;
    for (let j = 0; j < nIterations; j++) {
        timer = 1;
        total = 0;
        graph = new Map(JSON.parse(JSON.stringify(Array.from(baseGraph))));
        currentV = graph.get("AA");
        currentV2 = graph.get("AA");
        while (timer < maxtimer) {
            if (currentV.state || currentV.flow === 0) {
                let i = Math.floor(Math.random() * currentV.tunnels.length);
                currentV = graph.get(currentV.tunnels[i]);
            } else if (Math.random() < 0.75) {
                currentV.state = true;
            }

            // for part 2
            if (currentV2.state || currentV2.flow === 0) {
                let i = Math.floor(Math.random() * currentV2.tunnels.length);
                currentV2 = graph.get(currentV2.tunnels[i]);
            } else if (Math.random() < 0.75) {
                currentV2.state = true;
            }

            graph.forEach((valve) => {
                if (valve.state) {
                    total += valve.flow;
                }
            });
            timer++;
        }
        //console.log(total);
        if (randomResult.length === 100000) {
            let temp = Math.max(...randomResult);
            randomResult = [];
            randomResult.push(temp);
        }
        randomResult.push(total);
    }
    //console.log(randomResult);
    console.log(Math.max(...randomResult));
};

// part1: 1605 too low (got it with 20_000_000 iterations)
// part1: 1610 too low (just a random guess)
// part1: 1630 not good
// part1: 1648 too high

// part1: 1647 good answer

// part2: 1755 too low (got it)
// part2: 1770 too low (guessed it)
// part2: 1785 too low (got it)
// part2: 1800 too low (guessed it)
// part2: 1830 too low (guessed it)

console.log('\n--- Day 16: "Proboscidea Volcanium" ---\n');

partsOneAndTwo("puzzle", 2);
