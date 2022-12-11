import * as fs from "fs";

const timer = (
    script: (i: string, p1: boolean) => number,
    input: string,
    part1: boolean
) => {
    const start = performance.now();
    script(input, part1);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

type Monkey = {
    items: number[];
    operation: string[];
    test: number;
    true: number;
    false: number;
    inspected: number;
};

const parseToMonkey = (monkey: string) => {
    let result: Monkey = {
        items: [],
        operation: ["", "0"],
        test: 1,
        true: -1,
        false: -1,
        inspected: 0,
    };
    const lines = monkey.split("\n");
    result.items = lines[1]
        .split(":")[1]
        .split(",")
        .map((x) => parseInt(x));
    let op = lines[2].trim().split(":")[1].trim();
    result.operation = [op.split(" ")[3], op.split(" ")[4]];
    result.test = parseInt(lines[3].trim().split(" ")[3]);
    result.true = parseInt(lines[4].trim().split(" ")[5]);
    result.false = parseInt(lines[5].trim().split(" ")[5]);
    result.inspected = 0;
    return result;
};

const partsOneAndTwo = (input: string, part1: boolean) => {
    let toParseMonkeys = fs
        .readFileSync(`./day11/inputs/${input}.in`, "utf-8")
        .split("\n\n");
    const monkeys = toParseMonkeys.map((monkey) => parseToMonkey(monkey)); // Monkey #i is in monkeys[i]
    let worryLevel: number = 0;
    let moduling: number = 1; // the product of every value of the tests of divisibility
    monkeys.forEach((monkey) => (moduling *= monkey.test));
    let nRounds = 20;
    part1 ? (nRounds = 20) : (nRounds = 10000);
    for (let round = 1; round <= nRounds; round++) {
        monkeys.forEach((monkey, id) => {
            let nItems = monkey.items.length;
            for (let i = 0; i < nItems; i++) {
                worryLevel = monkey.items[0];
                monkey.operation[0] === "+"
                    ? monkey.operation[1] !== "old"
                        ? (worryLevel += parseInt(monkey.operation[1]))
                        : (worryLevel += worryLevel)
                    : monkey.operation[1] !== "old"
                    ? (worryLevel *= parseInt(monkey.operation[1]))
                    : (worryLevel *= worryLevel);
                if (part1) {
                    // part1
                    worryLevel = Math.floor(Number(worryLevel) / 3);
                } else if (worryLevel > moduling) {
                    // avoid infinity
                    worryLevel %= moduling;
                }
                monkey.inspected++;
                worryLevel % monkey.test === 0
                    ? monkeys[monkey.true].items.push(worryLevel)
                    : monkeys[monkey.false].items.push(worryLevel);
                monkey.items = monkey.items.slice(1, nItems);
            }
        });
    }
    let inspected: number[] = [];
    monkeys.forEach((monkey) => inspected.push(monkey.inspected));
    return (
        inspected.sort((a, b) => b - a)[0] * inspected.sort((a, b) => b - a)[1]
    );
};

["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : The level of monkey business after "20" rounds is _${partsOneAndTwo(
            input,
            true
        )}_ (executed in ${timer(partsOneAndTwo, input, true)})`
    );
});
console.log("");

["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : The level of monkey business after "10000" rounds is _${partsOneAndTwo(
            input,
            false
        )}_ (executed in ${timer(partsOneAndTwo, input, false)})`
    );
});
console.log("");
