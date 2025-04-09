import {canvas, canvasContext, canvasBoundaries} from "../gameLayers/canvasLayer.js";
import {GameObject} from "../gameObjects/gameObject.js";

class ImageObject extends GameObject {
    imageObject;
    spriteWidth = 1;
    spriteHeight = 1;
    currentSourceXPosition = 0;
    currentSourceYPosition = 0;
    imageScaleFactor = 1;
    animDurationPerSprite = 1;
    currentDurationOfSprite = 0;
    spritesPerRow = 1;

    dimensions = {
        "width": this.spriteWidth*this.imageScaleFactor,
        "height": this.spriteHeight*this.imageScaleFactor
    }

    currentAnimation = {
        "startSprite": 0,
        "endSprite": 0,
        "currentSprite": 0,
    }
    imageReady = false;
    
    //loopSprite = this.currentAnimation.currentSprite+1;

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height);
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.onImageLoaded)
        this.imageObject.src = imagePath;
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.animDurationPerSprite = animDurationPerSprite;
        this.imageScaleFactor = imageScaleFactor;
        this.calculateSpriteRowCount();
    }

    onImageLoaded = () => {
        this.imageReady = true;
        this.calculateSpriteRowCount();
    }

    calculateSpriteRowCount = () => {
        this.spritesPerRow = this.imageObject.naturalWidth / this.spriteWidth;
    }

    calculateLoopSprite = (loopSprite) => {
        if (loopSprite >= 1 && loopSprite <= 8) {
            return loopSprite;
        } else {
            return this.calculateLoopSprite(loopSprite - 8);
        }
    }

    draw = () => {
        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        this.flipAnimSprite();
    }

    flipAnimSprite = () => {
        this.currentDurationOfSprite++;
        if (this.currentDurationOfSprite <= this.animDurationPerSprite) {
            return;
        }

        this.currentAnimation.currentSprite++;
        if (this.currentAnimation.currentSprite > this.currentAnimation.endSprite) {
            this.currentAnimation.currentSprite = this.currentAnimation.startSprite;
        }
        this.calculatePositionOfSprite(this.currentAnimation.currentSprite);
        this.currentDurationOfSprite = 0;
    }

    startAnimation = (startSprite, endSprite) => {
        this.currentAnimation.startSprite = startSprite;
        this.currentAnimation.endSprite = endSprite;
        this.currentAnimation.currentSprite = 
        startSprite;
        //this.loopSprite;
    }

    calculatePositionOfSprite = (spriteIndex) => {
        let rowOfSprite = Math.floor(spriteIndex / this.spritesPerRow);
        this.currentSourceYPosition = rowOfSprite * this.spriteHeight;
        let columnSprite = spriteIndex % this.spritesPerRow;
        this.currentSourceXPosition = columnSprite * this.spriteWidth;
    }

}

export {ImageObject}