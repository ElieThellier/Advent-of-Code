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
    let pointsCorespondance = lines.map((line) => {
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
        ...pointsCorespondance.map((corespondance) =>
            Math.min(corespondance[0][0], corespondance[1][0])
        )
    );
    let maxX = Math.max(
        ...pointsCorespondance.map((corespondance) =>
            Math.max(corespondance[0][0], corespondance[1][0])
        )
    );
    let minY = Math.min(
        ...pointsCorespondance.map((corespondance) =>
            Math.min(corespondance[0][1], corespondance[1][1])
        )
    );
    let maxY = Math.max(
        ...pointsCorespondance.map((corespondance) =>
            Math.max(corespondance[0][1], corespondance[1][1])
        )
    );
    return [pointsCorespondance, minX, maxX, minY, maxY];
};

const createGrid = (
    pointsCorespondance: any,
    minX: any,
    maxX: any,
    minY: any,
    maxY: any
) => {
    let width = maxX + Math.abs(minX) + 1;
    let height = maxY + Math.abs(minY) + 1;

    pointsCorespondance = pointsCorespondance.map((corespondance: number[][]) =>
        corespondance.map((point: number[], i) => {
            return [point[0] + Math.abs(minX), point[1] + Math.abs(minY)];
        })
    );

    // init grid with dots
    let grid = new Array();
    for (let y = 0; y < height; y++) {
        grid.push([]);
        for (let x = 0; x < width; x++) {
            grid[y].push(".");
        }
    }
    // add sensors and beacons
    // ATTENTION grid[y][x]
    for (let corespondance of pointsCorespondance) {
        grid[corespondance[0][1]][corespondance[0][0]] = "S";
        grid[corespondance[1][1]][corespondance[1][0]] = "B";
    }
    return grid;
};

const partOne = (input: string) => {
    let [pointsCorespondance, minX, maxX, minY, maxY] =
        parseAndGetExtremums(input);
    let grid = createGrid(pointsCorespondance, minX, maxX, minY, maxY);
    console.log(grid.map((line) => line.join("")).join("\n"));
};
partOne("example");

console.log('\n--- Day 15: "Beacon Exclusion Zone" ---\n');
