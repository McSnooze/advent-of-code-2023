const run = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const seeds = lines
    .shift()
    .split(" ")
    .map((v) => parseInt(v))
    .filter((v) => !isNaN(v));

  const maps = {};
  let currentMap = null;

  lines.forEach((line) => {
    const mapDescription = line.match(/(\w+)-to-(\w+) map:/);
    if (mapDescription) {
      currentMap = {
        from: mapDescription[1],
        to: mapDescription[2],
        map: [],
      };
      maps[currentMap.from] = currentMap;
    } else {
      const [destination, source, length] = line
        .split(" ")
        .map((v) => parseInt(v));

      currentMap.map.push({
        destination,
        source,
        length,
      });
    }
  });

  const reduceSeed = (position, from) => {
    const map = maps[from];

    if (!map) {
      return position;
    }

    const nextPosition = map.map.reduce((nextPosition, item) => {
      if (position >= item.source && position < item.source + item.length) {
        return item.destination + position - item.source;
      }
      return nextPosition;
    }, position);

    return reduceSeed(nextPosition, map.to);
  };

  let result = 0;

  console.log(seeds.length);
  for (let i = 0; i < seeds.length; i = i + 2) {
    const from = seeds[i];
    const to = seeds[i + 1];
    console.log("Start", i, from, to);
    for (let j = 0; j < to; j++) {
      if (result === 0) result = reduceSeed(from + j, "seed");
      result = Math.min(result, reduceSeed(from + j, "seed"));
    }
    console.log("Done", i);
  }

  console.log(result);
};

run(`
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`);
