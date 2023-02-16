const fs = require("fs");

const input = fs.readFileSync("./prod.txt").toString().split("\n\n");

function getMonkeys() {
  const monkeys = [];
  for (const i in input) {
    const monkey = input[i].split("\n");

    const items = monkey[1].split(":")[1];
    const operation = monkey[2].split("= ")[1];
    const denominator = Number(monkey[3].split(" ").at(-1));

    const test = (result) => {
      if (result % denominator === 0) {
        return Number(monkey[4].at(-1));
      } else {
        return Number(monkey[5].at(-1));
      }
    };

    // old is used in "operation"
    const result = (old, worryFactor, part) => {
      if (part === 1) return Math.floor(eval(operation) / worryFactor);
      else return Math.floor(eval(operation) % worryFactor);
    };

    monkeys[i] = {
      items: items.split(",").map(Number),
      test,
      result,
      denominator,
      inspections: 0,
    };
  }

  return monkeys;
}

function play(monkeys, rounds, worryFactor, part) {
  for (let round = 0; round < rounds; round++) {
    for (let monkey = 0; monkey < monkeys.length; monkey++) {
      const m = monkeys[monkey];
      for (const item of m.items) {
        const result = m.result(item, worryFactor, part);
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
  play(getMonkeys(), 20, 3, 1, 1)
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, inspection) => acc * inspection)
);

const lcm = getMonkeys()
  .map((m) => m.denominator)
  .reduce((acc, d) => acc * d);

console.log(
  "monkey business, part two",
  play(getMonkeys(), 10000, lcm)
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, inspection) => acc * inspection)
);
