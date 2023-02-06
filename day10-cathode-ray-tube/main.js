const fs = require("fs");

const input = fs.readFileSync("./input_prod.txt");

const instructions = input.toString().split("\n");

let X = 1;
let cycles = 0;
let signalStrengthSum = 0;

const cyclesPerCommand = {
  noop: 1,
  addx: 2,
};

for (const instruction of instructions) {
  const [command, arg] = instruction.split(" ");

  for (let c = 0; c < cyclesPerCommand[command]; c++) {
    cycles += 1;
    if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
      signalStrengthSum += cycles * X;
    }
  }

  if (command === "addx") X += Number(arg);
}

console.log(signalStrengthSum);
