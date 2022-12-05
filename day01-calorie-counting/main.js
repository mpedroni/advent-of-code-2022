const assert = require("assert").strict;
const fs = require("fs");

// https://adventofcode.com/2022/day/1

// found results
const NumberOfElves = 235;
const GreaterCaloriesCarried = 72602;
const TopThreeElvesCarryingMostCaloriesTotal = 207410;

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const elves = input.split("\n\n").map((caloriesAsString) => {
  const caloriesAsNumber = caloriesAsString.split("\n").map(Number);
  const caloriesSum = caloriesAsNumber.reduce(
    (sum, calories) => (sum += calories),
    0
  );

  return caloriesSum;
});

assert.equal(elves.length, NumberOfElves);

elves.sort((a, b) => b - a);

assert.equal(elves[0], GreaterCaloriesCarried);

const topThreeElvesCarryingMostCalories = elves.slice(0, 3);
const topThreeElvesCarryingMostCaloriesTotal =
  topThreeElvesCarryingMostCalories.reduce(
    (sum, calories) => (sum += calories),
    0
  );

assert.equal(
  topThreeElvesCarryingMostCaloriesTotal,
  TopThreeElvesCarryingMostCaloriesTotal
);
