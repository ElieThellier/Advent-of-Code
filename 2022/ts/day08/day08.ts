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
    nTop: number;
    nBot: number;
    nLeft: number;
    nRight: number;
    neighbors: number;
};

const toTree = (x: string) => {
    const res: Tree = {
        height: parseInt(x),
        isVisibleRow: false,
        isVisibleCol: false,
        nTop: 0,
        nBot: 0,
        nLeft: 0,
        nRight: 0,
        neighbors: 0,
    };
    return res;
};

const changeTreeVisibleState = (line: Tree[], row: boolean) => {
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

const changeNeighbors = (line: Tree[], row: boolean) => {
    let stop = false;
    line.forEach((tree, index) => {
        if (index != 0) {
            let slicedLine = line.slice(0, index).reverse();
            if (row) {
                for (let i = 0; i < slicedLine.length; i++) {
                    if (!stop) {
                        tree.nLeft++;
                        if (slicedLine[i].height >= tree.height) {
                            stop = true;
                        }
                    }
                }
                stop = false;
            } else {
                for (let i = 0; i < slicedLine.length; i++) {
                    if (!stop) {
                        tree.nTop++;
                        if (slicedLine[i].height >= tree.height) {
                            stop = true;
                        }
                    }
                }
                stop = false;
            }
        }
    });
    line.reverse().forEach((tree, index) => {
        if (index != 0) {
            let slicedLine = line.slice(0, index).reverse();
            if (row) {
                for (let i = 0; i < slicedLine.length; i++) {
                    if (!stop) {
                        tree.nRight++;
                        if (slicedLine[i].height >= tree.height) {
                            stop = true;
                        }
                    }
                }
                stop = false;
            } else {
                for (let i = 0; i < slicedLine.length; i++) {
                    if (!stop) {
                        tree.nBot++;
                        if (slicedLine[i].height >= tree.height) {
                            stop = true;
                        }
                    }
                }
                stop = false;
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

    // change visibles status of trees for rows than for cols (I transpose the grid than use the algo for rows for cols)
    for (let i = 1; i < len - 1; i++) {
        grid[i] = changeTreeVisibleState(grid[i], true);
        grid[i] = changeNeighbors(grid[i], true);
    }
    // transpose the grid
    grid = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
    for (let i = 1; i < len - 1; i++) {
        grid[i] = changeTreeVisibleState(grid[i], false);
        grid[i] = changeNeighbors(grid[i], false);
    }

    // all the trees on the sides are visible (perimeter)
    let visibleTree = len * 2 + (len - 2) * 2;
    // if a tree on the inside is visible by row OR by col than it is visible
    for (let i = 1; i < len - 1; i++) {
        for (let j = 1; j < len - 1; j++) {
            (grid[i][j].isVisibleCol || grid[i][j].isVisibleRow) &&
                visibleTree++;
        }
    }

    let maxNeighbors = 0;
    for (let i = 1; i < len - 1; i++) {
        for (let j = 1; j < len - 1; j++) {
            grid[i][j].neighbors =
                grid[i][j].nTop *
                grid[i][j].nLeft *
                grid[i][j].nRight *
                grid[i][j].nBot;
            if (grid[i][j].neighbors > maxNeighbors) {
                maxNeighbors = grid[i][j].neighbors;
            }
        }
    }
    console.log(maxNeighbors);
    return visibleTree;
};

["exemple", "puzzle"].forEach((input) =>
    console.log(`PART 1 : input "${input}" visible trees = _${partOne(input)}_`)
);
