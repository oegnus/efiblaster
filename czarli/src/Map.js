class _Map {
  constructor(map) {
    this.map = this.writeMapWithObjects(map);
  }

  writeMapWithObjects(charsArray) {
    let map = [];

    if (charsArray) {
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
    }

    return map;
  }

  getTile({x, y}) {
    let xRounded = Math.round(x);
    let yRounded = Math.round(y);

    if (this.map[yRounded] && this.map[yRounded][xRounded]) {
      return this.map[yRounded][xRounded]
    }

    return {type: '.', x: xRounded, y: yRounded}
  }

  getWidth() {
    return this.map[0] ? this.map[0].length : 0;
  }

  getHeight() {
    return this.map.length;
  }
}

export const Map = {
  createNewMap: (stringArray) => {
    let map = stringArray.map((string) => [...string]);

    return new _Map(map);
  }
};
