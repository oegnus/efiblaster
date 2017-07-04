class _Map {

  constructor(map) {
    this.map = this.writeMapWithObjects(map);
  }

  writeMapWithObjects(charsArray) {
    let map = [];

    charsArray.forEach((row, rowIndex) => {
      map[rowIndex] = [];

      row.forEach((char, charIndex) => {
        map[rowIndex][charIndex] = {
          type: char,
          x: charIndex,
          y: rowIndex
        }
      })
    });

    return map;
  }

  getTile({x, y}) {
    let xRounded = Math.round(x);
    let yRounded = Math.round(y);

    return this.map[yRounded][xRounded]
  }
}

export const Map = {
  createNewMap: (stringArray) => {
    let map = stringArray.map((string) => [...string]);

    return new _Map(map);
  }
};
