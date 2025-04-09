import { playerFigure, grindstone } from "../main.js";
import { ImageObject } from "./imageObject.js";
import { Resource } from "./resource.js";
import { gameObjects } from "../gameLayers/logicLayer.js";

class Flint extends Resource {

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

resource = 2;

updateAnimation = () => {
    if (this.resource === 2) {
        this.startAnimation(0,31);
        this.resource = 4;
    }
}

removeItem = () => {
    playerFigure.materials.flint -= 1;
    grindstone.materials -= 1;
}


snapToWorkstation = () => {
        this.position.x = (((Math.random()*40)-20)+grindstone.getCenterX());
        this.position.y = (((Math.random()*20)+10)+grindstone.getCenterY());
}

getCenterX = () => {
    return (this.position.x + this.dimensions.width / 2);
}
getCenterY = () => {
    return (this.position.y + this.dimensions.height / 2);
}
getRadius= () => {
    return (this.radius)
}

}

export {Flint}