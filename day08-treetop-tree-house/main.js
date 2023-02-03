const fs = require("fs");

const input = fs.readFileSync("./input_prod.txt");
const gridTree = input
  .toString()
  .split("\n")
  .map((r) => r.split("").map(Number));

function getTreesData(grid) {
  const rows = grid.length;
  const columns = grid[0].length;

  const trees = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const currentTree = grid[i][j];

      function up() {
        const data = {
          visible: true,
          score: 0,
        };

        for (let k = i - 1; k >= 0; k--) {
          data.score++;
          if (grid[k][j] >= currentTree) {
            data.visible = false;
            break;
          }
        }

        return data;
      }

      function bottom() {
        const data = {
          visible: true,
          score: 0,
        };

        for (let k = i + 1; k < rows; k++) {
          data.score++;
          if (grid[k][j] >= currentTree) {
            data.visible = false;
            break;
          }
        }

        return data;
      }

      function left() {
        const data = {
          visible: true,
          score: 0,
        };

        for (let k = j - 1; k >= 0; k--) {
          data.score++;
          if (grid[i][k] >= currentTree) {
            data.visible = false;
            break;
          }
        }

        return data;
      }

      function right() {
        const data = {
          visible: true,
          score: 0,
        };

        for (let k = j + 1; k < columns; k++) {
          data.score++;
          if (grid[i][k] >= currentTree) {
            data.visible = false;
            break;
          }
        }

        return data;
      }

      const directions = [up(), bottom(), left(), right()];

      trees.push({
        visible: directions.some((d) => d.visible),
        score: directions.reduce((acc, d) => acc * d.score, 1),
      });
    }
  }

  return trees;
}

const trees = getTreesData(gridTree);

console.log("part one -> visible", trees.filter((t) => t.visible).length);
console.log(
  "part one -> highest scenic score",
  Math.max(...trees.map((t) => t.score))
);
