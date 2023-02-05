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
const tail = [0, 0];

const positions = new Set();

for (const motion of motions) {
  for (let i = 0; i < motion.count; i++) {
    positions.add(tail.toString());
    move(head, motion.direction);

    if (!isTailTouchingHead()) {
      const [x, y] = getDistanceBetweenHeadAndTail();

      const hX = head[0];
      const tX = tail[0];
      const hY = head[1];
      const tY = tail[1];

      // console.log(head, tail, [x, y]);
      if ((x > 1 && y != 0) || (y > 1 && x != 0)) {
        // diagonal movement
        move(tail, hX > tX ? "R" : "L");
        move(tail, hY > tY ? "U" : "D");
      } else if (x > 1) {
        move(tail, hX > tX ? "R" : "L");
      } else if (y > 1) {
        move(tail, hY > tY ? "U" : "D");
      }

      positions.add(tail.toString());
    }
  }
}

function isTailTouchingHead() {
  const [x, y] = getDistanceBetweenHeadAndTail();

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

function getDistanceBetweenHeadAndTail() {
  const x = Math.abs(head[0] - tail[0]);
  const y = Math.abs(head[1] - tail[1]);

  return [x, y];
}

console.log(head, tail, positions.size);
