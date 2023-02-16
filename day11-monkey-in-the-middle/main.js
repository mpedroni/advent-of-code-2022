const fs = require("fs");

const input = fs.readFileSync("./prod.txt").toString().split("\n\n");

function getMonkeys() {
  const monkeys = [];
  for (const i in input) {
    const monkey = input[i].split("\n");

    const items = monkey[1].split(":")[1];
    const operation = monkey[2].split("= ")[1];

    const test = (result) => {
      const dividend = Number(monkey[3].split(" ").at(-1));

      if (result % dividend === 0) {
        return Number(monkey[4].at(-1));
      } else {
        return Number(monkey[5].at(-1));
      }
    };

    const result = (old, worryDivisor = 1) => {
      return Math.floor(eval(operation) / worryDivisor);
    };

    monkeys[i] = {
      items: items.split(",").map(Number),
      test,
      result,
      inspections: 0,
    };
  }

  return monkeys;
}

const ROUNDS = 20;

function play(monkeys, rounds, worryDivisor) {
  for (let round = 0; round < ROUNDS; round++) {
    for (let monkey = 0; monkey < monkeys.length; monkey++) {
      const m = monkeys[monkey];
      for (const item of m.items) {
        const result = m.result(item, 3);
        monkeys[m.test(result)].items.push(result);
        m.inspections++;
      }
      m.items = [];
    }
  }

  return monkeys;
}

console.log(
  "monkey business, part one",
  play(getMonkeys(), 20, 3)
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, inspection) => acc * inspection)
);
