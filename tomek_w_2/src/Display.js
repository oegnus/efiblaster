export const Display = {
  drawGameState: function (gameState) {
    this.drawMap(gameState.map);
    gameState.players.forEach(drawPlayer);
  },
  drawMap: function (map) {
    for (let y = 0; y < map.getHeight(); y ++) {
      for (let x = 0; x < map.getWidth(); x ++) {
        drawTile(
          map.getTile({x: x, y: y})
        );
      }
    }
  }
};

const tileSize = 1;

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
const boxesDict = {};
const playersDict = {};
let drawTile = () => null;
let drawPlayer = () => null;
var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0.9 * Math.PI / 2,
    1.5 * Math.PI / 2,
    10,
    new BABYLON.Vector3(-3, -3, 0),
    scene
  );
  var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(5, 5, -2), scene);

  var grassTexture = new BABYLON.StandardMaterial("grassTexture", scene);
  grassTexture.diffuseTexture = new BABYLON.Texture("assets/grass.jpg", scene);

  var rockTexture = new BABYLON.StandardMaterial("rockTexture", scene);
  rockTexture.diffuseTexture = new BABYLON.Texture("assets/rock.jpg", scene);

  var playerTexture = new BABYLON.StandardMaterial("playerTexture", scene);
  playerTexture.diffuseTexture = new BABYLON.Texture("assets/1forw0.png", scene);
  playerTexture.diffuseTexture.hasAlpha = true;
  playerTexture.backFaceCulling = false;

  drawTile = (tile) => {
    const key = tile.x + '_' + tile.y;
    if (!boxesDict[key]) {
      const box = BABYLON.Mesh.CreateBox("box", 0.9, scene);
      box.position = new BABYLON.Vector3(
        -tile.x * tileSize,
        -tile.y * tileSize,
        (tile.type === 'g') ? 0 : 0.6
      );
      box.material = (tile.type === 'g') ? grassTexture : rockTexture;
      boxesDict[key] = box;
    }
  };

  drawPlayer = (player, playerId) => {
    const key = playerId;
    if (!playersDict[key]) {
      const box = BABYLON.Mesh.CreateBox("box", 0.6, scene);
      box.material = playerTexture;
      playersDict[key] = box;
    }
    const playerMesh = playersDict[key];
    console.log('playerMesh', playerMesh);
    playerMesh.position = new BABYLON.Vector3(
      -player.x * tileSize,
      -player.y * tileSize,
      1
    );
  };

  return scene;
}

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
