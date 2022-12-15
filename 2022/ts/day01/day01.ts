import * as fs from "fs";

console.time("\nExecution Time");

const inputs: string[] = ["example", "puzzle"];

// one line function :)
/** print the sum of the calories carried by the k = 3 best elves for the inputs in inputs table
 *
 * @param numberKofElves put this parameter to 3 to get the top 3
 * @returns
 */
const topKmaxCalories = (numberKofElves: number) => (inputs: string[]) =>
    inputs.forEach((input: string) =>
        console.log(
            `The sum of the calories carried by the k : "${numberKofElves}" best elves (= that carries the most calories) for the input : "${input}" is equal to _${fs
                .readFileSync(`./day01/inputs/${input}.in`, "utf-8")
                .split("\n\n")
                .map((caloriesByElves: string) =>
                    caloriesByElves
                        .split("\n")
                        .map((x) => parseInt(x))
                        .reduce((prev, curr) => prev + curr, 0)
                )
                .sort((a, b) => b - a)
                .splice(0, numberKofElves)
                .reduce((prev, curr) => prev + curr, 0)}_\n`
        )
    );

console.log('\n--- Day 01: "Calorie Counting" ---\n');
topKmaxCalories(1)(inputs);

const numberKofElves = 3;
topKmaxCalories(numberKofElves)(inputs);

console.timeEnd("\nExecution Time");
