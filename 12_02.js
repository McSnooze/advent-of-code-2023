const run = (input) => {
  const lines = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [pattern, counts] = line.split(" ");

      let expandedPattern = pattern;
      let expandedCounts = counts;

      for (let i = 0; i < 4; i++) {
        expandedPattern += `?${pattern}`;
        expandedCounts += `,${counts}`;
      }

      return {
        pattern: expandedPattern,
        counts: expandedCounts.split(",").map((count) => parseInt(count)),
      };
    });

  const store = new Map();
  const countPossibilities = (pattern, counts) => {
    const key = JSON.stringify({ pattern, counts });
    if (store.has(key)) return store.get(key);

    if (pattern.length === 0 && counts.length === 0) return 1;

    if (counts.length === 0) {
      if (pattern.indexOf("#") >= 0) return 0;
      return 1;
    }

    if (
      pattern.length <
      counts.reduce((sum, run) => sum + run, 0) + counts.length - 1
    ) {
      return 0;
    }

    if (pattern[0] === ".") {
      return countPossibilities(pattern.slice(1), counts);
    }

    if (pattern[0] === "#") {
      const [run, ...remainingCounts] = counts;
      const nextPoint = pattern.indexOf(".");
      if ((nextPoint >= 0 && nextPoint < run) || pattern[run] === "#") return 0;
      return countPossibilities(pattern.slice(run + 1), remainingCounts);
    }

    const result =
      countPossibilities("#" + pattern.slice(1), counts) +
      countPossibilities("." + pattern.slice(1), counts);

    store.set(key, result);
    return result;
  };

  const res = lines.reduce((sum, line) => {
    return sum + countPossibilities(line.pattern, line.counts);
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
