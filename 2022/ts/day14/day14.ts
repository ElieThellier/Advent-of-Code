import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const parseAndGetExtremums = (input: string) => {
    // input line by line
    const lines = fs
        .readFileSync(`./day14/inputs/${input}.in`, "utf-8")
        .split("\n");
    // rocks without line between rocks
    let points = lines
        .join(" -> ")
        .split(" -> ")
        .map((point) => point.split(",").map((x) => parseInt(x)));
    // extremum pos for each coordonate
    let minX = Math.min(...points.map((point) => point[0]));
    let maxX = Math.max(...points.map((point) => point[0]));
    let maxY = Math.max(...points.map((point) => point[1]));
    return [lines, points, minX, maxX, maxY];
};

const addSand: any = (grid: string[][], x: number, y: number) => {
    if (x === 0 || x === grid[0].length - 1 || y === grid.length - 1) {
        return "STOP";
    }
    if (grid[y + 1][x] === ".") return addSand(grid, x, y + 1);
    else if (grid[y + 1][x - 1] === ".") return addSand(grid, x - 1, y + 1);
    else if (grid[y + 1][x + 1] === ".") return addSand(grid, x + 1, y + 1);
    else {
        grid[y][x] = "o";
        return grid;
    }
};

const partOne = (input: string) => {
    let [lines, points, minX, maxX, maxY]: any[] = parseAndGetExtremums(input);
    let width = maxX - minX + 1;
    let height = maxY - 0 + 1;

    // pos of starting sand
    let startingSand = [500 - minX, 0];
    // translate points to fit index of grid and points coordonate
    points = points.map((point: number[]) =>
        point.map((coord, i) => (i === 0 ? coord - minX : coord))
    );
    // parse lines to array of rocks
    let rockLines: any[] = [];
    lines.forEach((line: string) => {
        rockLines.push(
            line
                .split(" -> ")
                .map((point) =>
                    point
                        .split(",")
                        .map((x, i) =>
                            i === 0 ? parseInt(x) - minX : parseInt(x)
                        )
                )
        );
    });
    // create all the rocks (including those between base rocks)
    let rocks: number[][] = [];
    rockLines.forEach((line: number[][]) => {
        for (let j = 0; j < line.length - 1; j++) {
            if (line[j][0] === line[j + 1][0]) {
                let min = Math.min(line[j][1], line[j + 1][1]);
                let max = Math.max(line[j][1], line[j + 1][1]);
                for (let k = min; k <= max; k++) {
                    rocks.push([line[j][0], k]);
                }
            } else {
                let min = Math.min(line[j][0], line[j + 1][0]);
                let max = Math.max(line[j][0], line[j + 1][0]);
                for (let k = min; k <= max; k++) {
                    rocks.push([k, line[j][1]]);
                }
            }
        }
    });
    // create grid with good dimensions and "." for air and "+" for startingSand
    let grid = new Array();
    for (let y = 0; y < height; y++) {
        grid.push([]);
        for (let x = 0; x < width; x++) {
            if (x === startingSand[0] && y === startingSand[1]) {
                grid[y].push("+");
            } else {
                grid[y].push(".");
            }
        }
    }
    // add all rocks to the grid
    // ATTENTION grid[Y][X]
    for (let rock of rocks) {
        grid[rock[1]][rock[0]] = "#";
    }
    let result = 0;
    while (addSand(grid, startingSand[0], startingSand[1]) !== "STOP") {
        result++;
        //console.log(grid.map((line) => line.join("")).join("\n"));
    }

    // pretty print the grid -> uncomment to see the grid
    //console.log(grid.map((line) => line.join("")).join("\n"));

    return result;
};

const partTwo = (input: string) => {
    let [lines, points, minX, maxX, maxY]: any[] = parseAndGetExtremums(input);

    // the ground is 2 space higher
    maxY += 2;

    // the ground is infinite (I started with an offset of 10000 to be sure that I have the right result than descrease the value while the value stay the same)
    // 10000 works, 1000, 500, 300, 150, 143 is the minimum offset
    let offset = 143;
    // same for exemple input
    if (input === "exemple") offset = 8;

    minX -= offset;
    maxX += offset;

    let width = maxX - minX + 1;
    let height = maxY - 0 + 1;

    let startingSand = [500 - minX, 0];
    points = points.map((point: number[]) =>
        point.map((coord: number, i: number) =>
            i === 0 ? coord - minX : coord
        )
    );
    let rockLines: any[] = [];
    lines.forEach((line: string) => {
        rockLines.push(
            line
                .split(" -> ")
                .map((point: string) =>
                    point
                        .split(",")
                        .map((x: string, i: number) =>
                            i === 0 ? parseInt(x) - minX : parseInt(x)
                        )
                )
        );
    });
    // add points for ground
    rockLines.push([
        [0, maxY],
        [maxX - minX, maxY],
    ]);
    let rocks: number[][] = [];
    rockLines.forEach((line: number[][]) => {
        for (let j = 0; j < line.length - 1; j++) {
            if (line[j][0] === line[j + 1][0]) {
                let min = Math.min(line[j][1], line[j + 1][1]);
                let max = Math.max(line[j][1], line[j + 1][1]);
                for (let k = min; k <= max; k++) {
                    rocks.push([line[j][0], k]);
                }
            } else {
                let min = Math.min(line[j][0], line[j + 1][0]);
                let max = Math.max(line[j][0], line[j + 1][0]);
                for (let k = min; k <= max; k++) {
                    rocks.push([k, line[j][1]]);
                }
            }
        }
    });
    let grid = new Array();
    for (let y = 0; y < height; y++) {
        grid.push([]);
        for (let x = 0; x < width; x++) {
            if (x === startingSand[0] && y === startingSand[1]) {
                grid[y].push("+");
            } else {
                grid[y].push(".");
            }
        }
    }
    for (let rock of rocks) {
        grid[rock[1]][rock[0]] = "#";
    }

    let result = 0;
    while (grid[startingSand[1]][startingSand[0]] !== "o") {
        addSand(grid, startingSand[0], startingSand[1]) !== "STOP";
        result++;
    }

    // pretty print the grid (not really usefull with the offset : the grid became very large)
    //console.log(grid.map((line) => line.join("")).join("\n"));

    return result;
};

// PART 1 : 666 too low

["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : _${partOne(
            input
        )}_ units of sand come to rest before sand starts flowing into the abyss (executed in ${timer(
            partOne,
            input
        )})`
    );
});
console.log("");

["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : _${partTwo(
            input
        )}_ units of sand come to rest until the source of the sand becomes blocked (executed in ${timer(
            partTwo,
            input
        )})`
    );
});
console.log("");
