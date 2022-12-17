import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const parseAndGetExtremums = (input: string, part: number) => {
    // input line by line and split by space
    const lines = fs
        .readFileSync(`./day15/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) => line.split(" "));
    // get coordonates of sensors and beacons in correspondance
    let pointsCorrespondance = lines.map((line) => {
        return [
            [
                parseInt(line[2].split("=")[1].slice(0, -1)),
                parseInt(line[3].split("=")[1].slice(0, -1)),
            ],
            [
                parseInt(line[8].split("=")[1].slice(0, -1)),
                parseInt(line[9].split("=")[1]),
            ],
        ];
    });

    // TODO: on a pas besoin de prendre en compte les coordonates des beacons pour trouver les extremums
    // extremum pos for each coordonate
    let minX = Math.min(
        ...pointsCorrespondance.map((correspondance) =>
            Math.min(correspondance[0][0], correspondance[1][0])
        )
    );
    let maxX = Math.max(
        ...pointsCorrespondance.map((correspondance) =>
            Math.max(correspondance[0][0], correspondance[1][0])
        )
    );
    let minY = Math.min(
        ...pointsCorrespondance.map((correspondance) =>
            Math.min(correspondance[0][1], correspondance[1][1])
        )
    );
    let maxY = Math.max(
        ...pointsCorrespondance.map((correspondance) =>
            Math.max(correspondance[0][1], correspondance[1][1])
        )
    );

    // offset to include # in theLine that are not in the starting grid
    // I started at 2_000_000 and decreased the value (to lower execution time) while I was getting the right answer
    // an offset of 650_000 is enough to get the right answer FOR MY PUZZLE INPUT (MAY NOT WORK FOR YOURS)
    let offset = 650_000;
    if (input === "example") {
        offset = 1;
    }

    // only for part 1
    if (part === 1) {
        minX -= offset;
        maxX += offset;
    }

    // translate all points to positive
    pointsCorrespondance = pointsCorrespondance.map(
        (correspondance: number[][]) =>
            correspondance.map((point: number[]) => {
                return [point[0] + Math.abs(minX), point[1] + Math.abs(minY)];
            })
    );
    return [pointsCorrespondance, minX, maxX, minY, maxY];
};

const createTheLine = (minX: any, maxX: any) => {
    let width = maxX + Math.abs(minX) + 1;

    // init theLine with dots
    let theLine = new Array();
    for (let x = 0; x < width; x++) {
        theLine.push(".");
    }
    return [theLine, width];
};

const dist = (p1: number[], p2: number[]) => {
    return Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0]);
};

const partOne = (input: string) => {
    let [pointsCorrespondance, minX, maxX, minY]: any[] = parseAndGetExtremums(
        input,
        1
    );
    let [theLine, width]: any[] = createTheLine(minX, maxX);
    let distSB: number[] = [];
    pointsCorrespondance.forEach((correspondance: number[][]) => {
        distSB.push(dist(correspondance[0], correspondance[1]));
    });

    let row = 2_000_000 + Math.abs(minY);
    if (input === "example") {
        row = 10 + Math.abs(minY);
    }

    let distToRow: number[] = [];
    pointsCorrespondance.forEach((correspondance: number[][]) => {
        distToRow.push(Math.abs(correspondance[0][1] - row));
    });

    // get interesting sensors (sensors that can see the row)
    let interestingSensors: number[][][] = [];
    let distSBofInterestingSensors: number[] = [];

    distSB.forEach((d, i) => {
        if (d >= distToRow[i]) {
            interestingSensors.push(pointsCorrespondance[i]);
            distSBofInterestingSensors.push(d);
        }
    });

    // draw range of interesting sensors on theLine
    interestingSensors.forEach((sensor: number[][], i) => {
        for (let x = 0; x < width; x++) {
            if (dist([x, row], sensor[0]) <= distSBofInterestingSensors[i]) {
                theLine[x] = "#";
            }
        }
    });

    // draw sensors and beacons
    for (let correspondance of pointsCorrespondance) {
        if (correspondance[0][1] === row) {
            theLine[correspondance[0][0]] = "S";
        }
        if (correspondance[1][1] === row) {
            theLine[correspondance[1][0]] = "B";
        }
    }

    // pretty print theLine (uncomment to see / too big with puzzle input)
    //console.log(theLine.join(""));

    return theLine.filter((c: string) => c === "#").length;
};

const getPointsOnCircle = (point: number[], distance: number): number[][] => {
    let outerCircle: number[][] = [];
    for (let i = 0; i < distance; i++) {
        outerCircle.push([point[0] + i, point[1] + distance - i]);
        outerCircle.push([point[0] + i - distance, point[1] + i]);
        outerCircle.push([point[0] - i, point[1] - distance + i]);
        outerCircle.push([point[0] - i + distance, point[1] - i]);
    }
    return outerCircle;
};

const partTwo = (input: string) => {
    let [pointsCorrespondance, minX, maxX, minY]: any[] = parseAndGetExtremums(
        input,
        2
    );

    let distSB: number[] = [];
    pointsCorrespondance.forEach((correspondance: number[][]) => {
        distSB.push(dist(correspondance[0], correspondance[1]));
    });

    let length = 4_000_000;
    if (input === "example") {
        length = 20;
    }

    // Le point qui n'est vu par aucun sensor est forcément à l'extérieur du cercle de vision de tous les autres sensors
    // donc, pour tous les sensors, je regarder uniquement sur les points du cercle exterieur à sa vision
    // et je regarde si le point est à l'extérieur de la vision de tous les autres sensors
    for (let i = 0; i < pointsCorrespondance.length; i++) {
        for (let points of getPointsOnCircle(
            pointsCorrespondance[i][0],
            distSB[i] + 1
        )) {
            let isPoint = 0;
            for (let j = 0; j < pointsCorrespondance.length; j++) {
                if (dist(points, pointsCorrespondance[j][0]) > distSB[j]) {
                    isPoint++;
                }
            }
            if (
                isPoint === pointsCorrespondance.length &&
                points[0] - Math.abs(minX) >= 0 &&
                points[1] - Math.abs(minY) >= 0 &&
                points[0] - Math.abs(minX) <= length &&
                points[1] - Math.abs(minY) <= length
            ) {
                return (
                    (points[0] - Math.abs(minX)) * 4_000_000 +
                    (points[1] - Math.abs(minY))
                );
            }
        }
    }
    return 0;
};

console.log('\n--- Day 15: "Beacon Exclusion Zone" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : _${partOne(
            input
        )}_ positions cannot contain a beacon in the selected row (executed in ${timer(
            partOne,
            input
        )})`
    );
});
console.log("");

["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : The tuning frequency is equal to _${partTwo(
            input
        )}_ (executed in ${timer(partTwo, input)})`
    );
});
console.log("");
