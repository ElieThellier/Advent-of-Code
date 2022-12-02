import * as fs from "fs";

console.time("\nExecution Time");

const inputs: string[] = ["exemple", "puzzle"];

/** Parse the input as wanted
 *
 * @param input is either exemple or puzzle
 * @returns the input parsed as wanted
 */
const parser = (input: string) =>
    (input = fs.readFileSync(`./day02/inputs/${input}.in`, "utf-8"))
        .trim()
        .split("\n");

/** Get all the choices of the opponent
 *
 * @param input is the input parsed
 * @returns all the choices of the opponent
 */
let getOpponents = (input: string[]) => input.map((line) => line[0]);

/** Get all of your choices
 *
 * @param input is the input parsed
 * @returns all of your choices
 */
let getMines = (input: string[]) => input.map((line) => line[2]);

/**
 *
 * @param opponent is the choice of the opponent
 * @param mine is my choice
 * @returns the score got by me after one round of Rock Paper Scissors between me and the opponent
 */
const resultRPC = (opponent: string, mine: string) => {
    switch (opponent) {
        case "A":
            switch (mine) {
                case "X":
                    return 1 + 3;
                case "Y":
                    return 2 + 6;
                case "Z":
                    return 3 + 0;
            }
        case "B":
            switch (mine) {
                case "X":
                    return 1 + 0;
                case "Y":
                    return 2 + 3;
                case "Z":
                    return 3 + 6;
            }
        case "C":
            switch (mine) {
                case "X":
                    return 1 + 6;
                case "Y":
                    return 2 + 0;
                case "Z":
                    return 3 + 3;
            }
        default:
            return 0;
    }
};

let score: number = 0;
let iteration = 0;
const getScore = (opponents: string[], mines: string[]) => {
    opponents.forEach(() => {
        (score = score + resultRPC(opponents[iteration], mines[iteration])),
            iteration++;
    });
    return score;
};

const logResults = (inputs: string[]) =>
    inputs.forEach((input) =>
        console.log(
            `The total score for the input : "${input}" is _${getScore(
                getOpponents(parser(input)),
                getMines(parser(input))
            )}_`
        )
    );
logResults(inputs);

console.timeEnd("\nExecution Time");
