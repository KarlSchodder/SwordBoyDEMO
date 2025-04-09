import { grindstone, playerFigure } from "../main.js";
import { ImageObject } from "./imageObject.js";
import { campfire, swordObject, anvil } from "../main.js";
import { cursorInstance } from "../main.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";

class Resource extends ImageObject {

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, detectable, aesthetic, anvilID, freshResource) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.calculateSpriteRowCount();
            this.detectable = detectable;
            this.aesthetic = aesthetic;
            this.anvilID = anvilID;
            this.freshResource = freshResource;

            this.generateRotation();
            this.checkAesthetic();
            console.log(this);
        }

checkAesthetic = () => {
    if (this.aesthetic) {
        console.log("aesthetic implemented");
    }
}

freshResource = true;
stunTime = 8;
weight = 5;
rotation = 0;

visionRadius = 10;
detecting = true;
detectableTimer = 30;

collisionDMGModifier = 5;

cursorCollected = false;

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

// removeItem = () => {

// }

onCollision = (otherObject) => {
    if (otherObject.constructor.name === "Cursor" && cursorInstance.cursorCollector && !this.aesthetic) {
        this.targetDelta.x += (playerFigure.getCenterX() - this.center.x);
        this.targetDelta.y += (playerFigure.getCenterY() - this.center.y);
        this.cursorCollected = true;
    } else if (otherObject.constructor.name === "Cursor" && cursorInstance.cursorCollector && this.aesthetic && cursorInstance.cursorClick) {
        
        console.log(otherObject);
        //this.targetDelta.x += (playerFigure.getCenterX() - this.center.x);
        //this.targetDelta.y += (playerFigure.getCenterY() - this.center.y);
        this.removeItem();
        console.log(this.resource);

        this.aesthetic = false;
        //this.cursorCollected = true;
    }
    // if (otherObject.constructor.name === "Fire") {
    //     this.active = false;
    //     this.cursorCollected = true;
    // }
    if (otherObject.constructor.name === "CollisionCircle" && this.cursorCollected) {
        this.targetDelta.x = (10*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.x - otherObject.getCenterX())+((playerFigure.position.x - playerFigure.previousPosition.x)) + (4*(swordObject.getSwordTipPositionX() - swordObject.previousSwordTipPosition.x)));
        this.targetDelta.y = (10*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.y - otherObject.getCenterY())+((playerFigure.position.y - playerFigure.previousPosition.y)) + (4*(swordObject.getSwordTipPositionY() - swordObject.previousSwordTipPosition.y)));
        this.onHit();
    }
}

onHit = () => {
    // this.targetDelta.x += -0.4*(playerFigure.getCenterX() - this.getCenterX())
    // this.targetDelta.y += -0.4*(playerFigure.getCenterY() - this.getCenterY())

    this.targetDelta.distance = (Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2));
    this.directionX = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.x / this.targetDelta.distance);
    this.directionY = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.y / this.targetDelta.distance);

    this.stunState = true;
    this.hittable = false;
    
    this.stunTime = 2.5;
}

resource = 0;

getCenterX = () => {
    return (this.position.x + this.dimensions.width / 2);
}
getCenterY = () => {
    return (this.position.y + this.dimensions.height / 2);
}
getRadius= () => {
    return (this.radius)
}

generateRotation = () => {
    this.rotation = (Math.random()*1.2)-0.6;
}

updateAnimation = () => {

}

updateCanvasPosition = () => {
    if (!this.aesthetic) { 
    this.position.x = 
        (
            (
        ((this.previousPosition.x + (this.dimensions.width/2)) //Center of Previous Position
        -((this.previousCanvas.width/2))) //Find difference to Previous Center of Canvas
        // ^^^ Collect relative x co-ordinate with Previous Center as 0,0
        *((canvas.width)
        /(this.previousCanvas.width)
        ) // Find and deploy Dilation Factor
            -this.dimensions.width/2 // Correct to Apply to Center of Object
            ) 
        )+((canvas.width/2)) 
        // ^^^ Translate Value to top left = 0,0
        this.position.y = 
        (
            (
        ((this.previousPosition.y + (this.dimensions.height/2)) //Center of Previous Position
        -((this.previousCanvas.height/2))) //Find difference to Previous Center of Canvas
        // ^^^ Collect relative y co-ordinate with Previous Center as 0,0
        *((canvas.height)
        /(this.previousCanvas.height)
        ) // Find and deploy Dilation Factor
            -this.dimensions.height/2 // Correct to Apply to Center of Object
            ) 
        )+((canvas.height/2)) 
        // ^^^ Translate Value to top left = 0,0
        }
        else if (this.aesthetic) {
            setTimeout(5000, this.snapToWorkstation());
        }
}

update = () => {
    this.updateAnimation();

    if (!this.detectable && !this.aesthetic) {
        this.detectableTimer -= 0.1
        if (this.detectableTimer <= 0) {
            this.detectable = true;
            this.detectableTimer = 15;
        }

    } 
    
    //else {this.detectableTimer = 15};

    this.center.x = (this.position.x) +(this.dimensions.width/2)
    this.center.y = (this.position.y) +(this.dimensions.height/2)

    // if (this.stunState) {

    //     this.friction += 0.01;

    //     this.position.x += this.directionX/this.friction;
    //     this.position.y += this.directionY/this.friction;

    //     this.stunTime -= 0.1
    //     if (this.stunTime <= 0) {
    //         this.stunState = false;
    //         this.hittable = true;
    //         //this.calculateStunTime();
    //         //swordObject.weight;
    //         this.friction = 0.01;
    //     }

    //     }
    // else
    if (this.cursorCollected && !this.aesthetic) {

        this.targetDelta.x = (playerFigure.getCenterX() - this.center.x);
        this.targetDelta.y = (playerFigure.getCenterY() - this.center.y);
        
        this.rotation += 0.1;
        this.targetDelta.distance = Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2);

        let directionX = this.targetDelta.x / this.targetDelta.distance;
        let directionY = this.targetDelta.y / this.targetDelta.distance;

        this.position.x += directionX * 5;
        this.position.y += directionY * 5;
    } 

    if (this.stunState && !this.aesthetic) {

        this.friction += 0.05;

        this.position.x += this.directionX/this.friction;
        this.position.y += this.directionY/this.friction;

        this.stunTime -= 0.1
        if (this.stunTime <= 0 && !this.aesthetic) {
            this.stunState = false;
            this.hittable = true;
            //this.calculateStunTime();
            //swordObject.weight;
            this.friction = 0.01;
        }
    }
}

draw = () => {
    canvasContext.save(); // Save the current transformation matrix
    canvasContext.fillStyle = this.color;
        // Translate to the center of the rectangle
    canvasContext.translate(this.getCenterX(), this.getCenterY());
    
        // Rotate the rectangle
    canvasContext.rotate(this.rotation);
        //canvasContext.rotate(this.swordAngle);
  
        // Draw the rectangle
        //canvasContext.fillRect(-this.dimensions.width-20, (-this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);

    canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.spriteWidth-25, this.spriteHeight-25, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        this.flipAnimSprite();
        canvasContext.restore(); 
}

}

export {Resource}