import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partOne = (input: string) => {
    let cubes = fs
        .readFileSync(`./day18/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(",").map((x) => parseInt(x)));
    let surface = 6 * cubes.length;
    for (let i = 0; i < cubes.length; i++) {
        for (let j = 0; j < cubes.length; j++) {
            if (i !== j) {
                if (
                    (cubes[i][0] === cubes[j][0] &&
                        cubes[i][1] == cubes[j][1] &&
                        Math.abs(cubes[i][2] - cubes[j][2]) === 1) ||
                    (cubes[i][0] === cubes[j][0] &&
                        cubes[i][2] === cubes[j][2] &&
                        Math.abs(cubes[i][1] - cubes[j][1]) === 1) ||
                    (cubes[i][1] == cubes[j][1] &&
                        cubes[i][2] === cubes[j][2] &&
                        Math.abs(cubes[i][0] - cubes[j][0]) === 1)
                ) {
                    surface -= 1;
                }
            }
        }
    }
    return surface;
};

const floodFillRec = (
    grid: string[][][],
    x: number,
    y: number,
    z: number,
    oldColor: string,
    newColor: string
) => {
    // Check the boundary condition
    if (
        x < 0 ||
        x >= grid.length ||
        y < 0 ||
        y >= grid[x].length ||
        z < 0 ||
        z >= grid[x][y].length
    )
        return;
    if (grid[x][y][z] !== oldColor) return;

    // set the color of node to newColor
    grid[x][y][z] = newColor;

    // Look for neighboring cell
    floodFillRec(grid, x + 1, y, z, oldColor, newColor);
    floodFillRec(grid, x - 1, y, z, oldColor, newColor);
    floodFillRec(grid, x, y + 1, z, oldColor, newColor);
    floodFillRec(grid, x, y - 1, z, oldColor, newColor);
    floodFillRec(grid, x, y, z + 1, oldColor, newColor);
    floodFillRec(grid, x, y, z - 1, oldColor, newColor);
};

const partTwo = (input: string) => {
    let cubes = fs
        .readFileSync(`./day18/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(",").map((x) => parseInt(x)));
    let maxX = Math.max(...cubes.map((x) => x[0])) + 1;
    let maxY = Math.max(...cubes.map((x) => x[1])) + 1;
    let maxZ = Math.max(...cubes.map((x) => x[2])) + 1;
    let grid: string[][][] = [];
    for (let x = 0; x < maxX + 1; x++) {
        grid.push([]);
        for (let y = 0; y < maxY + 1; y++) {
            grid[x].push([]);
            for (let z = 0; z < maxZ + 1; z++) {
                grid[x][y].push("."); // all air (".")
            }
        }
    }
    cubes.forEach((cube) => {
        grid[cube[0]][cube[1]][cube[2]] = "#"; // add lava ("#")
    });
    // point 0,0,0 is outside the lava droplet so it transforms air "." to water "O"
    floodFillRec(grid, 0, 0, 0, ".", "O"); // convert outside air (".") to water ("O")

    // pretty print grid for debugging
    /* console.log(
        grid.map((x) => x.map((y) => y.join("")).join("\n")).join("\n\n")
    ); */

    let innerSurface = 0;
    for (let x = 1; x < grid.length - 1; x++) {
        for (let y = 1; y < grid[x].length - 1; y++) {
            for (let z = 1; z < grid[x][y].length - 1; z++) {
                if (grid[x][y][z] === "#") {
                    if (grid[x + 1][y][z] === ".") innerSurface++;
                    if (grid[x - 1][y][z] === ".") innerSurface++;
                    if (grid[x][y + 1][z] === ".") innerSurface++;
                    if (grid[x][y - 1][z] === ".") innerSurface++;
                    if (grid[x][y][z + 1] === ".") innerSurface++;
                    if (grid[x][y][z - 1] === ".") innerSurface++;
                }
            }
        }
    }
    // outer surface is global surface minus inner surface
    return partOne(input) - innerSurface;
};

// part1 : 12829 too high

// part2 : 232 too low
// part2 : 3244 too high
// part2 : 2015 too low

console.log('\n--- Day 18: "Boiling Boulders" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : _${partOne(
            input
        )}_ is the surface area of the scanned lava droplet (executed in ${timer(
            partOne,
            input
        )})`
    );
});
console.log("");
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : _${partTwo(
            input
        )}_ is the exterior surface area of the scanned lava droplet (executed in ${timer(
            partTwo,
            input
        )})`
    );
});
console.log("");
