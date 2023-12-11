const expansionFactor = 100 - 1;

const run = (input) => {
  const map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  const emptyRows = map.reduce((emptyLines, line, index) => {
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

  const getEmtpyRowOffset = (sourceY, destY) => {
    if (sourceY < destY) {
      return emptyRows.filter((line) => line > sourceY && line <= destY).length;
    } else {
      return emptyRows.filter((line) => line >= destY && line < sourceY).length;
    }
  };

  const getEmtpyColumnOffset = (sourceX, destX) => {
    if (sourceX < destX) {
      return emptyColumns.filter(
        (column) => column > sourceX && column <= destX,
      ).length;
    } else {
      return emptyColumns.filter(
        (column) => column >= destX && column < sourceX,
      ).length;
    }
  };

  const galaxies = map.reduce((acc, line, y) => {
    line.forEach((char, x) => {
      if (char === "#") acc.push({ y, x });
    });
    return acc;
  }, []);

  const result = galaxies.reduce((sum, galA, index) => {
    for (let i = index + 1; i < galaxies.length; i++) {
      const galB = galaxies[i];
      const rowOffset = getEmtpyRowOffset(galA.y, galB.y);
      const columnOffset = getEmtpyColumnOffset(galA.x, galB.x);

      sum +=
        Math.abs(galA.x - galB.x) +
        columnOffset * expansionFactor +
        rowOffset * expansionFactor +
        Math.abs(galA.y - galB.y);
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
