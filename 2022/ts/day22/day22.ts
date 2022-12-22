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

const buildMap = (input: string) => {
    let [map, instructions] = fs
        .readFileSync(`./day22/inputs/${input}.in`, "utf-8")
        .split("\n\n");
    const height = map.split("\n").length;
    const width = map
        .split("\n")
        .map((line) => line.length)
        .sort((a, b) => b - a)[0];
    // grid is one cell bigger on each side to avoid out of bounds
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
    let listInstructions = instructions
        .split("R")
        .map((i: string) => i + "_R")
        .map((i: string) => i.split("L"))
        .flat()
        .map((elt: string) => (elt.includes("_R") ? elt : elt + "_L"))
        .map((elt: string) => elt.split("_"))
        .flat()
        .slice(0, -1);
    return [grid, start, listInstructions];
};

const move1 = (
    map: string[][],
    direction: number,
    steps: number,
    currentPos: number[]
) => {
    let [y, x] = currentPos;
    let tempX = 1,
        tempY = 1;
    outerloop: for (let i = 0; i < steps; i++) {
        tempX = x;
        tempY = y;
        /* if (direction === 0) {
            map[y][x] = ">";
        }
        if (direction === 1) {
            map[y][x] = "<";
        }
        if (direction === 2) {
            map[y][x] = "v";
        }
        if (direction === 3) {
            map[y][x] = "^";
        } */
        switch (direction) {
            case 0:
                if (map[y][x + 1] === "#") break outerloop;
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
                if (map[y + 1][x] === "#") break outerloop;
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
                if (map[y][x - 1] === "#") break outerloop;
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
                if (map[y - 1][x] === "#") break outerloop;
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
    }
    return [y, x];
};

const move2 = (
    map: string[][],
    direction: number,
    steps: number,
    currentPos: number[]
) => {
    let [y, x] = currentPos;
    outerloop: for (let i = 0; i < steps; i++) {
        /* if (direction === 0) {
            map[y][x] = ">";
        }
        if (direction === 1) {
            map[y][x] = "<";
        }
        if (direction === 2) {
            map[y][x] = "v";
        }
        if (direction === 3) {
            map[y][x] = "^";
        } */
        switch (direction) {
            case 0:
                if (map[y][x + 1] === "#") break outerloop;
                if (x === 150 && y >= 1 && y <= 50) {
                    if (map[151 - y][100] === "#") break outerloop;
                    direction = 2;
                    x = 100;
                    y = 151 - y;
                } else if (x === 100 && y >= 51 && y <= 100) {
                    if (map[50][50 + y] === "#") break outerloop;
                    direction = 3;
                    x = 50 + y;
                    y = 50;
                } else if (x === 100 && y >= 101 && y <= 150) {
                    if (map[151 - y][150] === "#") break outerloop;
                    direction = 2;
                    x = 150;
                    y = 151 - y;
                } else if (x === 50 && y >= 151 && y <= 200) {
                    if (map[150][y - 100] === "#") break outerloop;
                    direction = 3;
                    x = y - 100;
                    y = 150;
                } else x++;
                break;
            case 1:
                if (map[y + 1][x] === "#") break outerloop;
                if (y === 200 && x >= 1 && x <= 50) {
                    if (map[1][100 + x] === "#") break outerloop;
                    direction = 1;
                    y = 1;
                    x = 100 + x;
                } else if (y === 150 && x >= 51 && x <= 100) {
                    if (map[100 + x][50] === "#") break outerloop;
                    direction = 2;
                    y = 100 + x;
                    x = 50;
                } else if (y === 50 && x >= 101 && x <= 150) {
                    if (map[x - 50][100] === "#") break outerloop;
                    direction = 2;
                    y = x - 50;
                    x = 100;
                } else y++;
                break;
            case 2:
                if (map[y][x - 1] === "#") break outerloop;
                if (x === 51 && y >= 1 && y <= 50) {
                    if (map[151 - y][1] === "#") break outerloop;
                    direction = 0;
                    x = 1;
                    y = 151 - y;
                } else if (x === 51 && y >= 51 && y <= 100) {
                    if (map[101][y - 50] === "#") break outerloop;
                    direction = 1;
                    x = y - 50;
                    y = 101;
                } else if (x === 1 && y >= 101 && y <= 150) {
                    if (map[151 - y][51] === "#") break outerloop;
                    direction = 0;
                    x = 51;
                    y = 151 - y;
                } else if (x === 1 && y >= 151 && y <= 200) {
                    if (map[1][y - 100] === "#") break outerloop;
                    direction = 1;
                    x = y - 100;
                    y = 1;
                } else x--;
                break;
            case 3:
                if (map[y - 1][x] === "#") break outerloop;
                if (y === 101 && x >= 1 && x <= 50) {
                    if (map[50 + x][51] === "#") break outerloop;
                    direction = 0;
                    y = 50 + x;
                    x = 51;
                } else if (y === 1 && x >= 51 && x <= 100) {
                    if (map[100 + x][1] === "#") break outerloop;
                    direction = 0;
                    y = 100 + x;
                    x = 1;
                } else if (y === 1 && x >= 101 && x <= 150) {
                    if (map[200][x - 100] === "#") break outerloop;
                    direction = 3;
                    y = 200;
                    x = x - 100;
                } else y--;
                break;
            default:
                console.log("error");
                break;
        }
        console.assert(
            !(x <= 0 || y <= 0 || x >= 201 || y >= 201),
            "pb",
            direction,
            x,
            y
        );
    }
    return [y, x, direction];
};

const partsOneAndTwo = (input: string, part: number) => {
    let [map, start, instructions]: any = buildMap(input);
    let [y, x] = start;
    let direction = 0;
    for (let instruc of instructions) {
        if (instruc === "R") direction = (direction + 1) % 4;
        else if (instruc === "L") direction = (direction + 3) % 4;
        else {
            if (part === 1) [y, x] = move1(map, direction, +instruc, [y, x]);
            if (part === 2)
                [y, x, direction] = move2(map, direction, +instruc, [y, x]);
        }
    }
    // ATTENTION COLONNE = x et LIGNE = y
    //console.log(map.map((x: any) => x.join("")).join("\n"));
    return 1000 * y + 4 * x + direction;
};

// part2 : 357164 too high (j'avais oublié de bloquer quand on arrive sur #)
// part2: 61360 too low (j'avais oublié de renvoyer la direction après un move)
// part2: 62364 too low (j'ai tenté avec x->x+1 et y->y-1 mais j'avais bien décaler la grille de 1 au départ)

console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 22: "Monkey Map" --- ',
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
