const run = (input) => {
  let map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  const store = new Map();

  const a = [];
  for (let cycle = 0; cycle < 1000000000; cycle++) {
    const startJson = JSON.stringify(map);

    if (store.has(startJson)) {
      const next = store.get(startJson);

      if (a.indexOf(next) === -1) {
        a.push(next);
      } else {
        map = JSON.parse(a[(1000000000 - cycle - 1) % a.length]);
        break;
      }

      map = JSON.parse(next);
      continue;
    }

    for (let i = 0; i < 4; i++) {
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

      map = map.reduce((map, line) => {
        line.forEach((cell, index) => {
          map[index] = map[index] || [];
          map[index].unshift(cell);
        });
        return map;
      }, []);
    }

    store.set(startJson, JSON.stringify(map));
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
.O.....##O.O#..O#....##O#.#.#..##O#..O.....#.OO..O.O.O.O...O....#O...OO....##.O..OO.O......O..O.....
....O..#O....#...#OO..#..#..O.....#O......O.O.#..OO..O....#..#.OO....##O...O..##...#.O...O.#...#.O#.
.O.O#.O...O...O....O...O#....#.#O#...O...#.#..........O#...O#O..O..#.OOO..O.O.....O#.........#O...O.
.O....O.OO.#.....#.#O......##O..O.O.##.#..O##O.O.#OO....O.O..O#.OOO..O..#..##.#...#.O.#O.#.#.....O..
..O......O..O.O.#.OO.OO...#.O....#...#O..OO.#.O......O....O.O.....O.#.OO..O.OOO.......O.O...##O...O#
.O.O.........#.O#.#OO##..#OO..OOO#....#....O.O..#.O......#.OO..#..O.O..O.O..#....#.O#..OO###.....#..
.O..#.#.OO.#...........#..O#....O..O.O#.......#.OO.#OO....O.#O.#.....#.OO.#...#..O..O##.O.O##..#.#.O
..O..#...#..OO.#O.#.O.O#O...O.O..O..O#..#..#..O..........O.O#.....O...........O.###..#.#..O#.#.O...#
#..O...#.O..O.O......#O.O##...##...OOO....#.O.O#OO.##...OO.OOO..#.O..##.....O..O.O.#O.O..#.O#O...O.#
OO....#.#...O...O.#...##O..###O.......OO...#.#...O.#..#.O......O....#.O#..#O..O...OO...#..O#..O....O
O#..#O...##O.....#.O.#.O...##......#...#OO#...O.......#.#.OO#.#..#..O#OO...O.......O.#...#.##....O..
#............O#....##.O.O..#O.#.OO.O...OOOO#.......O#O..O.......O#OO#...O.O....#.....#O.#.#..#.OO.O#
#O.O.....O....#O..OO.#O.#....#.##O.O...........O.##.#O##O...O#..O.O.O#......O...O.#....#OO#.#..O..##
.O..#O.O.#....O.........#.....OOO.......O.#O.....#OOOO#.O##O.#.O...O..#OO...O.....O..#.#......OO.O.#
O..O...O......O.O...#..#...#.OO.#.OO.O..O...#...#...O.###....#O#.O..O..#O..#.O.##.......O#..#O......
#..O...#...#OOO.#.###.#....#..O.O.#.#......OO.#.#...#....#.OO.O..#.O...#.#.....O.#O.O.#O..O....O.O..
OOO.#...##.OO.O....#.O.###.#.....O.OO#..#....OO...O#.#.O..#O.#..#.O..O....#O.OO#...O..#.....#O...O.O
.#.#...........#.............O.#..##.#O.#.O......#..O..OO.##O.O##.....#..O.O..O.OO..OO.#O.O.##O.O...
..O......O..##O.O...##......##OO..#O.#..#..OO...#...O.O..O..O.O.O##.#O.O#.#.O#....##.O.....O..#.O...
.#...#O.#.#....O..O..O#.O.....O..O.#.O....O.O...#.O#......O..O.O...#.#...O..##O...#.#...O.##..#..O#.
.O#..O.#....#.OO.#.....#O....O#O.#..#.O.....#......#O....O.........#.#O.OOOO#O.OOOO.#.....O.#.O..#OO
#..#.....O.....#.....##.O....##.O.O#OOO..O....O...#....O.O.....#.O#.O....O.O....#..O....O###.#..O#O.
...O...#..#O.O.O.......O.....O#O....#.#OO#......#..OO.....#.#...#...OO.O#O#O.#.#O....#..O....O...OO.
..#.##.#.#..............#O...#O#..##O.#.....O.#.#......O.....O#..O.O.O.#OOO####O.....O..##.O.OO.#..#
O...O#.O....#.O...........#......##.O.O#.....#.O..OO#...O#.##O..##.....#.O.O.....O#.#O.O..O...OO#...
OO.........##....##.O.O.OO.....O...........O.....O..#..#.OO........#O...OO.....#.O.........#........
#..#.##O#.O#O..#..O...#.#.O.OO...##O..#..O.O........#.#O#..#..O..#.O.....O...O..O.O....#...O#....#..
O.#.......O..O#O...OOOO#OO..O..#....#O..#...OO..#....O......#..#....O.O#.#....O.OO..O....O....OO..#.
O.OO..........#..O.#O#.#.#O...##..#..O##..##O#.OO......O..#.O.O.O.OO....#.....OOO#.O.#.O.#O##.#OO.#O
#..O....##...#.O.OO.O.O......#.OO...#......O........OO.#O..#.......OO..O..O...#.O......O.#O#O#...#OO
#...#..#OOOO#.#O#O.O#.O.#.###...O..#.....O..............O.....O.#.O....O.O....#...........O...O#.O..
.#O.O.OOO.....O...O...#.........#..O..O.#..#.O#....O#O..OO.........OO#.........#..OO.O.......#...O..
..#...O...#O...O..#.....O..O.#.......O...O.O.O.....O......O...#.....##.O.O#..O.#.O..#.O..O..OO......
.O.O..O..#O..O#OO#OO.#....O...#.O#.O.#...###........O.....O..O.OOO.O...#....O.O....O..OO.###...O...O
.#.....O..OOOO..#...#.#.O......O..O..#.##.#...O#..O.#.#.O#.....##...##O.......##..O.O.O.......#..OO#
...O...O...O..O...#..O#....O....#......O..OO#...O...#.#O.##.#..O..#.##O..#.#...O.....#.#O.O..O.O##..
.#OO#.....#O...O.#.OO......OO...O..O..O...#............#.OO##..OO..O.O......O..O...O...O...O...O....
...O....O..#.O.O###..##.O..O.O.#...#.OO.O..O.O.O.O.#.O..#.O##.......O..#......O.O..O.OOO..##O....#..
O...O.#..........O..OO.O#...#OO.OO..#O#.......O..#....O.......O.#OO.O.O.O.O##.OO..##...O#..OO#..#.#.
.O....#.#O............OOO.......#.O..#.#...#O......#....#.##..O.#.##OO..OO.#.#......O.O.....#.OO...O
..O...O#...O..O..#..#O..O#..O#..O.OO..O#.#...O####..O...O#..##......O#....O....O..O...O........O..O.
O.O.#..#.#..##..#.#....#..#..#.###.O#.O....OO...#....O#.....#.........#.###..#.#OO..#O...O...O.#....
..OO.#.O.....O.O..#.......O...O..##.#.#O..#....#OO.O....O......#.OO#....O..#O.O...#.OO#O.#....O..O.#
#...O#.O...O..O..O.O#...O.O.......OO....OO..O#.O..............O..O#.#...O#....OO..OO..O....#.#O.O..#
O.O.##..O#...#O......O...O...OOO.....#....O#...O#.#.#........O..##..##.O..##O.O..O..#............O.#
.....#....O..O.O...####...#.O.#..#.#..#....#...#.OO.#..##...OOO.#..#......O.OOO.....#O#.......OO....
...#.O#.O...#.OOO#.......OO.#..O..O##.#OO.O.#.O.O.O#.....#.O.........O...O....#.O#....#.#O..O..#..#.
...#..O......O..#.O...#.....#....O.....OOO..O..O##O#...O...O.#...O....#OOO##..........O....#O.......
...O.O.#.#...O.O#O#.#O#O....#....O..O....#.O.O#.....#....O..O..............O...##O.O....O..#....#..O
O.....O..#O....O..O##O..#..#.O.OO..#...##........#.#.#.O..###...#O.##..##..#O..O.OOO...O.O.....O....
..##.......#...O.O.O#O.#...O..OO#OOO.#..O....#...O..#....#.....OO..OO.#....O.....#.##...O.#..O...#O#
O##....O.O..##OO.#.#.O#..##............OO.O.O.#.....#..OO...#...O..##O..........#.......O..OOO...O.#
#OO.......O.O..O...#...O#.#...O..O.....O..OO.O...#OO...O....O...O.O...O....O......#.#.O.OO.....#....
...#..#OO..#..O.OO.#..#.....O..#O..#....#..#...O...O...OO..O#..O...O.........#...OO.O.#OO#.#.O..OO.#
..O#.O.O.#.#.....#...O..O#O..#..#..#.#...O..O.#.O.OO..OOO.#..OO.#.#.....OO...OO#O#.#..........O.##O.
...O#..O..O..O..#OO.###..O.........O#...OO.....O..O#....#O.O.O..O#.#...O#OO.O..#..O.O.O...O.OO.....O
.....O.#.O..O...##..#.O#O.#.......#O.OO#...O...##.OO#...OOO....#..#..#O...O.O#O.O..O.#OO...#..#.O#.O
....#...#O.O...##.#...#...##.O....#.#.O.O..##.O...#O...O#OO#..#.O.....#O#O.O.O#O...#.#.O.O..#...O..O
.O...O....O.....#.#O.#.##.##..O#..OO#O..#..O.#..O..O#....O#..#..OOOO.#.O..OO.O.##......#...#......#O
O....O.O...O#.OOO.#..O.......#..#....O#O........###..O..#.O.O.O.......#....O.O.O.##.O..#..O....O..#.
..O..OO...................OO...#........#.#...O..#.O.......#...O.......O..O#...O.#.O#....O#.O...#...
.O..#......O#O#..#......OOO........OOO........O#....O#.OO.#.......O#.OO.......##.....OO.O......O.O..
.#O..#O#O#..###.............##....#..O...#.O#O..O###.O..##..#..#OOO#.#...O.#.O.....O.#...........#..
.....O..O..OO.O.......OO.O.....#..##.##OOO#.#O..O.#....OO#OO...#...##...#.O...O....OO.O.##..O#..###.
OOO#.....#..#.O......O...O...#O..#....O.OO.#...O..........O.....O..O.....OO...#..O..O.#OO.O..OO.#...
O.OO.#...#.#...#...OOO.......O#....O....#....O.#...O.#.##.#OO.O..##......O.##OO#.......#.O...O.OOO..
.....#.........#.............O##.##..O..OOOO....#....O..#..O..#...O...OO.#O....#O.....O#O#......#..#
.#.O#O#.O#OOO.......O.O......O.#.#....#O..O..#..#.......#O.O#.....###..O.#.O......#.#.O#......#O....
..#O#.#.O.#O.OO.#O.O####.#..##.O.....#...#O#..#O#O#....O....OO#....O#.O...O.........#O##.O.O....#...
.OO..#O..O#.....OO....#O.O.....OO#...O.....OO.......#..O#...OO.#.O..O.O.#O.OO#.#O.....O...O..O.O.O..
..##OOO.O.....##..O.#.#.##..#...##.O..O....OO...##O..#.OO....#.O#.......O..O..O.#.#.#....O.O.O#O..O.
O#.#..#.##.O..O.O.....OO#....OOO.O.O.OO.....O...###.......#O...#....#.OOO.#O..OO...O..#..O.O.O.....#
OO#.....OO.O.#OO...#O...O.....O..O.#....O............#O.O.O....#.......O.O..OOO...#...#...#.........
......#..O.#.....O....OO..##..##........O.#O..........#OOOO......O......O.O##..O#O#O.O..#.#O.....#..
..O..OOO.........#.O..O..#..O..O###..O..##...O..#.O.O..#.............O.....##O.OO..#.#..O.##O.##O.O.
..#...#..O........O.O.#..##.O.#O......O.O.#OO..O..#..#O.O.....#.##..##..#......OO..#.O...#..#.O.O#..
..#...#..O......#......#..O.##.#....OO..#...#.....O.O.O..#.##...##..OO......#.OO....O..O..O.O.#.O...
......O...#O......O.O..OO.O...#O..##..#...#..#....##........##O.O......O.O...#O....OO...............
.....O..#.##....OO.O...O..O..O.O...#....O.#.O....#.#..OO......OO#...#.###..#O...O....O..##O.#..OO.O.
...OO...#...##.##.#..#...#.O..#OOO.....#.#..O...O.##O.#.#..#O.#O.#......O#......OOO.O#.....#......O.
OOO.O.O...###...#...#.#...OOO.O...O..O...#....O.OO...O..##..O........#.O.#....#......##.#O..#.#O#O..
....OO#.#.....O..O..#......OO.........O....O.....O..O#.#..##O.....#.#.#....#..O#..#OO.O...#.OO##O.OO
O.O..#..O.......O.O....O..OO.O...OO.O.......O###OOO##.O...O...#O#OO......O..O..O...#....##...O..O...
O#.O#.....O...O.O...#.##.#.......###....O.O.##......O....O..#O..#O#.O..##OO..O.###..O.OO#...#....##O
O..O..O............OO.....O.O..O...#............#O..O..O#...O..O.O##........#.#.....#....O#O.......#
............O....O#.OO...##..OO#O...#.....#OO..O#.......##O.O#...OO....#..O.....#..O...O.OO#O.O...O.
.#...#...OO...###.OO.OO....#..O...#...O.O...O....#........O.#..O#.OO..#....#O..O##.......O...#..##..
#.O.O#.O..#....#...#O#...OO..#...O.O#.OO.##...............O.#......O.....#..O..#..O..#O..O..##.##.O.
O..##.....OO.O##.O..#.O........OOOO...#..##.........#.#..O.O.OO#..O##O#....O.O#.....O.....O#..#...##
O......#.O...#...O#.#...O#........O..#....#..#.O.......O.......#.....#..O......#..O#..O#...#.#O.O...
..........OO###.#.O.O..#...##..##.#.........O#O..O.#O.......O..O#...#..O.O..#.O....#..O..OO.O......O
.OOOO..O....O.....#.....#.#.O.#O.#.O....##...O.O#O.OO.....O.O#.#...#..#.#O.O.##...O...OO..O....OO#O.
O...###O...###O...#...#O...#....#..O#..#O#....O.##..#.....#.#OO#.O...O.##O#...O.....#.......#.O.....
O...#.OO.O##.O.....#.....O..O...#.O...O.#.....#.O....O.#...#OOOO..#.#O...O...##..##..........O....O#
..OOO..O..#...OO....##....O....O...O....#..O..##.O...O.O.....#.#.O.#.#..O#O.#.....#.O.#.#.....O.O#..
#....O.OO##OO....#...#.....#....###.#..O..O.O...#.....#..O.........#O#...#............OO....#.OO..O.
.O.O#.#O#.O..O........#..O#...O.#..##O....O#O..O#O...#.O...#.....#.#......#......O...#...#..O..#....
.#..O..O..#O..OO....OO#.#...O.....O....#....O..O#...OOOO#.#...#..##.O.....O.....#..O.O..#...OO#OO..#
....#O.##.O.....#..O..OOO.#.O..#.O.....#O.O.##..#OO.......O..##...O#.#.OO..O..#...#......#...O.O....
#......#.#.....#O...O..#..#..###..O...##.OOO.O...#.O..#..##.O...#..O..O....O.......#OO.....#....OO..
`);
