import * as fs from "fs";

const timer = (script: (i: string) => string, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)}ms`;
};

const SNAFUtoDecimal = (SNAFU: string[]) => {
    let [decimal, power] = [0, 0];
    let convert: any = { "=": -2, "-": -1, "0": 0, "1": 1, "2": 2 };
    for (let i = SNAFU.length - 1; i >= 0; i--, power++) {
        decimal += convert[SNAFU[i]] * Math.pow(5, power);
    }
    return decimal;
};

const decimalToSNAFU = (decimal: number) => {
    let SNAFU = "";
    let convertIndexToSNAFUdigit: any = {
        "0": "2",
        "1": "1",
        "2": "0",
        "3": "-",
        "4": "=",
    };
    // search for the highest power of 5 that is smaller than decimal
    let i = 0;
    while (decimal - Math.pow(5, i) >= 0) {
        i++;
    }
    i--;
    // convert decimal to SNAFU starting from the highest power of 5
    while (decimal !== 0) {
        if (i === -1) {
            console.log("decimal is negative or could not be converted");
            break;
        } else {
            let possibilities = [
                decimal - +2 * Math.pow(5, i),
                decimal - +1 * Math.pow(5, i),
                decimal,
                decimal - -1 * Math.pow(5, i),
                decimal - -2 * Math.pow(5, i),
            ];
            let closer = Math.min(...possibilities.map(Math.abs));
            let index = possibilities.map(Math.abs).indexOf(closer);
            SNAFU += convertIndexToSNAFUdigit[index];
            decimal = possibilities[index];
            i--;
        }
    }
    return SNAFU;
};

const partOne = (input: string) => {
    let lines = fs
        .readFileSync(`./day25/inputs/${input}.in`, "utf-8")
        .split("\n");
    let sum = 0;
    lines.forEach((line) => {
        sum += SNAFUtoDecimal(line.split(""));
    });
    return decimalToSNAFU(sum);
};

// à la main :
// console.log(SNAFUtoDecimal("2=222-2---22=1=--1-2".split(""))); // 32_405_707_664_897

console.clear();
console.log(
    "%s \x1b[7m%s\x1b[0m %s",
    "\n",
    ' --- Day 25: "Full of Hot Air" --- ',
    "\n"
);
["example", "puzzle"].forEach((input) => {
    console.log(
        "\x1b[4m%s\x1b[0m \x1b[33m\x1b[7m%s\x1b[0m %s \x1b[31m%s\x1b[0m",
        `PART 1 "${input}":`,
        `${partOne(input)}`,
        `is the SNAFU number that is supplied to Bob's console`,
        `(executed in ${timer(partOne, input)})`
    );
});
console.log("");
