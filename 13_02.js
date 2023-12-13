const run = (input) => {
  const patterns = input.split("\n").reduce((patterns, line, index, lines) => {
    if ((line.length === 0 || index === 0) && index !== lines.length - 1) {
      patterns.push([]);
    }

    if (line.length > 0) {
      patterns[patterns.length - 1].push(line.split(""));
    }
    return patterns;
  }, []);

  const getEqualRows = (pattern) => {
    return pattern.reduce((rows, row, y) => {
      const sum = row.reduce((sum, cell, x) => {
        if (cell !== pattern[y + 1]?.[x]) {
          sum++;
        }
        return sum;
      }, 0);
      if (sum <= 1) {
        rows.push({ rowA: y, rowB: y + 1, sum });
      }
      return rows;
    }, []);
  };

  const isReflection = (pattern, rowA, rowB) => {
    let sum = 0;
    while (rowA >= 0) {
      const row = pattern[rowA];
      const reflectionRow = pattern[rowB];

      if (!reflectionRow) break;

      sum += row.reduce((sum, cell, index) => {
        if (cell !== reflectionRow[index]) sum++;
        return sum;
      }, 0);

      if (sum <= 1) {
        rowA--;
        rowB++;
      } else {
        break;
      }
    }

    return sum;
  };

  const searchReflection = (pattern) => {
    const rPattern = pattern.reduce((rPattern, line) => {
      line.forEach((cell, index) => {
        rPattern[index] = rPattern[index] || [];
        rPattern[index].push(cell);
      });
      return rPattern;
    }, []);

    const rows = getEqualRows(pattern).filter(
      ({ rowA, rowB }) => isReflection(pattern, rowA, rowB) === 1,
    );
    const columns = getEqualRows(rPattern).filter(
      ({ rowA, rowB }) => isReflection(rPattern, rowA, rowB) === 1,
    );

    return (
      rows.reduce((sum, { rowB }) => sum + rowB * 100, 0) +
      columns.reduce((sum, { rowB }) => sum + rowB, 0)
    );
  };

  const res = patterns.reduce(
    (sum, pattern) => sum + searchReflection(pattern),
    0,
  );

  console.log(res);
};

run(`
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`);
