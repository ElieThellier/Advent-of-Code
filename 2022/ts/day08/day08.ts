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
    neighbors: number; // = scenic score
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

const changeTreeParameters = (line: Tree[], row: boolean) => {
    let stop = false;
    line.forEach((tree, index) => {
        if (index == 0) {
            row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
        } else {
            let slicedLine = line.slice(0, index).reverse();
            if (
                slicedLine.filter((tree) => line[index].height > tree.height)
                    .length == index
            ) {
                row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
            }
            for (let i = 0; i < slicedLine.length; i++) {
                if (!stop) {
                    row ? tree.nLeft++ : tree.nTop++;
                    if (slicedLine[i].height >= tree.height) {
                        stop = true;
                    }
                }
            }
            stop = false;
        }
    });
    line.reverse().forEach((tree, index) => {
        if (index == 0) {
            row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
        } else {
            let slicedLine = line.slice(0, index).reverse();
            if (
                slicedLine.filter((tree) => line[index].height > tree.height)
                    .length == index
            ) {
                row ? (tree.isVisibleRow = true) : (tree.isVisibleCol = true);
            }
            for (let i = 0; i < slicedLine.length; i++) {
                if (!stop) {
                    row ? tree.nRight++ : tree.nBot++;
                    if (slicedLine[i].height >= tree.height) {
                        stop = true;
                    }
                }
            }
            stop = false;
        }
    });
    return line.reverse();
};

const partsOneAndTwo = (input: string) => {
    let grid = fs
        .readFileSync(`./day08/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split("").map((x) => toTree(x)));
    const len = grid[0].length; // cols and rows have same length

    // change visibles status of trees for rows than for cols (I transpose the grid than use the algo for rows for cols)
    for (let i = 1; i < len - 1; i++) {
        grid[i] = changeTreeParameters(grid[i], true);
    }
    // transpose the grid
    grid = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
    for (let i = 1; i < len - 1; i++) {
        grid[i] = changeTreeParameters(grid[i], false);
    }

    // all the trees on the sides are visible (perimeter)
    let visibleTree = len * 2 + (len - 2) * 2;
    // if a tree on the inside is visible by row OR by col than it is visible

    // initiate result part2
    let maxNeighbors = 0;
    for (let i = 1; i < len - 1; i++) {
        for (let j = 1; j < len - 1; j++) {
            (grid[i][j].isVisibleCol || grid[i][j].isVisibleRow) &&
                visibleTree++;
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

    console.log(
        `\nPART 1 : _${visibleTree}_ trees are visible from outside the grid for the input "${input}"`
    );

    console.log(
        `\nPART 2 : The highest scenic score possible for any tree for the input "${input}" is equal to _${maxNeighbors}_`
    );
};

console.log('\n--- Day 08: "Treetop Tree House" ---\n');
["exemple", "puzzle"].forEach((input) => {
    console.log(
        `\nAlgorithm for both parts was executed in ${timer(
            partsOneAndTwo,
            input
        )} (for the input ${input} and with prints included)\n`
    );
});
