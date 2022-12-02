import * as fs from "fs";

console.time("\nExecution Time");

const inputs: string[] = ["exemple", "puzzle"];

/** Parse the input as wanted
 *
 * @param input is either exemple or puzzle
 * @returns the input parsed as wanted
 */
const parser = (input: string) =>
    (input = fs.readFileSync(`./day02/inputs/${input}.in`, "utf-8")).split(
        "\n"
    );

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
let getMines = (input: string[]) => input.map((line) => line[2]); // or objectives

/** get the score of one round
 *
 * @param opponent is the choice of the opponent
 * @param mine is my choice
 * @returns the score got by me after one round of Rock Paper Scissors between me and the opponent
 */
const resultRPC1 = (opponent: string, mine: string) => {
    switch (opponent) {
        case "A":
            switch (mine) {
                case "X":
                    return 1 + 3;
                case "Y":
                    return 2 + 6;
                case "Z":
                    return 3 + 0;
                default:
                    return 0;
            }
        case "B":
            switch (mine) {
                case "X":
                    return 1 + 0;
                case "Y":
                    return 2 + 3;
                case "Z":
                    return 3 + 6;
                default:
                    return 0;
            }
        case "C":
            switch (mine) {
                case "X":
                    return 1 + 6;
                case "Y":
                    return 2 + 0;
                case "Z":
                    return 3 + 3;
                default:
                    return 0;
            }
        default:
            return 0;
    }
};

let score1: number = 0;
let iteration1: number = 0;

/** get the score of all rounds
 *
 * @param opponents is all choices of the opponent
 * @param mines is all of my choices
 * @returns the score got by me after all rounds of Rock Paper Scissors between me and the opponent
 */
const getScore1 = (opponents: string[], mines: string[]) => {
    opponents.forEach(() => {
        score1 = score1 + resultRPC1(opponents[iteration1], mines[iteration1]);
        iteration1++;
    });
    return score1;
};

/** Print the results of the inputs
 *
 * @param inputs
 */
const logResults1 = (inputs: string[]) =>
    inputs.forEach((input) => {
        score1 = 0;
        iteration1 = 0;
        console.log(
            `PART 1 : The total score for the input : "${input}" is _${getScore1(
                getOpponents(parser(input)),
                getMines(parser(input))
            )}_`
        );
    });

logResults1(inputs);

// PART 2 :

/** get the score of one round
 *
 * @param opponent is the choice of the opponent
 * @param objective is the objective (X = lose, Y = draw, Z = win) of the round
 * @returns the score got by me after one round of Rock Paper Scissors between me and the opponent
 */
const resultRPC2 = (opponent: string, objective: string) => {
    switch (opponent) {
        case "A":
            switch (objective) {
                case "X":
                    return 3 + 0;
                case "Y":
                    return 1 + 3;
                case "Z":
                    return 2 + 6;
                default:
                    return 0;
            }
        case "B":
            switch (objective) {
                case "X":
                    return 1 + 0;
                case "Y":
                    return 2 + 3;
                case "Z":
                    return 3 + 6;
                default:
                    return 0;
            }
        case "C":
            switch (objective) {
                case "X":
                    return 2 + 0;
                case "Y":
                    return 3 + 3;
                case "Z":
                    return 1 + 6;
                default:
                    return 0;
            }
        default:
            return 0;
    }
};

let score2: number = 0;
let iteration2: number = 0;

/** get the score of all rounds
 *
 * @param opponents is all choices of the opponent
 * @param objectives is all of my choices
 * @returns the score got by me after all rounds of Rock Paper Scissors between me and the opponent
 */
const getScore2 = (opponents: string[], objectives: string[]) => {
    opponents.forEach(() => {
        (score2 =
            score2 + resultRPC2(opponents[iteration2], objectives[iteration2])),
            iteration2++;
    });
    return score2;
};

/** Print the results of the inputs
 *
 * @param inputs
 */
const logResults2 = (inputs: string[]) =>
    inputs.forEach((input) => {
        score2 = 0;
        iteration2 = 0;
        console.log(
            `PART 2 : The total score for the input : "${input}" is _${getScore2(
                getOpponents(parser(input)),
                getMines(parser(input))
            )}_`
        );
    });

logResults2(inputs);

console.timeEnd("\nExecution Time");
