import { readFileSync } from 'fs';

const start = Date.now();

const input1 = readFileSync('./inputs/exemple1.in', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => parseInt(x));
const input2 = readFileSync('./inputs/puzzle1.in', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => parseInt(x));

input1.sort((a, b) => a - b);
input2.sort((a, b) => a - b);

/*
// solution naive pour la part 2 (pour la part 1, enlever une boucle)
outerloop: for (let i = 0; i < input2.length; i++) {
    for (let j = 0; j < input2.length; j++) {
        for (let k = 0; k < input2.length; k++) {
            if (input2[i] + input2[j] + input2[k] === 2020) {
                console.log(input2[i] * input2[j] * input2[k]);
                break outerloop;
            }
        }
    }
}
*/

/*
// utilisation de filter part 1
for (let i = 0; i < input2.length; i++) {
    let goal = 2020 - input2[i];
    let filtered = input2.filter((x) => x === goal);
    if (filtered.length === 1) {
        console.log(filtered[0] * input2[i]);
        break;
    }
}
*/

// utilisation de filter + solution naive pour faire la part 2
outerloop: for (let i = 0; i < input2.length; i++) {
    let filtered1 = input2.filter((x) => x <= 2020 - input2[i]);
    for (let j = 0; j < filtered1.length; j++) {
        let goal = 2020 - input2[i] - filtered1[j];
        let filtered2 = filtered1.filter((x) => x === goal);
        if (filtered2.length === 1) {
            console.log(filtered2[0] * input2[i] * filtered1[j]);
            break outerloop;
        }
    }
}

const fin = Date.now() - start;
console.log(fin);
