const run = (input) => {
  const lines = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(" ").map((num) => parseInt(num)));

  const getPrevious = (dataset) => {
    const nextDataset = [];
    for (let i = 0; i < dataset.length - 1; i++) {
      nextDataset.push(dataset[i + 1] - dataset[i]);
    }

    const sum = nextDataset.reduce((sum, num) => sum + num, 0);

    if (sum === 0) {
      return dataset[0];
    }

    return dataset[0] - getPrevious(nextDataset);
  };

  console.log(lines.reduce((sum, line) => sum + getPrevious(line), 0));
};

run(`
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`);
