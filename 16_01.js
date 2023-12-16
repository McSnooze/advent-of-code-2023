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

  const history = [[]];

  let beams = [{ x: -1, y: 0, direction: "right" }];

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

  console.log(
    history.reduce((acc, line) => acc + line.filter((l) => l).length, 0),
  );
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
