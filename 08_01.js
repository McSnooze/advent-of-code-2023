const run = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const instructions = lines.shift().trim().split("");

  const map = lines.reduce((map, line) => {
    const [, pos, L, R] = line.match(/^(\D{3}) = \((\D{3}), (\D{3})\)$/);
    map[pos] = { L, R };
    return map;
  }, {});

  let nextPos = "AAA";
  let nextInstructionIndex = 0;
  let count = 0;

  while (nextPos !== "ZZZ") {
    const instruction = instructions[nextInstructionIndex];

    nextPos = map[nextPos][instruction];

    if (nextInstructionIndex === instructions.length - 1) {
      nextInstructionIndex = 0;
    } else {
      nextInstructionIndex++;
    }

    count++;
  }

  console.log(count, map, instructions);
};

run(`
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`);
