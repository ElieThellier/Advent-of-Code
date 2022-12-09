import * as fs from "fs";

const timer = (script: (i: string) => any, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const dist = (P: number[], Q: number[]) => {
    return parseFloat(
        Math.sqrt(Math.pow(Q[0] - P[0], 2) + Math.pow(Q[1] - P[1], 2)).toFixed(
            2
        )
    );
};

const partOne = (input: string) => {
    const moves = fs
        .readFileSync(`./day09/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(" "));
    let headPositions = [[0, 0]];
    let tailPositions = [[0, 0]];
    let nTimesTailVisitedEachPos = [1];
    moves.forEach((move) => {
        for (let j = 0; j < parseInt(move[1]); j++) {
            switch (move[0]) {
                case "R":
                    headPositions.push([
                        headPositions[headPositions.length - 1][0] + 1,
                        headPositions[headPositions.length - 1][1],
                    ]);
                    break;
                case "U":
                    headPositions.push([
                        headPositions[headPositions.length - 1][0],
                        headPositions[headPositions.length - 1][1] + 1,
                    ]);
                    break;
                case "L":
                    headPositions.push([
                        headPositions[headPositions.length - 1][0] - 1,
                        headPositions[headPositions.length - 1][1],
                    ]);
                    break;
                case "D":
                    headPositions.push([
                        headPositions[headPositions.length - 1][0],
                        headPositions[headPositions.length - 1][1] - 1,
                    ]);
                    break;
            }
            if (
                dist(
                    headPositions[headPositions.length - 1],
                    tailPositions[tailPositions.length - 1]
                ) >= 2
            ) {
                tailPositions.push(headPositions[headPositions.length - 2]);
            } else {
                tailPositions.push(tailPositions[tailPositions.length - 1]);
            }
            let countTimesTailVisitedPos = 1;
            for (let pos of tailPositions.slice(0, tailPositions.length - 1)) {
                if (
                    tailPositions[tailPositions.length - 1][0] === pos[0] &&
                    tailPositions[tailPositions.length - 1][1] === pos[1]
                ) {
                    countTimesTailVisitedPos++;
                }
            }
            nTimesTailVisitedEachPos.push(countTimesTailVisitedPos);
        }
    });
    let countTailVisitedPos = nTimesTailVisitedEachPos.reduce(
        (prev, curr) => (curr === 1 ? prev + curr : prev + 0),
        0
    );
    console.log(countTailVisitedPos);
};

partOne("exemple");
partOne("puzzle");
