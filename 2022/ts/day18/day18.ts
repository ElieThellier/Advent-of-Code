import * as fs from "fs";

const timer = (
    script: (i: string, n: number) => number,
    input: string,
    n: number
) => {
    const start = performance.now();
    script(input, n);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

console.log('\n--- Day 18: "Boiling Boulders" ---\n');
