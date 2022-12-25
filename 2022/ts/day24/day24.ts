import * as fs from "fs";

const timer = (
    script: (i: string, p: number) => number,
    input: string,
    part: number
) => {
    const start = performance.now();
    let res = script(input, part);
    const end = performance.now();
    return `_${res}_ (executed in ${(end - start).toFixed(2)}ms)`;
};

// move blizzards one time
const moveBlizzards = (blizzards: any[], map: any) => {
    return blizzards.map((blizzard) => {
        let [pos, dir] = blizzard;
        let [y, x] = pos;
        if (dir === "R") {
            if (map[y][x + 1] === "#") {
                return [[y, 1], "R"];
            } else return [[y, x + 1], "R"];
        } else if (dir === "L") {
            if (map[y][x - 1] === "#") {
                return [[y, map[0].length - 2], "L"];
            } else return [[y, x - 1], "L"];
        } else if (dir === "U") {
            if (map[y - 1][x] === "#") {
                return [[map.length - 2, x], "U"];
            } else return [[y - 1, x], "U"];
        } else if (dir === "D") {
            if (map[y + 1][x] === "#") {
                return [[1, x], "D"];
            } else return [[y + 1, x], "D"];
        }
        return blizzard;
    });
};

const BFS = (
    map: string[][],
    start: number[],
    goal: number[],
    blizzards: any,
    time: any
) => {
    let queue = [[start, time]];
    let visited = new Set();
    while (queue.length > 0) {
        let current = queue.shift();
        if (current === undefined) {
            console.log("current is undefined");
            break;
        }
        let [pos, time] = current;
        let [y, x] = pos;
        if (
            x < 0 ||
            y < 0 ||
            x > map[0].length - 1 ||
            y > map.length - 1 ||
            map[y][x] === "#"
        ) {
            continue;
        }
        if (visited.has(JSON.stringify([pos, time]))) {
            continue;
        }
        visited.add(JSON.stringify([pos, time]));
        // if (visited.size % 10_000 === 0)
        //     console.log(time, y, x, visited.size, queue.length);
        if (y === goal[0] && x === goal[1]) {
            return time;
        }
        // do nothing
        if (
            !JSON.stringify(blizzards[time + 1]).includes(
                JSON.stringify([y, x])
            )
        ) {
            queue.push([[y, x], time + 1]);
        }
        // if possible move down
        if (
            !JSON.stringify(blizzards[time + 1]).includes(
                JSON.stringify([y + 1, x])
            )
        ) {
            queue.push([[y + 1, x], time + 1]);
        }
        // if possible move up
        if (
            !JSON.stringify(blizzards[time + 1]).includes(
                JSON.stringify([y - 1, x])
            )
        ) {
            queue.push([[y - 1, x], time + 1]);
        }
        // if possible move right
        if (
            !JSON.stringify(blizzards[time + 1]).includes(
                JSON.stringify([y, x + 1])
            )
        ) {
            queue.push([[y, x + 1], time + 1]);
        }
        // if possible move left
        if (
            !JSON.stringify(blizzards[time + 1]).includes(
                JSON.stringify([y, x - 1])
            )
        ) {
            queue.push([[y, x - 1], time + 1]);
        }
    }
};

const partsOneAndTwo = (input: string, part: number) => {
    let map = fs
        .readFileSync(`./day24/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((l) => l.split(""));
    let start = [0, 1];
    let goal = [map.length - 1, map[0].length - 2];
    let maxTime = 1000;
    if (part === 1) maxTime = 300;
    let blizzards = new Array(maxTime).fill([]);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === ">") {
                blizzards[0].push([[y, x], "R"]);
            } else if (map[y][x] === "<") {
                blizzards[0].push([[y, x], "L"]);
            } else if (map[y][x] === "^") {
                blizzards[0].push([[y, x], "U"]);
            } else if (map[y][x] === "v") {
                blizzards[0].push([[y, x], "D"]);
            }
        }
    }
    for (let t = 1; t < maxTime; t++) {
        blizzards[t] = moveBlizzards(blizzards[t - 1], map);
    }
    let minMinutesFirstTrip = BFS(map, start, goal, blizzards, 0);
    if (part === 1) return minMinutesFirstTrip;
    let backBlizzards = blizzards.slice(minMinutesFirstTrip, blizzards.length);
    let minMinutesBackTrip = BFS(map, goal, start, backBlizzards, 0);
    let secondBlizzards = backBlizzards.slice(
        minMinutesBackTrip,
        blizzards.length
    );
    let minMinutesSecondTrip = BFS(map, start, goal, secondBlizzards, 0);
    return minMinutesFirstTrip + minMinutesBackTrip + minMinutesSecondTrip;
};

console.clear();
console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 24: "Blizzard Basin" --- ',
    "\n"
);
["example1", "example2", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m %s \x1b[33m\x1b[7m%s\x1b[0m",
        `PART 1 "${input}":`,
        ` The fewest number of minutes required to avoid the blizzards and reach the goal is`,
        `${timer(partsOneAndTwo, input, 1)}`
    );
});
console.log(""); // takes 5 minutes
["example1", "example2", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m %s \x1b[33m\x1b[7m%s\x1b[0m",
        `PART 2 "${input}":`,
        ` The fewest number of minutes required to avoid the blizzards, reach the goal, go back to the start and reach the goal again is`,
        `${timer(partsOneAndTwo, input, 2)}`
    );
});
console.log(""); // takes 17 minutes
