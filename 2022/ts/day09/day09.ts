import * as fs from "fs";

const timer = (
    script: (i: string, l: number) => any,
    input: string,
    ropeLenght: number
) => {
    const start = performance.now();
    script(input, ropeLenght);
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

const partsOneAndTwo = (input: string, ropeLenght: number) => {
    const moves = fs
        .readFileSync(`./day09/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(" "));
    let headPositions: number[][][] = [[[0, 0]]];
    let tailPositions: number[][][] = [];
    let nTimesTailVisitedEachPos: number[][] = [[1]];
    let countTailVisitedPos: number[] = [];
    for (let n = 0; n < ropeLenght; n++) {
        headPositions.push([[0, 0]]);
        tailPositions.push([[0, 0]]);
        nTimesTailVisitedEachPos.push([1]);
        countTailVisitedPos.push(0);
    }
    nTimesTailVisitedEachPos.pop();
    moves.forEach((move) => {
        for (let j = 0; j < parseInt(move[1]); j++) {
            switch (move[0]) {
                case "R":
                    headPositions[0].push([
                        headPositions[0][headPositions[0].length - 1][0] + 1,
                        headPositions[0][headPositions[0].length - 1][1],
                    ]);
                    break;
                case "U":
                    headPositions[0].push([
                        headPositions[0][headPositions[0].length - 1][0],
                        headPositions[0][headPositions[0].length - 1][1] + 1,
                    ]);
                    break;
                case "L":
                    headPositions[0].push([
                        headPositions[0][headPositions[0].length - 1][0] - 1,
                        headPositions[0][headPositions[0].length - 1][1],
                    ]);
                    break;
                case "D":
                    headPositions[0].push([
                        headPositions[0][headPositions[0].length - 1][0],
                        headPositions[0][headPositions[0].length - 1][1] - 1,
                    ]);
                    break;
            }
            for (let n = 0; n < ropeLenght; n++) {
                let temp1 = tailPositions[n][tailPositions[n].length - 1];
                let temp2 = headPositions[n][tailPositions[n].length + 1 - 1];
                if (dist(temp1, temp2) >= 2) {
                    if (temp1[0] === temp2[0]) {
                        if (temp2[1] > temp1[1]) {
                            tailPositions[n].push([temp1[0], temp1[1] + 1]);
                        } else if (temp2[1] < temp1[1]) {
                            tailPositions[n].push([temp1[0], temp1[1] - 1]);
                        }
                    } else if (temp1[1] === temp2[1]) {
                        if (temp2[0] > temp1[0]) {
                            tailPositions[n].push([temp1[0] + 1, temp1[1]]);
                        } else if (temp2[0] < temp1[0]) {
                            tailPositions[n].push([temp1[0] - 1, temp1[1]]);
                        }
                    } else if (temp2[0] > temp1[0]) {
                        if (temp2[1] > temp1[1]) {
                            tailPositions[n].push([temp1[0] + 1, temp1[1] + 1]);
                        } else if (temp2[1] < temp1[1]) {
                            tailPositions[n].push([temp1[0] + 1, temp1[1] - 1]);
                        }
                    } else if (temp2[0] < temp1[0]) {
                        if (temp2[1] > temp1[1]) {
                            tailPositions[n].push([temp1[0] - 1, temp1[1] + 1]);
                        } else if (temp2[1] < temp1[1]) {
                            tailPositions[n].push([temp1[0] - 1, temp1[1] - 1]);
                        }
                    }
                } else {
                    tailPositions[n].push(temp1);
                }
                headPositions[n + 1] = tailPositions[n];

                let countTimesTailVisitedPos = 1;
                for (let pos of tailPositions[n].slice(
                    0,
                    tailPositions[n].length - 1
                )) {
                    if (
                        tailPositions[n][tailPositions[n].length - 1][0] ===
                            pos[0] &&
                        tailPositions[n][tailPositions[n].length - 1][1] ===
                            pos[1]
                    ) {
                        countTimesTailVisitedPos++;
                    }
                }
                nTimesTailVisitedEachPos[n].push(countTimesTailVisitedPos);

                countTailVisitedPos[n] = nTimesTailVisitedEachPos[n].reduce(
                    (prev, curr) => (curr === 1 ? prev + curr : prev + 0),
                    0
                );
            }
        }
    });
    return countTailVisitedPos[ropeLenght - 1];
};

["exemple1", "exemple2", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 : The number of positions visited by the tail of the rope is _${partsOneAndTwo(
            input,
            1
        )}_ (rope's lenght is 1 and input is "${input}" (executed in ${timer(
            partsOneAndTwo,
            input,
            1
        )})`
    );
});

console.log("\n");

["exemple1", "exemple2", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 : The number of positions visited by the tail of the rope is _${partsOneAndTwo(
            input,
            9
        )}_ (rope's lenght is 9 and input is "${input}" (executed in ${timer(
            partsOneAndTwo,
            input,
            9
        )})`
    );
});
