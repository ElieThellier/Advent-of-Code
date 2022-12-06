import * as fs from "fs";

const timer = (
    script: (n: number, w: string[]) => number,
    n: number,
    w: string[]
) => {
    const start = performance.now();
    script(n, w);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const getNCharsBeforeMarker = (nDistinctChars: number, word: string[]) => {
    for (let index = 0; index < word.length - nDistinctChars; index++) {
        if (
            new Set(word.slice(index, index + nDistinctChars)).size ===
            nDistinctChars
        ) {
            return index + nDistinctChars;
        }
    }
    return -1;
};

["exemple1", "exemple2", "exemple3", "exemple4", "exemple5", "puzzle"].forEach(
    (input) => {
        let word = fs
            .readFileSync(`./day06/inputs/${input}.in`, "utf-8")
            .split("");
        console.log(
            `PART 1 : The number of character before the first start-of-packet marker for the input "${input}" is equal to _${getNCharsBeforeMarker(
                4,
                word
            )}_${
                input === "puzzle"
                    ? ` (executed in ${timer(
                          getNCharsBeforeMarker,
                          4,
                          word
                      )})\n`
                    : ""
            }`
        );
    }
);
["exemple1", "exemple2", "exemple3", "exemple4", "exemple5", "puzzle"].forEach(
    (input) => {
        let word = fs
            .readFileSync(`./day06/inputs/${input}.in`, "utf-8")
            .split("");
        console.log(
            `PART 2 : The number of character before the first start-of-message marker for the input "${input}" is equal to _${getNCharsBeforeMarker(
                14,
                word
            )}_${
                input === "puzzle"
                    ? ` (executed in ${timer(
                          getNCharsBeforeMarker,
                          14,
                          word
                      )})\n`
                    : ""
            }`
        );
    }
);
