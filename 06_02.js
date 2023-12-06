const calc = (time, distance) => {
  for (let speed = 1; speed < time; speed++) {
    const distanceCovered = speed * (time - speed);

    if (distanceCovered > distance) {
      return time - 1 - (speed - 1) * 2;
    }
  }
};

console.log(
  [{ time: 44826981, distance: 202107611381458 }].reduce(
    (sum, race) => calc(race.time, race.distance) * sum,
    1,
  ),
);
