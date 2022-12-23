import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)}ms`;
};

const parser = (input: string, part: number) => {
    let grove: any = fs
        .readFileSync(`./day23/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((l) => l.split(""));
    let offset = 60; // 60 is enough for my puzzle input, I hope it is for everyone else's (50 was not enough)
    if (part === 1) offset = 5; // 5 is suffisant for my puzzle input, you might need to increase it for yours
    if (input === "example1") offset = 1;
    if (input === "example2") offset = 5;
    let grid: any = new Array(grove.length + 2 * offset)
        .fill(" ")
        .map(() => new Array(grove[0].length + 2 * offset).fill("."));
    // fill the grid
    for (let y = 0; y < grove.length; y++) {
        for (let x = 0; x < grove[0].length; x++) {
            if (grove[y][x] === "#") {
                grid[y + offset][x + offset] = "#";
            } else grid[y + offset][x + offset] = ".";
        }
    }
    let positions = new Map();
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === "#") {
                {
                    positions.set(JSON.stringify([y, x]), false); // false = position NON libre !!! = occupée !
                }
            } else positions.set(JSON.stringify([y, x]), true); // true = position libre !!!
        }
    }
    /* console.log(grid.map((l: any) => l.join("")).join("\n"), "\n"); 
    console.log(positions.size) */
    return [positions, offset, grid.length, grid[0].length];
};

const round = (
    positions: Map<string, boolean>,
    direction: number,
    height: number,
    width: number,
    stop: boolean
) => {
    let desiredPos = new Map();
    // first half of the round
    for (let pos of positions.keys()) {
        let tempDir = direction;
        if (!positions.get(pos)) {
            let [y, x] = JSON.parse(pos);
            if (y === 0 || x === 0 || y === height - 1 || x === width - 1)
                continue;
            console.assert(
                y > 0 || x > 0 || y < height - 1 || x < width - 1,
                "out of bounds, need to enlarge offset"
            );
            let neighbors = [
                [y - 1, x],
                [y + 1, x],
                [y - 1, x - 1],
                [y - 1, x + 1],
                [y, x - 1],
                [y, x + 1],
                [y + 1, x - 1],
                [y + 1, x + 1],
            ];
            let noElfAround = true;
            for (let neighbor of neighbors) {
                if (positions.get(JSON.stringify(neighbor))) continue;
                else {
                    noElfAround = false;
                    break;
                }
            }
            if (noElfAround) continue; // do nothing if no elf around
            let attempts = 1;
            while (attempts < 5) {
                attempts++;
                switch (tempDir) {
                    case 0: // north
                        if (
                            positions.get(JSON.stringify([y - 1, x])) &&
                            positions.get(JSON.stringify([y - 1, x - 1])) &&
                            positions.get(JSON.stringify([y - 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y - 1, x]));
                            continue;
                        } else {
                            tempDir = 1;
                        } // else, propose moving down
                    case 1: // south
                        if (
                            positions.get(JSON.stringify([y + 1, x])) &&
                            positions.get(JSON.stringify([y + 1, x - 1])) &&
                            positions.get(JSON.stringify([y + 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y + 1, x]));
                            continue;
                        } else {
                            tempDir = 2;
                        } // else, propose moving left
                    case 2: // west
                        if (
                            positions.get(JSON.stringify([y, x - 1])) &&
                            positions.get(JSON.stringify([y - 1, x - 1])) &&
                            positions.get(JSON.stringify([y + 1, x - 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y, x - 1]));
                            continue;
                        } else {
                            tempDir = 3;
                        } // else, propose moving right
                    case 3: // east
                        if (
                            positions.get(JSON.stringify([y, x + 1])) &&
                            positions.get(JSON.stringify([y - 1, x + 1])) &&
                            positions.get(JSON.stringify([y + 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y, x + 1]));
                            continue;
                        } else {
                            tempDir = 0;
                        } // else, propose moving up
                }
                // if we tried all directions (4 attempts), do nothing
            }
        }
    }
    // second half of the round
    // remove duplicates, so that we don't move them
    for (let [pos, desired] of desiredPos.entries()) {
        for (let [pos2, desired2] of desiredPos.entries()) {
            if (desired === desired2 && pos !== pos2) {
                desiredPos.delete(pos);
                desiredPos.delete(pos2);
            }
        }
    }
    // move the elves
    for (let [pos, desired] of desiredPos.entries()) {
        positions.set(pos, true);
        positions.set(desired, false);
    }
    if (desiredPos.size === 0) stop = true;
    return [positions, stop];
};

const partOne = (input: string) => {
    let [positions, offset, height, width] = parser(input, 1);
    let direction = 0; // direction 0 is north, 1 is south, 2 is west, 3 is east
    let stop: any = false; // only for part 2
    let nRound = 10; // number of rounds
    for (let i = 0; i < nRound; i++) {
        [positions, stop] = round(positions, direction, height, width, stop);
        direction = (i + 1) % 4; // direction 0 is north, 1 is south, 2 is west, 3 is east
    }
    // find minimal region
    let [minX, maxX, minY, maxY] = [2 * offset, offset, 2 * offset, offset]; // to be sure it is not always minimal
    for (let pos of positions.keys()) {
        let [y, x] = JSON.parse(pos);
        if (!positions.get(pos)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
    // count non occupied positions
    let result = 0;
    for (let pos of positions.keys()) {
        let [y, x] = JSON.parse(pos);
        // check if the position is in the minimal region
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            if (positions.get(pos)) result++;
        }
    }
    return result;
};

const partTwo = (input: string) => {
    let [positions, _, height, width] = parser(input, 2);
    let direction = 0; // direction 0 is north, 1 is south, 2 is west, 3 is east
    let stop: any = false;
    let nRound = 0; // count number of rounds
    while (true) {
        [positions, stop] = round(positions, direction, height, width, stop);
        direction = (nRound + 1) % 4;
        nRound++;
        if (stop) break;
    }
    return nRound;
};

// part2 : 1070 too high (offset was too small)

console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 23: "Unstable Diffusion" --- ',
    "\n"
);
["example1", "example2", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 1 "${input}":`,
        `${partOne(input)}`,
        `is the number of empty ground tiles contained in the smallest rectangle`,
        `(executed in ${timer(partOne, input)})`
    );
});
console.log("");
["example1", "example2", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 2 "${input}":`,
        `${partTwo(input)}`,
        `is the number of the first round where no Elf moves`,
        `(executed in ${timer(partTwo, input)})`
    );
});
console.log("");
