import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

type Tree = {
    height: number;
    isVisibleRow: boolean;
    isVisibleCol: boolean;
};

const toTree = (x: string) => {
    const res: Tree = {
        height: parseInt(x),
        isVisibleRow: false,
        isVisibleCol: false,
    };
    return res;
};

const countVisibleTrees = (line: Tree[], row: boolean) => {
    let visibleTree = 0;

    line.forEach((tree, index) => {
        if (index == 0) {
            row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
        } else {
            let slicedLine = line.slice(0, index);
            if (
                slicedLine.filter((tree) => line[index].height > tree.height)
                    .length == index
            ) {
                row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
            }
        }
    });
    line.reverse().forEach((tree, index) => {
        if (index == 0) {
            row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
        } else {
            let slicedLine = line.slice(0, index);
            if (
                slicedLine.filter((tree) => line[index].height > tree.height)
                    .length == index
            ) {
                row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
            }
        }
    });
    return line.reverse();
};

const partOne = (input: string) => {
    let grid = fs
        .readFileSync(`./day08/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split("").map((x) => toTree(x)));
    const len = grid[0].length; // cols and rows have same length
    let visibleTree = len * 2 + (len - 2) * 2;

    for (let i = 1; i < len - 1; i++) {
        grid[i] = countVisibleTrees(grid[i], true);
    }
    // get transposed grid
    grid = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
    for (let i = 1; i < len - 1; i++) {
        grid[i] = countVisibleTrees(grid[i], false);
    }
    for (let i = 1; i < len - 1; i++) {
        for (let j = 1; j < len - 1; j++) {
            (grid[i][j].isVisibleCol || grid[i][j].isVisibleRow) &&
                visibleTree++;
        }
    }
    console.log(visibleTree);
};

partOne("puzzle");
