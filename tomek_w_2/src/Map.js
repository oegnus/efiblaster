export const Map = {
  createNewMap: function (rawMapData) {
    const map = {
      getWidth: function () {
        if (rawMapData[0]) {
          return rawMapData[0].length;
        }
        return 0;
      },
      getHeight: function () {
        return rawMapData.length;
      },
      getTile: function (position) {
        const tilePos = {
          x: Math.round(position.x),
          y: Math.round(position.y)
        };
        if (rawMapData[tilePos.y]) {
          const row = rawMapData[tilePos.y];
          if (row[tilePos.x]) {
            return {
              x: tilePos.x,
              y: tilePos.y,
              type: row[tilePos.x]
            };
          }
        }
        return {
          x: tilePos.x,
          y: tilePos.y,
          type: '.'
        };
      }
    };
    return map;
  }
};
