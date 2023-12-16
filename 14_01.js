const run = (input) => {
  const map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  let moveCount = 1;
  while (moveCount > 0) {
    moveCount = 0;

    for (let y = 1; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === "O") {
          if (map[y - 1][x] === ".") {
            map[y - 1][x] = "O";
            map[y][x] = ".";
            moveCount++;
          }
        }
      }
    }
  }

  const res = map.reduce((sum, line, index) => {
    const count = line.reduce((sum, cell) => {
      if (cell === "O") {
        return sum + 1;
      }
      return sum;
    }, 0);
    return sum + count * (map.length - index);
  }, 0);
  console.log(res);
};

run(`
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`);
