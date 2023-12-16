const run = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const cards = lines.map((line) => {
    const [winningNumbers, numbers] = line.split(":")[1].split("|");
    return {
      count: 1,
      winningNumbers: winningNumbers
        .trim()
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n)),
      numbers: numbers
        .trim()
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n)),
    };
  });

  const result = cards.reduce((sum, card, cardIndex) => {
    const matchingNumbersCount = card.winningNumbers.reduce(
      (count, winningNumber) => {
        if (card.numbers.includes(winningNumber)) {
          return ++count;
        }
        return count;
      },
      0,
    );
    for (
      let i = cardIndex + 1;
      i < Math.min(cardIndex + 1 + matchingNumbersCount, cards.length);
      i++
    ) {
      cards[i].count += card.count;
    }

    return sum + card.count;
  }, 0);

  console.log(result);
};

run(`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`);
