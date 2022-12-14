import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

type Cell = {
    height: string;
    posX: number;
    posY: number;
};

const initiateCell = (myCell: string, x: number, y: number) => {
    const resCell: Cell = {
        height: myCell,
        posX: x,
        posY: y,
    };
    return resCell;
};

const getNeighbors = (cell: Cell, grid: Cell[][]) => {
    let neighbors = new Array();
    let width = grid[0].length - 1;
    let height = grid.length - 1;
    if (cell.posX > 0) {
        if (
            grid[cell.posY][cell.posX - 1].height.charCodeAt(0) <=
            cell.height.charCodeAt(0) + 1
        ) {
            neighbors.push(grid[cell.posY][cell.posX - 1]);
        }
    }
    if (cell.posY > 0) {
        if (
            grid[cell.posY - 1][cell.posX].height.charCodeAt(0) <=
            cell.height.charCodeAt(0) + 1
        ) {
            neighbors.push(grid[cell.posY - 1][cell.posX]);
        }
    }
    if (cell.posX < width) {
        if (
            grid[cell.posY][cell.posX + 1].height.charCodeAt(0) <=
            cell.height.charCodeAt(0) + 1
        ) {
            neighbors.push(grid[cell.posY][cell.posX + 1]);
        }
    }
    if (cell.posY < height) {
        if (
            grid[cell.posY + 1][cell.posX].height.charCodeAt(0) <=
            cell.height.charCodeAt(0) + 1
        ) {
            neighbors.push(grid[cell.posY + 1][cell.posX]);
        }
    }
    return neighbors;
};

const getPath = (
    grid: string[][],
    gridCell: Cell[][],
    startingCell: Cell,
    endingCell: Cell
) => {
    // A* algorithm implementation
    let frontier = [];
    frontier.push(startingCell);
    let came_from = new Map();
    came_from.set(`${[startingCell.posY, startingCell.posX]}`, null);
    let currentCell = startingCell;
    while (!(frontier.length === 0)) {
        currentCell = frontier.shift();
        if (
            grid[currentCell.posY][currentCell.posX] ===
            grid[endingCell.posY][endingCell.posX]
        ) {
            break;
        }
        for (let next of getNeighbors(currentCell, gridCell)) {
            if (!came_from.has(`${[next.posY, next.posX]}`)) {
                frontier.push(next);
                came_from.set(
                    `${[next.posY, next.posX]}`,
                    `${[currentCell.posY, currentCell.posX]}`
                );
            }
        }
    }
    return came_from;
};

const getPathLenght = (
    possibleMove: Map<any, any>,
    startingCell: Cell,
    endingCell: Cell
) => {
    let cell = `${[endingCell.posY, endingCell.posX]}`;
    let path = [];
    while (cell !== `${[startingCell.posY, startingCell.posX]}`) {
        path.push(cell);
        cell = possibleMove.get(cell);
    }
    path.reverse();

    return path;
};

const partOne = (input: string) => {
    let startingCell: Cell = initiateCell("a", 0, 0);
    let endingCell: Cell = initiateCell("a", 0, 0);
    const grid: string[][] = fs
        .readFileSync(`./day12/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(""));
    const gridCell: Cell[][] = grid.map((line, y) =>
        line.map((cell, x) => {
            cell === "S" && (startingCell = initiateCell("a", x, y));
            cell === "E" && (endingCell = initiateCell("z", x, y));
            if (cell === "S") {
                return initiateCell("a", x, y);
            }
            if (cell === "E") {
                return initiateCell("z", x, y);
            }
            return initiateCell(cell, x, y);
        })
    );
    let possibleMove = getPath(grid, gridCell, startingCell, endingCell);
    return getPathLenght(possibleMove, startingCell, endingCell).length;
};

const getNeighbors2 = (cell: Cell, grid: Cell[][]) => {
    let neighbors = new Array();
    let width = grid[0].length - 1;
    let height = grid.length - 1;
    if (cell.posX > 0) {
        if (
            grid[cell.posY][cell.posX - 1].height.charCodeAt(0) + 1 >=
            cell.height.charCodeAt(0)
        ) {
            neighbors.push(grid[cell.posY][cell.posX - 1]);
        }
    }
    if (cell.posY > 0) {
        if (
            grid[cell.posY - 1][cell.posX].height.charCodeAt(0) + 1 >=
            cell.height.charCodeAt(0)
        ) {
            neighbors.push(grid[cell.posY - 1][cell.posX]);
        }
    }
    if (cell.posX < width) {
        if (
            grid[cell.posY][cell.posX + 1].height.charCodeAt(0) + 1 >=
            cell.height.charCodeAt(0)
        ) {
            neighbors.push(grid[cell.posY][cell.posX + 1]);
        }
    }
    if (cell.posY < height) {
        if (
            grid[cell.posY + 1][cell.posX].height.charCodeAt(0) + 1 >=
            cell.height.charCodeAt(0)
        ) {
            neighbors.push(grid[cell.posY + 1][cell.posX]);
        }
    }
    return neighbors;
};

const getPath2 = (
    grid: string[][],
    gridCell: Cell[][],
    startingCell: Cell,
    endingCell: string
) => {
    // A* algorithm implementation
    let frontier = [];
    frontier.push(startingCell);
    let came_from = new Map();
    came_from.set(`${[startingCell.posY, startingCell.posX]}`, null);
    let currentCell = startingCell;
    let findFirstEnd = currentCell;
    while (!(frontier.length === 0)) {
        currentCell = frontier.shift();
        if (grid[currentCell.posY][currentCell.posX] === endingCell) {
            findFirstEnd = currentCell;
            break;
        }
        for (let next of getNeighbors2(currentCell, gridCell)) {
            if (!came_from.has(`${[next.posY, next.posX]}`)) {
                frontier.push(next);
                came_from.set(
                    `${[next.posY, next.posX]}`,
                    `${[currentCell.posY, currentCell.posX]}`
                );
            }
        }
    }
    return [findFirstEnd, came_from];
};

const partTwo = (input: string) => {
    let startingCell: Cell = initiateCell("a", 0, 0);
    let endingCell: Cell = initiateCell("a", 0, 0);
    const grid: string[][] = fs
        .readFileSync(`./day12/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(""));
    const gridCell: Cell[][] = grid.map((line, y) =>
        line.map((cell, x) => {
            cell === "S" && (startingCell = initiateCell("a", x, y));
            cell === "E" && (endingCell = initiateCell("z", x, y));
            if (cell === "S") {
                return initiateCell("a", x, y);
            }
            if (cell === "E") {
                return initiateCell("z", x, y);
            }
            return initiateCell(cell, x, y);
        })
    );
    let getRes: any[] = [];
    for (let elt of getPath2(grid, gridCell, endingCell, "a")) {
        getRes.push(elt);
    }
    let possibleMove = getRes[1];
    let bestStart = getRes[0];

    return getPathLenght(possibleMove, endingCell, bestStart).length;
};
console.log('\n--- Day 12: "Hill Climbing Algorithm" ---\n');
["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : The fewest steps required to move from your current position to the location with the best signal is _${partOne(
            input
        )}_ (executed in ${timer(partOne, input)})`
    );
});
console.log("");

["exemple", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : The fewest steps required to move starting from any square with elevation a to the location with the best signal is _${partTwo(
            input
        )}_ (executed in ${timer(partTwo, input)})`
    );
});
console.log("");
