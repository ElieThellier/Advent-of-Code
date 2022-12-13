import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const checkOrder = (left: any[], right: any[], index: number) => {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        if (Number(left[i]) === left[i] && Number(right[i]) === right[i]) {
            if (left[i] < right[i]) {
                return `${index + 1}->GOOD`;
            } else if (left[i] > right[i]) {
                return `${index + 1}->BAD`;
            }
        } else if (Array.isArray(left[i]) && Array.isArray(right[i])) {
            return `${index + 1}->${[left[i], " ", right[i]]}`;
        } else {
            return `${index + 1}->// TO DO`;
        }
    }
};

const partOne = (input: string) => {
    const pairs: string[] = fs
        .readFileSync(`./day13/inputs/${input}.in`, "utf-8")
        .split("\n\n");
    pairs.forEach((pair, index) => {
        let left = JSON.parse(pair.split("\n")[0]);
        let right = JSON.parse(pair.split("\n")[1]);
        console.log(checkOrder(left, right, index));
    });
};

partOne("exemple");
