const run = (input) => {
  const map = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(""));

  const getPointInfo = (sourceY, sourceX, destY, destX) => {
    let nextX = null;
    let nextY = null;
    switch (map[destY][destX]) {
      case "S":
        nextX = destX;
        nextY = destY;
        break;
      case "L":
        if (sourceY - destY === -1 && sourceX === destX) {
          nextX = destX + 1;
          nextY = destY;
        }
        if (sourceX - destX === 1 && sourceY === destY) {
          nextX = destX;
          nextY = destY - 1;
        }
        break;
      case "J":
        if (sourceY - destY === -1 && sourceX === destX) {
          nextX = destX - 1;
          nextY = destY;
        }
        if (sourceX - destX === -1 && sourceY === destY) {
          nextX = destX;
          nextY = destY - 1;
        }
        break;
      case "7":
        if (sourceY - destY === 1 && sourceX === destX) {
          nextX = destX - 1;
          nextY = destY;
        }
        if (sourceX - destX === -1 && sourceY === destY) {
          nextX = destX;
          nextY = destY + 1;
        }
        break;
      case "F":
        if (sourceY - destY === 1 && sourceX === destX) {
          nextX = destX + 1;
          nextY = destY;
        }
        if (sourceX - destX === 1 && sourceY === destY) {
          nextX = destX;
          nextY = destY + 1;
        }
        break;
      case "-":
        if (sourceY === destY) {
          nextX = destX + (destX - sourceX);
          nextY = destY;
        }
        break;
      case "|":
        if (sourceX === destX) {
          nextX = destX;
          nextY = destY + (destY - sourceY);
        }
        break;
    }

    if (nextY === null || nextX === null || nextX === -1 || nextY === -1)
      return null;

    return {
      type: map[destY][destX],
      nextX,
      nextY,
      y: destY,
      x: destX,
      sourceX,
      sourceY,
    };
  };

  const [startX, startY] = (() => {
    for (const line of map) {
      if (line.includes("S")) {
        return [line.indexOf("S"), map.indexOf(line)];
      }
    }
  })();

  const startPositions = [
    { x: startX + 1, y: startY },
    { x: startX, y: startY + 1 },
    { x: startX - 1, y: startY },
    { x: startX, y: startY - 1 },
  ];

  const result = startPositions.reduce((acc, { x, y }) => {
    let counter = 0;
    let next = getPointInfo(startY, startX, y, x);
    while (next !== null && next.type !== "S") {
      counter++;
      next = getPointInfo(next.y, next.x, next.nextY, next.nextX);
    }

    console.log("res: ", counter);
    return Math.max(acc, Math.ceil(counter / 2));
  }, 0);

  console.log(result);
};

run(`
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`);
