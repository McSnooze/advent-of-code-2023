const run = (input) => {
  const lines = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [hand, bid] = line.split(" ");

      const score = {};

      const parsedHand = hand.split("").map((v) => {
        score[v] = (score[v] || 0) + 1;
        switch (v) {
          case "T":
            return 10;
          case "J":
            return 11;
          case "Q":
            return 12;
          case "K":
            return 13;
          case "A":
            return 14;
          default:
            return parseInt(v);
        }
      });

      return {
        hand: parsedHand,
        bid: parseInt(bid),
        score: (() => {
          const scores = Object.values(score);

          if (scores.length === 1) return 7; // five of a kind
          if (scores.length === 2) {
            if (scores[0] === 3 || scores[1] === 3) return 5; // full house
            return 6; // four of a kind
          }
          if (scores.length === 3) {
            if (scores[0] === 3 || scores[1] === 3 || scores[2] === 3) return 4; // three of a kind
            return 3; // two pairs
          }
          if (scores.length === 4) return 2; // one pair
          return 1; // high card
        })(),
      };
    });

  lines.sort((a, b) => {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;

    for (let i = 0; i < 5; i++) {
      if (a.hand[i] > b.hand[i]) return 1;
      if (a.hand[i] < b.hand[i]) return -1;
    }

    return 0;
  });

  const result = lines.reduce((result, line, index) => {
    return result + line.bid * (index + 1);
  }, 0);

  console.log(result);
};

run(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`);
