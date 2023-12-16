const run = (input) => {
  const map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  const getNext = ({ x, y, direction }) => {
    switch (direction) {
      case "right": {
        const nextPosition = { x: x + 1, y };
        const nextToken = map[nextPosition.y]?.[nextPosition.x];

        if (nextToken === "|") {
          return [
            { ...nextPosition, direction: "up" },
            { ...nextPosition, direction: "down" },
          ];
        }

        if (nextToken === "/") {
          return [{ ...nextPosition, direction: "up" }];
        }

        if (nextToken === "\\") {
          return [{ ...nextPosition, direction: "down" }];
        }

        if (nextToken) {
          return [{ ...nextPosition, direction }];
        }
        break;
      }
      case "left": {
        const nextPosition = { x: x - 1, y };
        const nextToken = map[nextPosition.y]?.[nextPosition.x];

        if (nextToken === "|") {
          return [
            { ...nextPosition, direction: "up" },
            { ...nextPosition, direction: "down" },
          ];
        }

        if (nextToken === "/") {
          return [{ ...nextPosition, direction: "down" }];
        }

        if (nextToken === "\\") {
          return [{ ...nextPosition, direction: "up" }];
        }

        if (nextToken) {
          return [{ ...nextPosition, direction }];
        }
        break;
      }
      case "up": {
        const nextPosition = { x, y: y - 1 };
        const nextToken = map[nextPosition.y]?.[nextPosition.x];

        if (nextToken === "-") {
          return [
            { ...nextPosition, direction: "left" },
            { ...nextPosition, direction: "right" },
          ];
        }

        if (nextToken === "/") {
          return [{ ...nextPosition, direction: "right" }];
        }

        if (nextToken === "\\") {
          return [{ ...nextPosition, direction: "left" }];
        }

        if (nextToken) {
          return [{ ...nextPosition, direction }];
        }
        break;
      }
      case "down": {
        const nextPosition = { x, y: y + 1 };
        const nextToken = map[nextPosition.y]?.[nextPosition.x];

        if (nextToken === "-") {
          return [
            { ...nextPosition, direction: "left" },
            { ...nextPosition, direction: "right" },
          ];
        }

        if (nextToken === "/") {
          return [{ ...nextPosition, direction: "left" }];
        }

        if (nextToken === "\\") {
          return [{ ...nextPosition, direction: "right" }];
        }

        if (nextToken) {
          return [{ ...nextPosition, direction }];
        }
        break;
      }
    }
    return [];
  };

  const calcEnergy = ({ x, y, direction }) => {
    const history = [[]];

    let beams = [{ x, y, direction }];

    while (beams.length > 0) {
      beams = beams.reduce((acc, beam) => {
        const next = getNext(beam).filter(({ x, y, direction }) => {
          history[y] = history[y] || [];
          history[y][x] = history[y][x] || { directions: [] };

          if (history[y][x].directions.includes(direction)) {
            return false;
          }

          history[y][x].directions.push(direction);

          return true;
        });

        return [...acc, ...next];
      }, []);
    }

    return history.reduce((acc, line) => acc + line.filter((l) => l).length, 0);
  };

  const bestY = map.reduce(
    (bestY, line, y) =>
      Math.max(
        bestY,
        calcEnergy({ x: -1, y, direction: "right" }),
        calcEnergy({ x: line.length, y, direction: "left" }),
      ),
    0,
  );

  const bestX = map[0].reduce(
    (bestX, _, x) =>
      Math.max(
        bestX,
        calcEnergy({ x, y: -1, direction: "down" }),
        calcEnergy({ x, y: map.length, direction: "up" }),
      ),
    0,
  );

  console.log(Math.max(bestY, bestX));
};

run(`
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`);
