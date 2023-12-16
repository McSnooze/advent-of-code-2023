const run = (input) => {
  const hash = (input) =>
    input.split(``).reduce((hash, char) => {
      return ((hash + char.charCodeAt(0)) * 17) % 256;
    }, 0);

  const boxes = input.split(`,`).reduce((boxes, item) => {
    if (item.indexOf("-") > -1) {
      const [label] = item.split(`-`);
      const boxKey = hash(label);
      boxes[boxKey] = (boxes[boxKey] || []).filter(
        (box) => box.label !== label,
      );
    } else if (item.indexOf("=") > -1) {
      const [label, value] = item.split(`=`);
      const boxKey = hash(label);
      boxes[boxKey] = boxes[boxKey] || [];

      const box = boxes[boxKey].find((box) => box.label === label);
      if (box) {
        box.value = value;
      } else {
        boxes[boxKey].push({ label, value });
      }
    }
    return boxes;
  }, {});

  const result = Object.entries(boxes).reduce((sum, [key, box]) => {
    return (
      sum +
      box.reduce(
        (power, box, index) =>
          power + (parseInt(key) + 1) * parseInt(box.value) * (index + 1),
        0,
      )
    );
  }, 0);

  console.log(result);
};

run(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`);
