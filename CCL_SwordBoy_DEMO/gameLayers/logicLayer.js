import {YummyDot} from "../gameObjects/yummyDot.js";
//import {SquarePacMan} from "../gameObjects/squarePacman.js";
import {canvas, canvasContext} from "../gameLayers/canvasLayer.js";

let gameObjects = [];
const targetTicksPerSecond = 60;
const targetTickInterval = 1000 / targetTicksPerSecond;
let lastTimestamp = 0;

function gameLoop(timestamp) {
    // Calculate the time elapsed since the last frame
    const elapsed = timestamp - lastTimestamp;

    // If enough time has passed, update the game logic
    if (elapsed > targetTickInterval) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].active === true) {
                gameObjects[i].storeCurrentPosition();
                gameObjects[i].update();
                gameObjects[i].checkForCollision();
                gameObjects[i].checkForDetection();
                gameObjects[i].drawShadow();
                //gameObjects[i].drawCollision();
                //gameObjects[i].drawVision();
            }
        }

        gameObjects.sort((a, b) => (a.position.y + a.dimensions.height + a.layerModifier) - (b.position.y + b.dimensions.height + b.layerModifier));

        for (let i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].active === true) {
                gameObjects[i].draw();
                
            }
        }

        // Reset the timestamp for the next frame
        lastTimestamp = timestamp - (elapsed % targetTickInterval);
    }

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// let gameObjects = []

// function gameLoop() {

// canvasContext.clearRect(0,0,canvas.width,canvas.height);

//     for (let i = 0; i < gameObjects.length; i++) {
//         if (gameObjects[i].active === true) {

//         gameObjects[i].storeCurrentPosition();    
//         gameObjects[i].update();
//         gameObjects[i].checkForCollision();
//         gameObjects[i].checkForDetection();

//         gameObjects[i].drawShadow();
        
//         // gameObjects[i].drawCollision();
//         // gameObjects[i].drawVision();
//             }
//         }
    
//     gameObjects.sort((a,b) => (a.position.y+a.dimensions.height+a.layerModifier) - (b.position.y+b.dimensions.height+b.layerModifier))

//     for (let i = 0; i < gameObjects.length; i++) {
//         if (gameObjects[i].active === true) {
//         gameObjects[i].draw();
//         }
//     }


//     requestAnimationFrame(gameLoop);
// }


export {gameLoop, gameObjects, targetTicksPerSecond};