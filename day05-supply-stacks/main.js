const fs = require("fs");

const test = "./input_test.txt";
const prod = "./input_prod.txt";

const file = fs.readFileSync(prod);
const [stacksAsString, moves] = file.toString().split("\n\n");

function createStacks(stacksAsString) {
  let numberOfStacks = 0;
  let stacks = [];
  for (const line of stacksAsString.split("\n").reverse()) {
    if (!numberOfStacks) {
      const getNumbers = /\w/g;
      numberOfStacks = Number(line.match(getNumbers).at(-1));
      stacks = new Array(numberOfStacks);
      for (let i = 0; i < numberOfStacks; i++) {
        stacks[i] = [];
      }
      continue;
    }

    line.split("").forEach((char, i) => {
      const isStack = /\w/;
      if (!isStack.test(char)) return;

      const stack = (i - 1) / 4;

      stacks[stack].push(char);
    });
  }

  return stacks;
}

function makeMovesForPartOne(moves, stacks) {
  for (const move of moves.split("\n")) {
    const splittedMove = move.split(" ");
    const quantity = Number(splittedMove[1]);
    const from = Number(splittedMove[3]) - 1;
    const to = Number(splittedMove[5]) - 1;

    for (let i = 0; i < quantity; i++) {
      stacks[to].push(stacks[from].pop());
    }
  }

  return stacks;
}

function makeMovesForPartTwo(moves, stacks) {
  for (const move of moves.split("\n")) {
    const splittedMove = move.split(" ");
    const quantity = Number(splittedMove[1]);
    const from = Number(splittedMove[3]) - 1;
    const to = Number(splittedMove[5]) - 1;

    stacks[to].push(...stacks[from].splice(-quantity));
  }

  return stacks;
}

console.log(
  "part one",
  makeMovesForPartOne(moves, createStacks(stacksAsString))
    .map((stack) => stack.at(-1))
    .join("")
);

console.log(
  "part two",
  makeMovesForPartTwo(moves, createStacks(stacksAsString))
    .map((stack) => stack.at(-1))
    .join("")
);
