const fs = require("fs");

const input = fs.readFileSync("./input_prod.txt");

const history = input.toString().split("\n");

const path = [];
const sizes = {};

for (const line of history) {
  const args = line.split(" ");

  if (args[1] == "cd") {
    if (args[2] == "..") {
      path.pop();
    } else {
      path.push(args[2]);
    }
  } else if (args[1] == "ls" || isNaN(Number(args[0]))) {
    continue;
  } else {
    const size = Number(args[0]);

    for (let n = path.length; n >= 0; n--) {
      const dir = path.slice(0, n).join("/");
      sizes[dir] = sizes[dir] ? sizes[dir] + size : size;
    }
  }
}

const dirsWithSizeAtMostHundredThousand = Object.values(sizes).reduce(
  (acc, size) => (size < 100000 ? acc + size : acc),
  0
);

console.log("part one", dirsWithSizeAtMostHundredThousand);
