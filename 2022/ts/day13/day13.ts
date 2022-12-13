import * as fs from "fs";
import { terminal } from "terminal-kit";

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
            if (left[i] < right[i]) {
                return true;
            } else if (left[i] > right[i]) {
                return false;
            }
        } else if (typeof left[i] === "number") {
            return checkOrder([left[i]], right[i]);
        } else if (typeof right[i] === "number") {
            return checkOrder(left[i], [right[i]]);
        } else {
            if (checkOrder(left[i], right[i]) !== "pb") {
                return checkOrder(left[i], right[i]);
            } else {
                if (i < min - 1) {
                    return checkOrder(left[i + 1], right[i + 1]);
                }
            }
        }
    }
    if (left.length < right.length) {
        return true;
    } else if (left.length > right.length) {
        return false;
    } else {
        return "pb";
    }
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
    console.log(result);
};

// 5778 : too high
// 5536 : too low

partOne("puzzle");
