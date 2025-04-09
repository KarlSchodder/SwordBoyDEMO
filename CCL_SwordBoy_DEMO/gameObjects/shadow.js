import { ImageObject } from "./imageObject.js";
import { playerFigure } from "../main.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";

class Shadow extends ImageObject {

position = {
    "x": 0,
    "y": 0
}

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

drawShadow = () => {
    canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
    this.flipAnimSprite();
}

draw = () => {

}

update = () => {
this.position.x = playerFigure.position.x 
this.position.y = playerFigure.position.y + 44 
}

}

export {Shadow}