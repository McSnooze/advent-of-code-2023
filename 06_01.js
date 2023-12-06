const calc = (time, distance) => {
  for (let speed = 1; speed < time; speed++) {
    const distanceCovered = speed * (time - speed);

    if (distanceCovered > distance) {
      return time - 1 - (speed - 1) * 2;
    }
  }
};

console.log(
  [
    { time: 44, distance: 202 },
    { time: 82, distance: 1076 },
    { time: 69, distance: 1138 },
    { time: 81, distance: 1458 },
  ].reduce((sum, race) => calc(race.time, race.distance) * sum, 1),
);
