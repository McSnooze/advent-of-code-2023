const run = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const digitRegex = /\d+/gm;
  const map = lines.reduce((map, line, lineIndex) => {
    map[lineIndex] = map[lineIndex] ?? {};
    let m;
    while ((m = digitRegex.exec(line)) !== null) {
      const num = { num: parseInt(m[0]), id: lineIndex + "_" + m.index };
      for (let i = m.index; i < m.index + m[0].length; i++) {
        map[lineIndex][i] = num;
      }
    }
    return map;
  }, {});

  const gearRegex = /\*/gm;
  const result = lines.reduce((sum, line, lineIndex) => {
    let m;
    while ((m = gearRegex.exec(line)) !== null) {
      const yStart = Math.max(lineIndex - 1, 0);
      const yEnd = Math.min(lineIndex + 1, lines.length - 1);
      const xStart = Math.max(m.index - 1, 0);
      const xEnd = Math.min(m.index + 1, line.length - 1);

      const mapDigits = {};
      for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
          if (map[y]?.[x]) {
            mapDigits[map[y][x].id] = map[y][x].num;
          }
        }
      }

      const digits = Object.values(mapDigits);

      if (digits.length === 2) {
        sum += digits[0] * digits[1];
      }
    }
    return sum;
  }, 0);

  console.log(result);
};

run(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`);
