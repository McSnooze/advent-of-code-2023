const run = (input) => {
  const regex = /\d+/gm;

  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const result = lines.reduce((sum, line, lineIndex) => {
    let m;
    while ((m = regex.exec(line)) !== null) {
      let neighbors = "";
      let startOffset = 0;
      let endOffset = 0;

      if (m.index !== 0) {
        neighbors += line[m.index - 1];
        startOffset = -1;
      }

      if (regex.lastIndex < line.length) {
        neighbors += line[regex.lastIndex];
        endOffset = 1;
      }

      if (lineIndex !== 0) {
        neighbors += lines[lineIndex - 1].substring(
          m.index + startOffset,
          regex.lastIndex + endOffset,
        );
      }

      if (lineIndex < lines.length - 1) {
        neighbors += lines[lineIndex + 1].substring(
          m.index + startOffset,
          regex.lastIndex + endOffset,
        );
      }

      if (neighbors.replaceAll(".", "").length) {
        sum += parseInt(m[0]);
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
