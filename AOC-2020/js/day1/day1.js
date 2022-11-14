import { readFileSync } from 'fs';

const input1 = readFileSync('./inputs/exemple1.in', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => parseInt(x));
const input2 = readFileSync('./inputs/puzzle1.in', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => parseInt(x));

/*
// solution naive pour la part 2 (pour la part 1, enlever une boucle)
const start = Date.now();
for (let i = 0; i < input2.length; i++) {
    for (let j = 0; j < input2.length; j++) {
        for (let k = 0; k < input2.length; k++) {
            if (input2[i] + input2[j] + input2[k] == 2020) {
                console.log(input2[i] * input2[j] * input2[k]);
            }
        }
    }
}
const fin = Date.now() - start;
console.log(fin);
*/

/*
// utilisation de filter part 1
const start = Date.now();
for (let i = 0; i < input2.length; i++) {
    let goal = 2020 - input2[i];
    let filtered = input2.filter((x) => x == goal);
    if (filtered.length == 1) {
        console.log(filtered[0] * input2[i]);
        break;
    }
}
const fin = Date.now() - start;
console.log(fin);
*/

// utilisation de filter + solution naive pour faire la part 2
const start = Date.now();
for (let i = 0; i < input2.length; i++) {
    for (let j = 0; j < input2.length; j++) {
        let goal = 2020 - input2[i] - input2[j];
        let filtered = input2.filter((x) => x == goal);
        if (filtered.length == 1) {
            console.log(filtered[0] * input2[i] * input2[j]);
            break;
        }
    }
}
const fin = Date.now() - start;
console.log(fin);
