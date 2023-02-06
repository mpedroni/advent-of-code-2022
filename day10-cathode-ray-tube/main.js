const fs = require("fs");

const input = fs.readFileSync("./input_prod.txt");

const instructions = input.toString().split("\n");

let X = 1;
let cycle = 0;
let signalStrengthSum = 0;

const cyclesPerCommand = {
  noop: 1,
  addx: 2,
};

const CRT_ROWS = 6;
const CRT_COLUMNS = 40;

const p = new Array(CRT_ROWS * CRT_COLUMNS).fill(".");

for (const instruction of instructions) {
  const [command, arg] = instruction.split(" ");

  for (let c = 0; c < cyclesPerCommand[command]; c++) {
    const pixel = cycle % CRT_COLUMNS;
    if (pixel >= X - 1 && pixel <= X + 1) {
      p[cycle] += "#";
    } else {
      p[cycle] += ".";
    }

    cycle += 1;

    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      signalStrengthSum += cycle * X;
    }
  }

  if (command === "addx") X += Number(arg);
}

console.log("part one", signalStrengthSum);

let line = "";
for (const i in p) {
  if (i % 40 === 0) line += "\n";

  line += p[i];
}

console.log("part two");

console.log(line);
