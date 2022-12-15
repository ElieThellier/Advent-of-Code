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
        .readFileSync(`./day15/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(" "));
    // rocks without line between rocks
    let pointsCorrespondance = lines.map((line) => {
        return [
            [
                parseInt(line[2].split("=")[1].slice(0, -1)),
                parseInt(line[3].split("=")[1].slice(0, -1)),
            ],
            [
                parseInt(line[8].split("=")[1].slice(0, -1)),
                parseInt(line[9].split("=")[1]),
            ],
        ];
    });
    // extremum pos for each coordonate
    let minX = Math.min(
        ...pointsCorrespondance.map((correspondance) =>
            Math.min(correspondance[0][0], correspondance[1][0])
        )
    );
    let maxX = Math.max(
        ...pointsCorrespondance.map((correspondance) =>
            Math.max(correspondance[0][0], correspondance[1][0])
        )
    );
    let minY = Math.min(
        ...pointsCorrespondance.map((correspondance) =>
            Math.min(correspondance[0][1], correspondance[1][1])
        )
    );
    let maxY = Math.max(
        ...pointsCorrespondance.map((correspondance) =>
            Math.max(correspondance[0][1], correspondance[1][1])
        )
    );

    let offset = 100_000;

    if (input === "example") {
        offset = 1;
    }

    minX -= offset;
    maxX += offset;

    // translate all points to positive
    pointsCorrespondance = pointsCorrespondance.map(
        (correspondance: number[][]) =>
            correspondance.map((point: number[]) => {
                return [point[0] + Math.abs(minX), point[1] + Math.abs(minY)];
            })
    );

    return [pointsCorrespondance, minX, maxX, minY, maxY];
};

const createGrid = (minX: any, maxX: any, minY: any, maxY: any) => {
    let width = maxX + Math.abs(minX) + 1;
    let height = maxY + Math.abs(minY) + 1;

    // init grid with dots
    let grid = new Array();
    for (let y = 0; y < height; y++) {
        grid.push([]);
        for (let x = 0; x < width; x++) {
            grid[y].push(".");
        }
    }
    return [grid, width, height];
};

const dist = (p1: number[], p2: number[]) => {
    return Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0]);
};

const partOne = (input: string) => {
    let [pointsCorrespondance, minX, maxX, minY, maxY]: any[] =
        parseAndGetExtremums(input);
    let [grid, width, height]: any[] = createGrid(minX, maxX, minY, maxY);
    let distSB: number[] = [];
    pointsCorrespondance.forEach((correspondance: number[][]) => {
        distSB.push(dist(correspondance[0], correspondance[1]));
    });

    let row = 2_000_000 + Math.abs(minY);

    if (input === "example") {
        row = 10 + Math.abs(minY);
    }

    let distToRow: number[] = [];
    pointsCorrespondance.forEach((correspondance: number[][]) => {
        distToRow.push(Math.abs(correspondance[0][1] - row));
    });

    let interestingSensors: number[][][] = [];
    let distSBofInterestingSensors: number[] = [];

    distSB.forEach((d, i) => {
        if (d >= distToRow[i]) {
            interestingSensors.push(pointsCorrespondance[i]);
            distSBofInterestingSensors.push(d);
        }
    });

    // draw range of interesting sensors
    interestingSensors.forEach((sensor: number[][], i) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (dist([x, y], sensor[0]) <= distSBofInterestingSensors[i]) {
                    grid[y][x] = "#";
                }
            }
        }
    });

    for (let correspondance of pointsCorrespondance) {
        grid[correspondance[0][1]][correspondance[0][0]] = "S";
        grid[correspondance[1][1]][correspondance[1][0]] = "B";
    }

    // pretty print grid (uncomment to see / too big with puzzle input)
    //console.log(grid.map((line: string[]) => line.join("")).join("\n"));

    return grid[row].filter((c: string) => c === "#").length;
};

console.log('\n--- Day 15: "Beacon Exclusion Zone" ---\n');

console.log(partOne("puzzle"));
