const run = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const instructions = lines.shift().trim().split("");

  const map = lines.reduce((map, line) => {
    const [, pos, L, R] = line.match(/^(.{3}) = \((.{3}), (.{3})\)$/);
    map[pos] = { L, R, isStartNode: pos[2] === "A", isEndNode: pos[2] === "Z" };
    return map;
  }, {});

  const distances = Object.values(map)
    .filter((node) => node.isStartNode)
    .map((node) => {
      let currentNode = node;
      let nextInstructionIndex = 0;
      let count = 0;

      while (!currentNode.isEndNode) {
        const instruction = instructions[nextInstructionIndex];

        currentNode = map[currentNode[instruction]];

        if (nextInstructionIndex === instructions.length - 1) {
          nextInstructionIndex = 0;
        } else {
          nextInstructionIndex++;
        }

        count++;
      }

      return count;
    });

  console.log(distances);

  const gcd = (a, b) => (a ? gcd(b % a, a) : b);

  const lcm = (a, b) => (a * b) / gcd(a, b);

  console.log(distances.reduce(lcm));
};

run(`
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`);
