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

const partOne = (input: string) => {
    let grove: any = fs
        .readFileSync(`./day23/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((l) => l.split(""));
    let offset = 1000;
    if (input === "example1") offset = 1;
    if (input === "example2") offset = 5;
    let grid: any = new Array(grove.length + 2 * offset)
        .fill(" ")
        .map(() => new Array(grove[0].length + 2 * offset).fill("."));

    for (let y = 0; y < grove.length; y++) {
        for (let x = 0; x < grove[0].length; x++) {
            if (grove[y][x] === "#") {
                grid[y + offset][x + offset] = "#";
            } else grid[y + offset][x + offset] = ".";
        }
    }
    let positions = new Map();
    let directions = new Map(); // 0 = north, 1 = south, 2 = west, 3 = east
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === "#") {
                {
                    positions.set(JSON.stringify([y, x]), false); // false = position NON libre !!! = occupée !
                    directions.set(JSON.stringify([y, x]), 0);
                }
            } else positions.set(JSON.stringify([y, x]), true); // true = position libre !!!
        }
    }
    /* console.log(grid.map((l: any) => l.join("")).join("\n"), "\n");
    console.log(count(grid)); */
    let nRound = 10; // number of rounds
    for (let i = 0; i < nRound; i++) {
        [positions, directions] = round(grid, positions, directions);
        directions.forEach((dir, pos) => {
            directions.set(pos, (i + 1) % 4);
        });
        // print grid
        /* for (let pos of positions.keys()) {
            let [y, x] = JSON.parse(pos);
            if (!positions.get(pos)) grid[y][x] = "#";
            else grid[y][x] = ".";
        }
        console.log(grid.map((l: any) => l.join("")).join("\n"));
        console.log(count(grid)); */
    }
    let minX = offset + 1;
    let maxX = offset + 1;
    let minY = offset + 1;
    let maxY = offset + 1;
    for (let pos of positions.keys()) {
        let [y, x] = JSON.parse(pos);
        if (!positions.get(pos)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
    let result = 0;
    for (let pos of positions.keys()) {
        let [y, x] = JSON.parse(pos);
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            if (positions.get(pos)) result++;
        }
    }
    console.log(result);
};

// to verify that I don't lose (or create) any elves
const count = (grid: string[][]) => {
    let count = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === "#") count++;
        }
    }
    return count;
};

const round = (
    grid: string[][],
    positions: Map<string, boolean>,
    directions: any
) => {
    let desiredPos = new Map();
    let height = grid.length;
    let width = grid[0].length;
    // first half of the round
    for (let pos of positions.keys()) {
        if (!positions.get(pos)) {
            let [y, x] = JSON.parse(pos);
            if (y === 0 || x === 0 || y === height - 1 || x === width - 1)
                continue;
            console.assert(
                y > 0 || x > 0 || y < height - 1 || x < width - 1,
                "out of bounds, need to enlarge offset",
                y,
                x
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
                if (positions.get(JSON.stringify(neighbor))) {
                    continue;
                } else {
                    noElfAround = false;
                    break;
                }
            }
            if (noElfAround) continue; // do nothing if no elf around
            let attempts = 1;
            while (attempts < 5) {
                switch (directions.get(pos)) {
                    case 0: // north
                        if (
                            positions.get(JSON.stringify([y - 1, x])) &&
                            positions.get(JSON.stringify([y - 1, x - 1])) &&
                            positions.get(JSON.stringify([y - 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y - 1, x]));
                            attempts++;
                            continue;
                        } else {
                            attempts++;
                            directions.set(pos, 1);
                        } // else, propose moving down
                    case 1: // south
                        if (
                            positions.get(JSON.stringify([y + 1, x])) &&
                            positions.get(JSON.stringify([y + 1, x - 1])) &&
                            positions.get(JSON.stringify([y + 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y + 1, x]));
                            attempts++;
                            continue;
                        } else {
                            attempts++;
                            directions.set(pos, 2);
                        } // else, propose moving left
                    case 2: // west
                        if (
                            positions.get(JSON.stringify([y, x - 1])) &&
                            positions.get(JSON.stringify([y - 1, x - 1])) &&
                            positions.get(JSON.stringify([y + 1, x - 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y, x - 1]));
                            attempts++;
                            continue;
                        } else {
                            attempts++;
                            directions.set(pos, 3);
                        } // else, propose moving right
                    case 3: // east
                        if (
                            positions.get(JSON.stringify([y, x + 1])) &&
                            positions.get(JSON.stringify([y - 1, x + 1])) &&
                            positions.get(JSON.stringify([y + 1, x + 1]))
                        ) {
                            desiredPos.set(pos, JSON.stringify([y, x + 1]));
                            attempts++;
                            continue;
                        } else {
                            attempts++;
                            directions.set(pos, 0);
                        } // else, propose moving up
                }
                if (attempts === 4) continue;
            }
        }
    }
    // second half of the round
    for (let [pos, desired] of desiredPos.entries()) {
        for (let [pos2, desired2] of desiredPos.entries()) {
            if (desired === desired2 && pos !== pos2) {
                desiredPos.delete(pos);
                desiredPos.delete(pos2);
            }
        }
    }
    for (let [pos, desired] of desiredPos.entries()) {
        positions.set(pos, true);
        positions.set(desired, false);
        directions.set(desired, directions.get(pos));
        directions.delete(pos);
    }
    directions.forEach((dir: any, pos: any) => {
        directions.set(pos, 0);
    });
    return [positions, directions];
};

partOne("puzzle");

/* console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 23: "Unstable Diffusion" --- ',
    "\n"
);
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 1 "${input}":`,
        `${partsOneAndTwo(input, 1)}`,
        `is the final password`,
        `(executed in ${timer(partsOneAndTwo, input, 1)})`
    );
});
console.log("");
["puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 2 "${input}":`,
        `${partsOneAndTwo(input, 2)}`,
        `is the final password (the map is folded into a cube)`,
        `(executed in ${timer(partsOneAndTwo, input, 2)})`
    );
});
console.log("");
 */
