export const Display = {
    drawGameState: drawGameState,
    drawTile: drawTile
};

const c = document.getElementById('efiCanvas');
const ctx = c.getContext('2d');

function drawGameState() {
    console.log('--- drawGameState ---');
    drawTile({
        type: 'r',
        x: 0,
        y: 0
    });
    drawTile({
        type: 'g',
        x: 1,
        y: 0
    });

}

function drawTile(tile) {
    const tileWidth = 10;
    const tileHeight = 10;
    if(tile.type === 'r') {
        ctx.fillStyle = 'gray';
    } else if(tile.type === 'g') {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 4;
    ctx.fillRect(
        tile.x * tileWidth,
        tile.y * tileHeight,
        tileWidth,
        tileHeight);
    ctx.stroke();
    ctx.closePath();
}
