import * as fs from "fs";

const timer = (
    script: (i: string, p: number) => number,
    input: string,
    part: number
) => {
    const start = performance.now();
    script(input, part);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partsOneAndTwo = (input: string, part: number) => {
    let parsed = fs
        .readFileSync(`./day16/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((line) =>
            line
                .replace("Valve ", "")
                .replace(" has flow rate=", "_")
                .replace("; tunnels lead to valves ", "_")
                .replace("; tunnel leads to valve ", "_")
                .split("_")
                .map((elt, i) => {
                    if (i == 1) {
                        return parseInt(elt);
                    } else if (i == 2) {
                        return elt.split(", ");
                    }
                    return elt;
                })
        );
    let flows = new Map();
    let tunnels = new Map();
    parsed.forEach((elt: any) => {
        flows.set(elt[0], elt[1]);
        tunnels.set(elt[0], elt[2]);
    });

    const getDistByBFS = (flows: any, tunnels: any) => {
        let nonEmptyValves: string[] = [];
        let dists: any = new Map();
        for (let valve of flows.keys()) {
            if (valve !== "AA" && flows.get(valve) === 0) continue;
            if (valve !== "AA") nonEmptyValves.push(valve);
            dists.set(
                valve,
                new Map([
                    [valve, 0],
                    ["AA", 0],
                ])
            );
            let visited = new Set(valve);
            let queue = [[0, valve]];
            while (queue.length > 0) {
                let [dist, current]: any = queue.shift();
                for (let next of tunnels.get(current)) {
                    if (visited.has(next)) continue;
                    visited.add(next);
                    if (flows.get(next) > 0)
                        dists.get(valve).set(next, dist + 1);
                    queue.push([dist + 1, next]);
                }
            }

            dists.get(valve).delete(valve);
            if (valve !== "AA") dists.get(valve).delete("AA");
        }
        return [dists, nonEmptyValves];
    };

    let indices: any = new Map();
    let [dists, nonEmptyValves] = getDistByBFS(flows, tunnels);
    nonEmptyValves.forEach((valve: string, i: number) => {
        indices.set(valve, i);
    });
    let cache = new Map();

    const DFS: any = (time: number, valve: string, bitmask: any) => {
        if ([time, valve, bitmask].toString() in cache)
            return cache.get([time, valve, bitmask].toString());
        let maxVal = 0;
        for (let neighbor of dists.get(valve).keys()) {
            let bit = 1 << indices.get(neighbor);
            if (bitmask & bit) continue;
            let remainingTime = time - dists.get(valve).get(neighbor) - 1;
            if (remainingTime <= 0) continue;
            maxVal = Math.max(
                maxVal,
                DFS(remainingTime, neighbor, bitmask | bit) +
                    flows.get(neighbor) * remainingTime
            );
        }
        cache.set([time, valve, bitmask].toString(), maxVal);
        return maxVal;
    };
    if (part === 1) return DFS(30, "AA", 0);
    if (part === 2) {
        let b: any = (1 << nonEmptyValves.length) - 1;
        let m = 0;
        for (let i = 0; i < Math.floor((b + 1) / 2); i++) {
            m = Math.max(m, DFS(26, "AA", i) + DFS(26, "AA", b ^ i));
        }
        return m;
    }
};

console.log('\n--- Day 15: "Beacon Exclusion Zone" ---\n');
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 1 "${input}" : The most pressure that can be released is _${partsOneAndTwo(
            input,
            1
        )}_ (executed in ${timer(partsOneAndTwo, input, 1)})`
    );
});
console.log("");
["example", "puzzle"].forEach((input) => {
    console.log(
        `PART 2 "${input}" : With the help of the elephant, the most pressure that can be released is _${partsOneAndTwo(
            input,
            2
        )}_ (executed in ${timer(partsOneAndTwo, input, 2)})`
    );
});
console.log("");
