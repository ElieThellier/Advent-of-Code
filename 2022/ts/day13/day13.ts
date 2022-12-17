import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const checkOrder: any = (left: any[], right: any[]) => {
    let min = Math.min(left.length, right.length);
    for (let i = 0; i < min; i++) {
        if (typeof left[i] === "number" && typeof right[i] === "number") {
            if (left[i] < right[i]) return true;
            if (left[i] > right[i]) return false;
        } else if (typeof left[i] === "number") {
            return checkOrder([left[i]], right[i]);
        } else if (typeof right[i] === "number") {
            return checkOrder(left[i], [right[i]]);
        } else {
            if (checkOrder(left[i], right[i]) !== "pb") {
                return checkOrder(left[i], right[i]);
            } else {
                if (i < min - 1) return checkOrder(left[i + 1], right[i + 1]);
            }
        }
    }
    if (left.length < right.length) return true;
    if (left.length > right.length) return false;
    return "pb";
};

const partOne = (input: string) => {
    const pairs: string[] = fs
        .readFileSync(`./day13/inputs/${input}.in`, "utf-8")
        .split("\n\n");
    let result = 0;
    pairs.forEach((pair, index) => {
        let left = JSON.parse(pair.split("\n")[0]);
        let right = JSON.parse(pair.split("\n")[1]);
        let goodOrder: boolean = checkOrder(left, right);
        goodOrder && (result += index + 1);
    });
    return result;
};

// PART 1: 5778 : too high
// PART 1: 5536 : too low

const partTwo = (input: string) => {
    const arrays = fs
        .readFileSync(`./day13/inputs/${input}.in`, "utf-8")
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => JSON.parse(line));
    arrays.push([[2]], [[6]]);
    arrays.sort((a, b) => (checkOrder(a, b) ? -1 : !checkOrder(a, b) ? 1 : 0));
    let index2 = 0,
        index6 = 0;
    arrays.forEach((elt, i) => {
        if (Array.isArray(elt) && elt.length === 1) {
            if (Array.isArray(elt[0]) && elt[0].length === 1) {
                if (elt[0][0] === 2) {
                    index2 = i + 1;
                }
                if (elt[0][0] === 6) {
                    index6 = i + 1;
                }
            }
        }
    });
    return index2 * index6;
};

// PART 2: 25956 : too high

console.log('\n--- Day 13: "Distress Signal" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : The sum of the indices of the pairs that are in the right order is _${partOne(
            input
        )}_ (executed in ${timer(partOne, input)})`
    );
});
console.log("");

["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : The decoder key for the distress signal is _${partTwo(
            input
        )}_ (executed in ${timer(partTwo, input)})`
    );
});
console.log("");
