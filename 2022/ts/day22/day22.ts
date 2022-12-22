import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)}ms`;
};

const buildMap = (input: string) => {
    let [map, instructions] = fs
        .readFileSync(`./day22/inputs/${input}.in`, "utf-8")
        .split("\n\n");
    const height = map.split("\n").length;
    const width = map
        .split("\n")
        .map((line) => line.length)
        .sort((a, b) => b - a)[0];
    let grid = new Array(height + 2)
        .fill(0)
        .map(() => new Array(width + 2).fill(" "));
    let start: [number, number] = [1, 1];
    let startDetermined = false;
    map.split("\n").forEach((line, y) => {
        line.split("").forEach((char, x) => {
            grid[y + 1][x + 1] = char;
            if (char === "." && !startDetermined) {
                start = [y + 1, x + 1];
                startDetermined = true;
            }
        });
    });
    return [grid, start, instructions];
};

const checkWall = (map: string[][], pos: number[], dir: number) => {
    let [y, x] = pos;
    let isRock = false;
    switch (dir) {
        case 0:
            if (map[y][x + 1] === "#") isRock = true;
            break;
        case 1:
            if (map[y + 1][x] === "#") isRock = true;
            break;
        case 2:
            if (map[y][x - 1] === "#") isRock = true;
            break;
        case 3:
            if (map[y - 1][x] === "#") isRock = true;
            break;
        default:
            console.log("error");
            break;
    }
    return isRock;
};

const move = (
    map: string[][],
    direction: number,
    distance: number,
    currentPos: number[]
) => {
    let [y, x] = currentPos;
    let tempX = 1,
        tempY = 1;
    outerloop: for (let i = 0; i < distance; i++) {
        if (!checkWall(map, [y, x], direction)) {
            tempX = x;
            tempY = y;
            switch (direction) {
                case 0:
                    if (map[y][x + 1] === " ") {
                        while (map[y][x - 1] === "#" || map[y][x - 1] === ".") {
                            x -= 1;
                        }
                        if (map[y][x] === "#") {
                            x = tempX;
                            break outerloop;
                        }
                    } else x += 1;
                    break;
                case 1:
                    if (map[y + 1][x] === " ") {
                        while (map[y - 1][x] === "#" || map[y - 1][x] === ".") {
                            y -= 1;
                        }
                        if (map[y][x] === "#") {
                            y = tempY;
                            break outerloop;
                        }
                    } else y += 1;
                    break;
                case 2:
                    if (map[y][x - 1] === " ") {
                        while (map[y][x + 1] === "#" || map[y][x + 1] === ".") {
                            x += 1;
                        }
                        if (map[y][x] === "#") {
                            x = tempX;
                            break outerloop;
                        }
                    } else x -= 1;
                    break;
                case 3:
                    if (map[y - 1][x] === " ") {
                        while (map[y + 1][x] === "#" || map[y + 1][x] === ".") {
                            y += 1;
                        }
                        if (map[y][x] === "#") {
                            y = tempY;
                            break outerloop;
                        }
                    } else y -= 1;
                    break;
                default:
                    console.log("error");
                    break;
            }
        } else {
            break;
        }
    }
    return [y, x];
};

const partOne = (input: string) => {
    const [map, start, instructions]: any = buildMap(input);
    let [y, x] = start;
    let direction = 0;
    let listInstructions = instructions
        .split("R")
        .map((i: string) => i + "_R")
        .map((i: string) => i.split("L"))
        .flat()
        .map((elt: string) => (elt.includes("_R") ? elt : elt + "_L"))
        .map((elt: string) => elt.split("_"))
        .flat()
        .slice(0, -1);
    for (let instruc of listInstructions) {
        if (instruc === "R") {
            direction = (direction + 1) % 4;
        } else if (instruc === "L") {
            direction = (direction + 3) % 4;
        } else {
            [y, x] = move(map, direction, +instruc, [y, x]);
        }
    }
    // ATTENTION COLONNE = x et LIGNE = y
    return 1000 * y + 4 * x + direction;
};

console.log(`${partOne("example")} in ${timer(partOne, "example")}`);
console.log(`${partOne("puzzle")} in ${timer(partOne, "puzzle")}`);
