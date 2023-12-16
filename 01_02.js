const run = (input) => {
  const regex = /^\D*(\d).*(\d).*$|^\D*(\d).*$/gm;
  const digitWords = "one|two|three|four|five|six|seven|eight|nine";

  const replaceNextDigitWord = (input, action) => {
    let additionalSearchPattern = null;

    const result = input.replace(new RegExp(action, "gm"), (value) => {
      additionalSearchPattern = "";
      switch (value.slice(-1)) {
        case "o":
          additionalSearchPattern = "ne|";
          break;
        case "t":
          additionalSearchPattern = "hree|wo|";
          break;
        case "e":
          additionalSearchPattern = "ight|";
          break;
        case "n":
          additionalSearchPattern = "ine|";
          break;
      }

      switch (value) {
        case "one":
        case "ne":
          return "1";
        case "two":
        case "wo":
          return "2";
        case "three":
        case "hree":
          return "3";
        case "four":
          return "4";
        case "five":
          return "5";
        case "six":
          return "6";
        case "seven":
          return "7";
        case "eight":
        case "ight":
          return "8";
        case "nine":
        case "ine":
          return "9";
      }
    });

    if (additionalSearchPattern !== null) {
      return replaceNextDigitWord(
        result,
        `${additionalSearchPattern}${digitWords}`,
      );
    }

    return result;
  };

  const calibratedInput = replaceNextDigitWord(input, digitWords);

  let sum = 0;
  let m;
  while ((m = regex.exec(calibratedInput)) !== null) {
    if (m[1] !== undefined && m[2] !== undefined) {
      sum += Number(m[1] + m[2]);
    } else if (m[3] !== undefined) {
      sum += Number(m[3] + m[3]);
    }
  }

  console.log(sum);
};

run(`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`);
