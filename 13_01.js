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
      if (
        row.reduce(
          (isEquals, cell, x) => isEquals && cell === pattern[y + 1]?.[x],
          true,
        )
      ) {
        rows.push({ rowA: y, rowB: y + 1 });
      }
      return rows;
    }, []);
  };

  const isReflection = (pattern, rowA, rowB) => {
    while (rowA >= 0) {
      const row = pattern[rowA];
      const reflectionRow = pattern[rowB];

      if (!reflectionRow) break;

      if (
        row.reduce(
          (isEquals, cell, index) => isEquals && cell === reflectionRow[index],
          true,
        )
      ) {
        rowA--;
        rowB++;
      } else {
        return false;
      }
    }

    return true;
  };

  const searchReflection = (pattern) => {
    const rPattern = pattern.reduce((rPattern, line) => {
      line.forEach((cell, index) => {
        rPattern[index] = rPattern[index] || [];
        rPattern[index].push(cell);
      });
      return rPattern;
    }, []);

    const rows = getEqualRows(pattern).filter(({ rowA, rowB }) =>
      isReflection(pattern, rowA, rowB),
    );
    const columns = getEqualRows(rPattern).filter(({ rowA, rowB }) =>
      isReflection(rPattern, rowA, rowB),
    );

    return (
      rows.reduce((sum, { rowA, rowB }) => sum + rowB * 100, 0) +
      columns.reduce((sum, { rowA, rowB }) => sum + rowB, 0)
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
