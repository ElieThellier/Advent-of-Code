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
    console.log(input, part);
    let blueprints = fs
        .readFileSync(`./day19/inputs/${input}.in`, "utf-8")
        .split("\n")
        .map((blueprint) =>
            blueprint
                .replace("Blueprint ", "")
                .replace(": Each ore robot costs ", "_")
                .replace(" ore. Each clay robot costs ", "_")
                .replace(" ore. Each obsidian robot costs ", "_")
                .replace(" ore and ", "_")
                .replace(" clay. Each geode robot costs ", "_")
                .replace(" ore and ", "_")
                .replace(" obsidian.", "")
                .split("_")
                .map((x) => parseInt(x))
        )
        .map((blueprint) => {
            return {
                ID: blueprint[0],
                oreRCostOre: blueprint[1],
                clayRCostOre: blueprint[2],
                obsidianRCostOre: blueprint[3],
                obsidianRCostClay: blueprint[4],
                geodeRCostOre: blueprint[5],
                geodeRCostObsidian: blueprint[6],
            };
        });
    if (part === 2) blueprints = blueprints.slice(0, 3);
    let p1 = 0;
    let p2 = 1;
    blueprints.forEach((bp) => {
        console.log("working on blueprint", bp.ID);
        let maxTime = 0;
        if (part === 1) maxTime = 24;
        if (part === 2) maxTime = 32;
        // starting node
        let ore = 0,
            clay = 0,
            obsidian = 0,
            geode = 0,
            oreR = 1,
            clayR = 0,
            obsidianR = 0,
            geodeR = 0,
            time = 0;
        // bfs but dfs will be faster because of the cache I guess
        // a node is a tuple of [0=ore, 1=clay, 2=obsidian, 3=geode, 4=oreR,
        //                       5=clayR, 6=obsidianR, 7=geodeR, 8=time]
        let nodes = [
            [ore, clay, obsidian, geode, oreR, clayR, obsidianR, geodeR, time],
        ];
        let maxGeode = 0;
        let maxOre = Math.max(
            bp.clayRCostOre,
            bp.obsidianRCostOre,
            bp.geodeRCostOre,
            bp.oreRCostOre,
            0
        );
        let checkGeodeAtTime = 1;
        //try to cache
        let visited = new Set();
        while (nodes.length > 0) {
            let currNode: any = nodes.shift();
            [ore, clay, obsidian, geode, oreR, clayR, obsidianR, geodeR, time] =
                currNode;
            if (
                ore < 0 ||
                clay < 0 ||
                obsidian < 0 ||
                geode < 0 ||
                oreR < 0 ||
                clayR < 0 ||
                obsidianR < 0 ||
                geodeR < 0
            ) {
                console.log("error");
                break;
            }
            if (geode > maxGeode) maxGeode = geode;
            if (time === checkGeodeAtTime) {
                console.log(time - 1, maxGeode);
                checkGeodeAtTime += 1;
            }
            if (visited.size % 100_000 === 0 && visited.size > 0)
                console.log(bp.ID, time, maxGeode, visited.size, nodes.length);
            if (time === maxTime) continue;

            // some optimizations :
            // getting rid of useless robots
            if (oreR > maxOre) oreR = maxOre;
            if (clayR > bp.obsidianRCostClay) clayR = bp.obsidianRCostClay;
            if (obsidianR > bp.geodeRCostObsidian)
                obsidianR = bp.geodeRCostObsidian;

            // getting rid of useless materials (we have more than needed to build most expensive robot at every time after this node)
            let remainingTime = maxTime - time;
            let biggestAmountOfOre =
                maxOre * remainingTime - oreR * (remainingTime - 1);
            if (ore > biggestAmountOfOre) ore = biggestAmountOfOre;
            let biggestAmountOfClay =
                bp.obsidianRCostClay * remainingTime -
                clayR * (remainingTime - 1);
            if (clay > biggestAmountOfClay) clay = biggestAmountOfClay;
            let biggestAmountOfObsidian =
                bp.geodeRCostObsidian * remainingTime -
                obsidianR * (remainingTime - 1);
            if (obsidian > biggestAmountOfObsidian)
                obsidian = biggestAmountOfObsidian;

            // prune branches that will give less geode than the current maximum
            let X = 0;
            if (geode + geodeR * remainingTime < maxGeode - X) continue;

            currNode = [
                ore,
                clay,
                obsidian,
                geode,
                oreR,
                clayR,
                obsidianR,
                geodeR,
                time,
            ];
            if (visited.has(currNode?.toString())) {
                continue;
            }
            // add the current node to the cache
            visited.add(currNode?.toString());

            // do nothing
            nodes.push([
                ore + oreR,
                clay + clayR,
                obsidian + obsidianR,
                geode + geodeR,
                oreR,
                clayR,
                obsidianR,
                geodeR,
                time + 1,
            ]);
            // build a ore robot
            if (ore >= bp.oreRCostOre) {
                // if it is useful
                if (oreR < maxOre)
                    nodes.push([
                        ore - bp.oreRCostOre + oreR,
                        clay + clayR,
                        obsidian + obsidianR,
                        geode + geodeR,
                        oreR + 1,
                        clayR,
                        obsidianR,
                        geodeR,
                        time + 1,
                    ]);
            }
            // build a clay robot
            if (ore >= bp.clayRCostOre) {
                // if it is useful
                if (clayR < bp.obsidianRCostClay)
                    nodes.push([
                        ore - bp.clayRCostOre + oreR,
                        clay + clayR,
                        obsidian + obsidianR,
                        geode + geodeR,
                        oreR,
                        clayR + 1,
                        obsidianR,
                        geodeR,
                        time + 1,
                    ]);
            }
            // build an obsidian robot
            if (ore >= bp.obsidianRCostOre && clay >= bp.obsidianRCostClay) {
                // if it is useful
                if (obsidianR < bp.geodeRCostObsidian)
                    nodes.push([
                        ore - bp.obsidianRCostOre + oreR,
                        clay - bp.obsidianRCostClay + clayR,
                        obsidian + obsidianR,
                        geode + geodeR,
                        oreR,
                        clayR,
                        obsidianR + 1,
                        geodeR,
                        time + 1,
                    ]);
            }
            // build a geode robot
            if (ore >= bp.geodeRCostOre && obsidian >= bp.geodeRCostObsidian) {
                // must be tested first?
                //nodes.unshift([
                nodes.push([
                    ore - bp.geodeRCostOre + oreR,
                    clay + clayR,
                    obsidian - bp.geodeRCostObsidian + obsidianR,
                    geode + geodeR,
                    oreR,
                    clayR,
                    obsidianR,
                    geodeR + 1,
                    time + 1,
                ]);
            }
        }
        if (part === 1) {
            p1 += maxGeode * bp.ID;
            console.log(
                bp.ID,
                "finished with",
                maxGeode,
                maxGeode * bp.ID,
                "actual p1 :",
                p1
            );
        }
        if (part === 2) {
            p2 *= maxGeode;
            console.log(bp.ID, "finished with", maxGeode, "actual p2 :", p2);
        }
    });
    if (part === 1) console.log(p1);
    if (part === 2) console.log(p2);
    if (part === 1) return p1;
    if (part === 2) return p2;
    return "pb";
};

console.log('\n--- Day 19: "Not Enough Minerals" ---\n');
console.log("you need to uncomment the part you want to run in the code");

// j'ai modifié l'input example pour qu'il est la même forme que l'input puzzle
//partsOneAndTwo("example", 1);
//partsOneAndTwo("puzzle", 1);
//partsOneAndTwo("example", 2);
//partsOneAndTwo("puzzle", 2);

//console.log(timer(partsOneAndTwo, "example", 1));
//console.log(timer(partsOneAndTwo, "example", 2));
//console.log(timer(partsOneAndTwo, "puzzle", 1));
//console.log(timer(partsOneAndTwo, "puzzle", 2));

console.log("");

// part1: 798 too low
// part2: 1352 too high

// part1 executed in 748s = 12min28s
// part2 executed in 1h30m
