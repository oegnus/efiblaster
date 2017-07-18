export const Map = {
  createNewMap: createNewMap
};

function createNewMap(mapData) {
  return {
    getWidth: function getWidth() {
      return mapData[0].length;
    },
    getHeight: function () {
      return mapData.length;
    },
    getTile: function getTile(position) {
      let tileType = '.';
      if (mapData[position.y] && mapData[position.y][position.x]) {
        tileType = mapData[position.y][position.x];
      }
      // tile:
      return {
        type: tileType,
        x: position.x,
        y: position.y
      };
    }
  };
}
