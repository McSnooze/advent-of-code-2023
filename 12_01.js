const run = (input) => {
  const possibleChars = ["#", "."];
  const lines = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [pattern, counts] = line.split(" ");
      return {
        pattern,
        unknown: pattern.split("?").length - 1,
        counts: counts.split(",").map((count) => parseInt(count)),
      };
    });

  const choose = (arr, k, prefix = []) => {
    if (k === 0) return [prefix];
    return arr.flatMap((v) => choose(arr, k - 1, [...prefix, v]));
  };

  const res = lines.reduce((sum, line) => {
    choose(possibleChars, line.unknown).forEach((chars) => {
      const pattern = chars.reduce(
        (pattern, char) => pattern.replace("?", char),
        line.pattern,
      );

      const groups = pattern.split(".").filter((x) => x.length > 0);

      if (groups.length === line.counts.length) {
        const isValid = groups.every(
          (group, i) => group.length === line.counts[i],
        );
        if (isValid) {
          sum++;
        }
      }
    });
    return sum;
  }, 0);

  console.log(res);
};

run(`
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`);
