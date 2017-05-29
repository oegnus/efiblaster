function createMapTiles(rawMapData) {
  const mapTiles = {};
  for (var y = 0; y < rawMapData.length; y ++) {
    var row = rawMapData[y];
    for (var x = 0; x < row.length; x ++) {
      mapTiles[x + '_' + y] = createMapTileObject(x, y, row[x]);
    }
  }
  return mapTiles;
}

function createMapTileObject(terrainX, terrainY, terrainType) {
  return {
    x: terrainX,
    y: terrainY,
    type: terrainType
  };
}

function getTile(mapTiles, position) {
  const x = position.x;
  const y = position.y;
  const emptyTile = createMapTileObject(x, y, '.');
  return mapTiles[x + '_' + y] || emptyTile;
}
