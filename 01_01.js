const run = (input) => {
  const regex = /^\D*(\d).*(\d).*$|^\D*(\d).*$/gm;

  let sum = 0;
  let m;
  while ((m = regex.exec(input)) !== null) {
    if (m[1] !== undefined && m[2] !== undefined) {
      sum += Number(m[1] + m[2]);
    } else if (m[3] !== undefined) {
      sum += Number(m[3] + m[3]);
    }
  }

  console.log(sum);
};

run(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`);
