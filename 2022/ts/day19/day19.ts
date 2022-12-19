import * as fs from "fs";

const timer = (script: (i: string) => number, input: string) => {
    const start = performance.now();
    script(input);
    const end = performance.now();
    return `${(end - start).toFixed(2)} ms`;
};

const partOne = (input: string) => {
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

    let timer = 1,
        oreR = 1,
        clayR = 0,
        obsidianR = 0,
        geodeR = 0,
        ore = 0,
        clay = 0,
        obsidian = 0,
        geode = 0,
        action = "",
        qualityLevel: number[] = [];

    blueprints.forEach((blueprint) => {
        while (timer <= 24) {
            // pay price of robots before collecting
            if (
                ore >= blueprint.geodeRCostOre &&
                obsidian >= blueprint.geodeRCostObsidian
            ) {
                action = "geodeR";
                ore -= blueprint.geodeRCostOre;
                obsidian -= blueprint.geodeRCostObsidian;
            } else if (
                ore >= blueprint.obsidianRCostOre &&
                clay >= blueprint.obsidianRCostClay &&
                obsidianR < 2
            ) {
                action = "obsidianR";
                ore -= blueprint.obsidianRCostOre;
                clay -= blueprint.obsidianRCostClay;
            } else if (ore >= blueprint.clayRCostOre) {
                action = "clayR";
                ore -= blueprint.clayRCostOre;
            } else if (ore >= blueprint.oreRCostOre) {
                action = "oreR";
                ore -= blueprint.oreRCostOre;
            } else {
                action = "";
            }

            // count collected before creating new robots
            ore += oreR;
            clay += clayR;
            obsidian += obsidianR;
            geode += geodeR;

            // create new robots with priority to the most expensive
            if (action === "geodeR") {
                geodeR++;
            } else if (action === "obsidianR") {
                obsidianR++;
            } else if (action === "clayR") {
                clayR++;
            } else if (action === "oreR") {
                oreR++;
            }
            timer++;
        }
        qualityLevel.push(geode * blueprint.ID);
    });
    console.log(
        qualityLevel,
        qualityLevel.reduce((acc, curr) => acc + curr, 0)
    );
};

partOne("example");

// j'ai modifié l'input example pour qu'il est la même forme que l'input puzzle
console.log('\n--- Day 19: "Not Enough Minerals" ---\n');
