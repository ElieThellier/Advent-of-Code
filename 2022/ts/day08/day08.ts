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

    // change visibles status of trees for rows than for cols (I transpose the grid than use the algo for rows for cols)
    for (let i = 1; i < len - 1; i++) {
        grid[i] = countVisibleTrees(grid[i], true);
    }
    // transpose the grid
    grid = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
    for (let i = 1; i < len - 1; i++) {
        grid[i] = countVisibleTrees(grid[i], false);
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
    return visibleTree;
};

["exemple", "puzzle"].forEach((input) =>
    console.log(`PART 1 : input "${input}" visible trees = _${partOne(input)}_`)
);
