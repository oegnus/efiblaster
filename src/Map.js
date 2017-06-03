export const Map = {
  createNewMap: createNewMap
}

function createNewMap(rawMapData) {
  const mapTiles = {};
  let maxWidth = 0;
  const maxHeight = rawMapData.length;
  for (var y = 0; y < rawMapData.length; y ++) {
    var row = rawMapData[y];
    maxWidth = Math.max(maxWidth, row.length);
    for (var x = 0; x < row.length; x ++) {
      mapTiles[x + '_' + y] = createMapTileObject(x, y, row[x]);
    }
  }
  return {
    getWidth: function () {
      return maxWidth;
    },
    getHeight: function () {
      return maxHeight;
    },
    getTile: function (position) {
      const x = Math.round(position.x);
      const y = Math.round(position.y);
      const emptyTile = createMapTileObject(x, y, '.');
      return mapTiles[x + '_' + y] || emptyTile;
    }
  };
}

function createMapTileObject(terrainX, terrainY, terrainType) {
  return {
    x: terrainX,
    y: terrainY,
    type: terrainType
  };
}
