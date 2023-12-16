const run = (condition, input) => {
  const games = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .reduce((games, line) => {
      const [, views] = line.split(":");

      games.push(
        views.split(";").map((view) =>
          view.split(",").reduce((colors, color) => {
            const [count, colorName] = color.trim().split(" ");
            colors[colorName] = parseInt(count);
            return colors;
          }, {}),
        ),
      );

      return games;
    }, []);

  const result = games.reduce((sum, game, gameId) => {
    for (const view of game) {
      if (
        Object.keys(condition).some((color) => view[color] > condition[color])
      ) {
        return sum;
      }
    }
    return sum + gameId + 1;
  }, 0);

  console.log(result);
};

run(
  { red: 12, green: 13, blue: 14 },
  `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,
);
