import { campfire, swordObject, playerFigure, anvil, grindstone} from "../main.js";
import { ImageObject } from "./imageObject.js";
import { WaveSpawner } from "../gameObjects/waveSpawner.js";
import {canvas, canvasContext} from "../gameLayers/canvasLayer.js";
import { WaveBouncer } from "./waveBouncer.js";
import { waveSpawner1, waveSpawner2, waveSpawner3, waveSpawner4} from "../main.js";

class Center extends ImageObject {

onCollision = (otherObject) => {
    if (otherObject.constructor.name === "SquarePacMan" && otherObject.keys.interact) {
        otherObject.keys.interact = false;
        if (playerFigure.materials.iron > 0 && playerFigure.materials.flint > 0 && campfire.health < 5) {
            playerFigure.materials.iron -= 1;
            playerFigure.materials.flint -= 1;
            grindstone.materials -= 1;
            anvil.materials -= 1;
            grindstone.animationFlip = true;
            anvil.animationFlip = true;
            campfire.health += 1;
            campfire.updateHealth();
        }
    }
}


radius = 80;

layerModifier = -500;
entityIDEncoder = 1;

wave = {
    "active": false,
    "counter": 0,

}

upTickEntityID = () => {
    playerFigure.entityID += 1;
    swordObject.entityID += 1;
    campfire.entityID += 1;
    this.entityIDEncoder += 1;
}

// updateCanvasPosition = () => {

// }

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

update = () => {
    this.position.x = campfire.center.x-(this.dimensions.width/2)
    this.position.y = campfire.center.y-(this.dimensions.height/2)+52
}

}

export {Center}