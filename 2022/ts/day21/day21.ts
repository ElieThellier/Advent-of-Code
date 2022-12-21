import * as fs from "fs";

const timer = (
    script: (i: string, p: number) => number,
    input: string,
    part: number
) => {
    const start = performance.now();
    script(input, part);
    const end = performance.now();
    return `${(end - start).toFixed(2)}ms`;
};

// initialize variables
let me = "humn"; // my name
let root1 = "";
let root2 = "";

const getBaseMap = (monkeys: string[]) => {
    let baseYelled = new Map();
    let baseWaiting = new Map();
    monkeys.forEach((monkey) => {
        if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                monkey[6]
            )
        ) {
            baseYelled.set(
                monkey.split(": ")[0],
                parseInt(monkey.split(": ")[1])
            );
        } else {
            baseWaiting.set(monkey.split(": ")[0], monkey.split(": ")[1]);
        }
    });
    return [baseWaiting, baseYelled];
};

const dichotomy: any = (
    monkeys: string[],
    part: number,
    start: number,
    end: number,
    ascending: boolean,
    stateKnown: boolean = false
) => {
    let mid = Math.floor((start + end) / 2);
    let [waiting, yelled] = getBaseMap(monkeys);
    if (part === 2) {
        let root = waiting.get("root");
        waiting.delete("root");
        root1 = root.split(" ")[0];
        root2 = root.split(" ")[2];
        yelled.set(me, mid);
    }
    // resolve all the equations with the current me yelled values
    while (waiting.size > 0) {
        waiting.forEach((value, key) => {
            let splitted = value.split(" ");
            if (yelled.has(splitted[0]) && yelled.has(splitted[2])) {
                let v1: any = yelled.get(splitted[0]),
                    v2: any = yelled.get(splitted[2]);
                if (splitted[1] === "+") yelled.set(key, v1 + v2);
                else if (splitted[1] === "-") yelled.set(key, v1 - v2);
                else if (splitted[1] === "*") yelled.set(key, v1 * v2);
                else if (splitted[1] === "/") yelled.set(key, v1 / v2);
                else {
                    console.log("error");
                    return;
                }
                waiting.delete(key);
            }
        });
    }
    // determine if we the dichotomy is ascending or descending
    if (!stateKnown) {
        if (yelled.get(root1) - yelled.get(root2) < 0) ascending = false;
        else ascending = true; // if it is equal, it doesn't matter
        stateKnown = true;
    }
    //console.log(mid, yelled.get(root1) - yelled.get(root2));
    if (part === 1) return yelled.get("root");
    if (part === 2)
        if (yelled.get(root1) - yelled.get(root2) === 0) return mid;
        else if (yelled.get(root1) - yelled.get(root2) > 0)
            return ascending
                ? dichotomy(monkeys, part, start, mid, true, stateKnown)
                : dichotomy(monkeys, part, mid, end, false, stateKnown);
        else
            return ascending
                ? dichotomy(monkeys, part, mid, end, true, stateKnown)
                : dichotomy(monkeys, part, start, mid, false, stateKnown);
    return "pb";
};

const partsOneAndTwo = (input: string, part: number) => {
    // read file just once
    let monkeys = fs
        .readFileSync(`./day21/inputs/${input}.in`, "utf-8")
        .split("\n");
    return dichotomy(monkeys, part, 0, Math.pow(10, 20)); // 10e20 should be large enough for every input
};

// FOR PART 2
// Actually I did search with manual dichotomy
// was checking root1 - root2 and ajusting the interval of i accordingly :
// I changed i to match the change of root1 - root2
// if it converge to 0, it is good

console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 21: "Monkey Math" --- ',
    "\n"
);
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 1 "${input}":`,
        `${partsOneAndTwo(input, 1)}`,
        `is the number that the monkey named "root" will yell`,
        `(executed in ${timer(partsOneAndTwo, input, 1)})`
    );
});
console.log("");
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 2 "${input}":`,
        `${partsOneAndTwo(input, 2)}`,
        `is the number that I yell to pass root's equality test`,
        `(executed in ${timer(partsOneAndTwo, input, 2)})`
    );
});
console.log("");
