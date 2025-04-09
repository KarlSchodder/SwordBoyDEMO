import {Shadow} from "./shadow.js"
import {goblin} from "../main.js"
import {Goblin} from "./goblin.js"
import {canvasContext} from "../gameLayers/canvasLayer.js";

class GoblinShadow extends Shadow {

    constructor(specificGoblin, x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.specificGoblin = specificGoblin;
            this.calculateSpriteRowCount();
            console.log("shadowCreated");
            this.position.x = -300;
            this.position.y = -300;
        }

    draw = () => {

    }

    update = () => {
        this.position.x = this.specificGoblin.shadowPosition.x 
        this.position.y = this.specificGoblin.shadowPosition.y

        if (!this.specificGoblin.active) {
            this.active = false;
        }
    }
        
    drawShadow = () => {
        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        this.flipAnimSprite();
    }

}

export {GoblinShadow}