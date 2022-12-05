const assert = require("assert").strict;
const fs = require("fs");

// constraints about input
const NumberOfElves = 235;
const ElfCarryingMostCaloriesIndex = "217";
const ElfCarryingMostCaloriesCount = 72602;

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const elves = input.split("\n\n");

assert.equal(elves.length, NumberOfElves, "incorrect number of elves");

const elfCarryingMostCalories = {
  index: 0,
  calories: 0,
};

for (const elf in elves) {
  const calories = elves[elf].split("\n").map(Number);
  const sum = calories.reduce((sum, calories) => (sum += calories), 0);

  if (sum > elfCarryingMostCalories.calories) {
    elfCarryingMostCalories.calories = sum;
    elfCarryingMostCalories.index = elf;
  }
}

assert.deepStrictEqual(elfCarryingMostCalories, {
  index: ElfCarryingMostCaloriesIndex,
  calories: ElfCarryingMostCaloriesCount,
});
