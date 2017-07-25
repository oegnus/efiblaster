// game code goes here
import { Position } from './Position';
import { Map } from './Map';
import { Display } from './Display';

const mapData = [
    'rrgggrr',
    'rrrrrrr',
    'ggggrrr',
    'ggggrrr',
    'ggggrrr',
    'ggggrrr'
];

const gameState = {
    players: [{
            x: 1,
            y: 2
        },
        {
            x: 3,
            y: 3
        }],
    map: Map.createNewMap(mapData)
};

Display.drawGameState(gameState);
