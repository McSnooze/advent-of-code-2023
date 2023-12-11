const run = (input) => {
  const map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  const emptyLines = map.reduce((emptyLines, line, index) => {
    if (line.every((char) => char === ".")) {
      emptyLines.push(index);
    }
    return emptyLines;
  }, []);

  const emptyColumns = map[0].reduce((acc, _, index) => {
    if (map.every((line) => line[index] === ".")) {
      acc.push(index);
    }
    return acc;
  }, []);

  emptyLines.forEach((line, index) => {
    map.splice(line + index, 0, [...map[line + index]]);
  });

  emptyColumns.forEach((column, index) => {
    map.forEach((line) => {
      line.splice(column + index, 0, line[column + index]);
    });
  });

  const galaxies = map.reduce((acc, line, y) => {
    line.forEach((char, x) => {
      if (char === "#") acc.push({ y, x });
    });
    return acc;
  }, []);

  const result = galaxies.reduce((sum, galA, index) => {
    for (let i = index + 1; i < galaxies.length; i++) {
      const galB = galaxies[i];
      sum += Math.abs(galA.x - galB.x) + Math.abs(galA.y - galB.y);
    }
    return sum;
  }, 0);

  console.log(result);
};

run(`
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`);
