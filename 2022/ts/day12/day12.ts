import * as fs from "fs";

const timer = (
    script: (i: string, p1: boolean) => number,
    input: string,
    part1: boolean
) => {
    const start = performance.now();
    script(input, part1);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

type Cell = {
    height: number; // CharAt('a')
    visited: boolean;
    isCurrentPos: boolean; // CharAt('S')
    isBestSignal: boolean; // CharAt('E')
    posX: number;
    posY: number;
};

const initiateCell = (myCell: string, x: number, y: number) => {
    const resCell: Cell = {
        height:
            myCell === "S"
                ? "a".charCodeAt(0) - "a".charCodeAt(0) + 1
                : myCell === "E"
                ? "z".charCodeAt(0) - "a".charCodeAt(0) + 1
                : myCell.charCodeAt(0) - "a".charCodeAt(0) + 1,
        visited: myCell === "S" ? true : false,
        isCurrentPos: myCell === "S" ? true : false,
        isBestSignal: myCell === "E" ? true : false,
        posX: x,
        posY: y,
    };
    return resCell;
};

const partOne = (input: string) => {
    let currentCell: Cell = initiateCell("a", 0, 0);
    const grid: Cell[][] = fs
        .readFileSync(`./day12/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line, y) =>
            line.split("").map((cell, x) => {
                cell === "S" && (currentCell = initiateCell(cell, x, y));
                return initiateCell(cell, x, y);
            })
        );

    const width = grid[0].length;
    const height = grid.length;

    let instruc: number;

    while (!currentCell.isBestSignal) {
        instruc = Math.round(3 * Math.random());
        // 0 for up, 1 for right, 2 for bot, 3 for left
        switch (instruc) {
            case 0:
                if (currentCell.isBestSignal) {
                    return [currentCell.posX, currentCell.posY];
                }
                if (currentCell.posY == 0) break;
                else if (
                    grid[currentCell.posX][currentCell.posY - 1].height ===
                        currentCell.height + 1 ||
                    grid[currentCell.posX][currentCell.posY - 1].height ===
                        currentCell.height
                ) {
                    currentCell = grid[currentCell.posX][currentCell.posY - 1];
                    currentCell.visited = true;
                    console.log(currentCell.posX, currentCell.posY);
                } else break;

            case 1:
                if (currentCell.isBestSignal) {
                    return [currentCell.posX, currentCell.posY];
                }
                if (currentCell.posX == width - 1) break;
                else if (
                    grid[currentCell.posX + 1][currentCell.posY].height ===
                        currentCell.height + 1 ||
                    grid[currentCell.posX + 1][currentCell.posY].height ===
                        currentCell.height
                ) {
                    currentCell = grid[currentCell.posX + 1][currentCell.posY];
                    currentCell.visited = true;
                    console.log(currentCell.posX, currentCell.posY);
                } else break;
            case 2:
                if (currentCell.isBestSignal) {
                    return [currentCell.posX, currentCell.posY];
                }
                if (currentCell.posY == height - 1) break;
                else if (
                    grid[currentCell.posX][currentCell.posY + 1].height ===
                        currentCell.height + 1 ||
                    grid[currentCell.posX][currentCell.posY + 1].height ===
                        currentCell.height
                ) {
                    currentCell = grid[currentCell.posX][currentCell.posY + 1];
                    currentCell.visited = true;
                    console.log(currentCell.posX, currentCell.posY);
                } else break;
            case 3:
                if (currentCell.isBestSignal) {
                    return [currentCell.posX, currentCell.posY];
                }
                if (currentCell.posX == 0) break;
                else if (
                    grid[currentCell.posX - 1][currentCell.posY].height ===
                        currentCell.height + 1 ||
                    grid[currentCell.posX - 1][currentCell.posY].height ===
                        currentCell.height
                ) {
                    currentCell = grid[currentCell.posX - 1][currentCell.posY];
                    currentCell.visited = true;
                    console.log(currentCell.posX, currentCell.posY);
                } else break;
            default:
                break;
        }
    }
};

partOne("exemple");
