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

// move elt with index from to index to (modulo list length)
// keep in mind that the list is circular
const moveEltInList = (list: number[], from: number, to: number) => {
    const elt = list[from];
    list.splice(from, 1);
    list.splice(to % list.length, 0, elt);
};

const partsOneAndTwo = (input: string, part: number) => {
    let baseFile = fs
        .readFileSync(`./day20/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((x) => parseInt(x)); // we keep track of the original file
    if (part === 2) baseFile = baseFile.map((x) => x * 811589153); // 811589153 is the encryption key
    const baseIndex = baseFile.map((x, i) => i); // we keep track of the index of the original file
    let file = [...baseFile]; // the copy of the file that is going to be modified
    let fileIndex = [...baseIndex]; // keep track of modifications on indexes of the file
    let nIterations = 1; // number of iterations initially set to 1
    if (part === 2) nIterations = 10; // 10 iterations for part 2
    //console.log(file.join(", "));
    for (let n = 1; n <= nIterations; n++) {
        // go through the indexes of the original file and execute mixing
        for (let index of baseIndex) {
            let currI = fileIndex.indexOf(index); // find the index of the current element in the modified file (there are duplicated elements in the file)
            // je peux refactoriser file et fileIndex en un seul objet
            moveEltInList(fileIndex, currI, currI + file[currI]); // on déplace l'index
            moveEltInList(file, currI, currI + file[currI]); // on déplace l'élément
        }
        //console.log("iteration done", n);
        //console.log(file.join(", "));
    }
    // get the nth elt after the 0
    const getNthEltAfter0 = (n: number) =>
        file[(file.indexOf(0) + (n % file.length)) % file.length];
    /* console.log(getNthEltAfter0(1000), getNthEltAfter0(2000), getNthEltAfter0(3000)); */
    return (
        getNthEltAfter0(1000) + getNthEltAfter0(2000) + getNthEltAfter0(3000)
    );
};

// part1: -7629 not good
// part1: 6950 too low
// part1: 18885 too high

// part2: 702836206498 too low

console.log('\n--- Day 20: "Grove Positioning System" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 2 "${input}":`,
        `${partsOneAndTwo(input, 1)}`,
        `is the sum of the three numbers that form the grove coordinates (with only one mix of the encrypted file)`,
        `(executed in ${timer(partsOneAndTwo, input, 1)})`
    );
});
console.log("");
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 2 "${input}":`,
        `${partsOneAndTwo(input, 2)}`,
        `is the sum of the three numbers that form the grove coordinates (decryption key applied and with ten mix of the encrypted file)`,
        `(executed in ${timer(partsOneAndTwo, input, 2)})`
    );
});
console.log("");
