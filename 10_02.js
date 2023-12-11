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

  let next = [
    { x: startX, y: startY - 1 },
    { x: startX, y: startY + 1 },
    { x: startX + 1, y: startY },
    { x: startX - 1, y: startY },
  ].reduce((next, pos) => {
    return next || getPointInfo(startY, startX, pos.y, pos.x);
  }, null);

  map[startY][startX] = startY - next.y === 1 ? 1 : 2;

  while (next !== null && next.type !== "S") {
    map[next.y][next.x] = ["J", "L", "|"].includes(next.type) ? 1 : 2;
    next = getPointInfo(next.y, next.x, next.nextY, next.nextX);
  }

  const result = map.reduce((sum, line, y) => {
    return (
      sum +
      line.reduce((sum, point, x) => {
        if (point === 1 || point === 2) return sum;
        let borderCount = 0;
        for (let i = x; i < line.length; i++) {
          if (line[i] === 1) {
            borderCount++;
          }
        }

        if (borderCount % 2 === 1) {
          return sum + 1;
        }
        return sum;
      }, 0)
    );
  }, 0);

  console.log(result);
};

run(`
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`);
