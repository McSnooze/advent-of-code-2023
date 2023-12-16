const run = (input) => {
  const hash = (input) =>
    input.split(``).reduce((hash, char) => {
      return ((hash + char.charCodeAt(0)) * 17) % 256;
    }, 0);

  console.log(input.split(`,`).reduce((sum, item) => sum + hash(item), 0));
};

run(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`);
