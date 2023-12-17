const run = (input) => {
  const graph = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

  const endX = graph[0].length - 1;
  const endY = graph.length - 1;

  const getNeighbors = (x, y, dir, steps) => {
    const neighbors = [];

    if (x > 0 && dir !== "R")
      neighbors.push({
        x: x - 1,
        y,
        dir: "L",
        steps: dir === "L" ? steps + 1 : 1,
      });

    if (y > 0 && dir !== "D")
      neighbors.push({
        x,
        y: y - 1,
        dir: "U",
        steps: dir === "U" ? steps + 1 : 1,
      });

    if (x < endX && dir !== "L")
      neighbors.push({
        x: x + 1,
        y,
        dir: "R",
        steps: dir === "R" ? steps + 1 : 1,
      });

    if (y < endY && dir !== "U")
      neighbors.push({
        x,
        y: y + 1,
        dir: "D",
        steps: dir === "D" ? steps + 1 : 1,
      });

    return neighbors.filter(
      ({ steps: nextSteps, dir: nextDir }) =>
        (nextSteps <= 4 && dir === nextDir) || (steps >= 4 && nextSteps <= 10),
    );
  };

  const queue = [
    { y: 0, x: 0, distance: 0, dir: "R", steps: 0, heuristic: 0 },
    { y: 0, x: 0, distance: 0, dir: "D", steps: 0, heuristic: 0 },
  ];

  const visited = new Set();

  while (queue.length) {
    const current = queue.sort((a, b) => a.distance - b.distance).shift();
    if (
      current.x === endX &&
      current.y === endY &&
      current.steps >= 4 &&
      current.steps <= 10
    ) {
      console.log(current);
      break;
    }

    getNeighbors(current.x, current.y, current.dir, current.steps).forEach(
      ({ x, y, dir, steps }) => {
        const distance = graph[y][x] + current.distance;
        const key = `${y};${x};${dir};${steps}`;

        if (!visited.has(key)) {
          visited.add(key);
          queue.push({
            x,
            y,
            distance,
            dir,
            steps,
          });
        }
      },
    );
  }
};

run(`
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`);
