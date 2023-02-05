const fs = require("fs");

// const input = fs.readFileSync("./input_test.txt");
const input = fs.readFileSync("./input_prod.txt");

const motions = input
  .toString()
  .split("\n")
  .map((motion) => motion.split(" "))
  .map(([direction, count]) => ({ direction, count: Number(count) }));

// [x, y]
const head = [0, 0];
const knobs = [];

for (let knob = 0; knob < 10; knob++) {
  knobs.push([0, 0]);
}

const positions = [];

for (let knob = 0; knob < 10; knob++) {
  positions.push(new Set());
}

for (const motion of motions) {
  for (let i = 0; i < motion.count; i++) {
    move(head, motion.direction);
    for (let knob = 0; knob < knobs.length; knob++) {
      const tail = knobs[knob];
      const h = knob == 0 ? head : knobs[knob - 1];

      positions[knob].add(tail.toString());

      if (!isTailTouchingHead(tail, h)) {
        const [x, y] = getDistanceBetweenHeadAndTail(tail, h);

        const hX = h[0];
        const tX = tail[0];
        const hY = h[1];
        const tY = tail[1];

        if ((x > 1 && y != 0) || (y > 1 && x != 0)) {
          // diagonal movement
          move(tail, hX > tX ? "R" : "L");
          move(tail, hY > tY ? "U" : "D");
        } else if (x > 1) {
          move(tail, hX > tX ? "R" : "L");
        } else if (y > 1) {
          move(tail, hY > tY ? "U" : "D");
        }

        positions[knob].add(tail.toString());
      }
    }
  }
}

function isTailTouchingHead(tail, head) {
  const [x, y] = getDistanceBetweenHeadAndTail(tail, head);

  return x <= 1 && y <= 1;
}

function move(el, direction) {
  switch (direction) {
    case "R":
      el[0] += 1;
      break;

    case "L":
      el[0] -= 1;
      break;
    case "U":
      el[1] += 1;
      break;

    case "D":
      el[1] -= 1;
      break;

    default:
      throw new Error("invalid direction");
  }
}

function getDistanceBetweenHeadAndTail(tail, head) {
  const x = Math.abs(head[0] - tail[0]);
  const y = Math.abs(head[1] - tail[1]);

  return [x, y];
}

console.log("part one", head, knobs[0], positions[0].size);
console.log("part two", head, knobs[8], positions[8].size);
