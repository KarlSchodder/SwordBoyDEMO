import {canvas, canvasContext, canvasBoundaries} from "../gameLayers/canvasLayer.js";
import {campfire, playerFigure} from "../main.js";
import { GameObject } from "./gameObject.js";
import {ImageObject} from "./imageObject.js";
import {CollisionCircle} from "./collision_circle.js";

class Sword extends ImageObject {
    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.onImageLoaded)
        this.imageObject.src = imagePath;
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.animDurationPerSprite = animDurationPerSprite;
        this.imageScaleFactor = imageScaleFactor;
        this.calculateSpriteRowCount();
        this.updateSwordSize();
    }

    layerModifier = 1200;

    previousSwordAngle = 1;
    previousSwordTipPosition = {
        "x": 0,
        "y": 0
    }

    radius = 10;

    swordAngle = 1;
    swordAngleGoal = 1;
    currentRotation = 0;
    

    swingAcceleration = 1;
    swingVelocity = 0;
    swingSpeed = 0.5;

    rotationDiff = 0;
    rotationStep = 0;
    
    swordSize = 5;
    swordLength = 10;
    damage = 2;
    stunModifier = 1;
    knockbackModifier = 1;
    damageModifier = 1;
    weight = 10;

    color = "red";

    charge = {
        "speed": 1,
        "max": 20,
        "current": 0
    }

    spriteWidth = 71;
    spriteHeight = 27;

    dimensions = {
        "width": 71,
        "height": 27
    }

    getSwordTipPositionX = () => {
        return (this.getCenterX() + this.getRadius() * Math.cos(this.swordAngle+0.34));
        
    }
    getSwordTipPositionY = () => {
        return (this.getCenterY() + this.getRadius() * Math.sin(this.swordAngle+0.34));
    }

    getCenterX = () => {
        return (playerFigure.center.x)
        //((this.position.x + this.dimensions.width / 2)-100);
    }
    getCenterY = () => {
        return (playerFigure.center.y)
        //((this.position.y + this.dimensions.height / 2)-20);
    }
    getRadius= () => {
        return ((this.swordSize*14)+22)
    }

    storeCurrentPosition = () => {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;

        this.previousSwordAngle = this.swordAngle;
        this.previousSwordTipPosition.x = this.getSwordTipPositionX();
        this.previousSwordTipPosition.y = this.getSwordTipPositionY();
    }

    angleDifference = (current, target) => {
        let diff = target - current;
        if (diff > Math.PI) {
          diff -= 2 * Math.PI;
        } else if (diff < -Math.PI) {
          diff += 2 * Math.PI;
        }
        return diff;
      }

    onCollision	= (otherObject) => {

    }

    updateRotation = () => {
        if (this.swordAngle > (2*Math.PI)) {this.swordAngle -= (2*Math.PI)} 
        //else
        if (this.swordAngle < 0) {this.swordAngle += (2*Math.PI)} 
        
        //this.swordAngleGoal = Math.abs(this.swordAngleGoal);

        this.rotationDiff = this.angleDifference(this.swordAngle, this.swordAngleGoal);
        this.rotationStep = Math.min(Math.abs(this.rotationDiff), this.swingSpeed) * Math.sign(this.rotationDiff);
        this.swordAngle += this.rotationStep;
    }

    updateCollisionCircles = () => {
    // "Activates" and "Deactivates" individual collision circles
    // Adjusts their values
    switch(this.swordSize) {
        case '1':
        break;
        }
    }
    updateSwordSize = () => {
        this.startAnimation(this.swordSize-1,this.swordSize-1)

        this.damage += 1;

        console.log("Sword Size", this.swordSize);
        switch (this.swordSize) {
            case 1:
                this.swordLength = 84;
                this.swingSpeed = 0.25;
                this.weight = 7;
                this.stunModifier = 1.2;
                this.damageModifier = 1;
                this.knockbackModifier = .25;

                playerFigure.speed = 10;
                playerFigure.friction = 0.09;
                playerFigure.diagonalModifier = 1;
                playerFigure.acceleration = 0.11;

                playerFigure.animationModifier = 16; 
                playerFigure.diagonalModifier = 0.95;
                break;
            case 2:
                this.swordLength = 88;
                this.swingSpeed = 0.2;
                this.weight = 8;
                this.stunModifier = 1.1;
                this.damageModifier = 1;
                this.knockbackModifier = .5;

                playerFigure.speed = 8.8;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;

                playerFigure.animationModifier = 13; 
                playerFigure.diagonalModifier = 0.95;
                break;
            case 3:
                this.swordLength = 98;
                this.swingSpeed = 0.15;
                this.weight = 10;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = .55;
                playerFigure.speed = 8.2;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 4:
                this.swordLength = 100;
                this.swingSpeed = 0.1;
                this.weight = 12;
                this.stunModifier = 0.9;
                this.damageModifier = 1;
                this.knockbackModifier = .60;
                playerFigure.speed = 7.6;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 5:
                this.swordLength = 110;
                this.swingSpeed = 0.085;
                this.weight = 15;
                this.stunModifier = 0.8;
                this.damageModifier = 1;
                this.knockbackModifier = .65;
                playerFigure.speed = 7;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.095;
                playerFigure.animationModifier = 10; 
                playerFigure.diagonalModifier = 0.93;
                break;
            case 6:
                this.swordLength = 114;
                this.swingSpeed = 0.07;
                this.weight = 20;
                this.stunModifier = 0.75;
                this.damageModifier = 1;
                this.knockbackModifier = .70;
                playerFigure.speed = 6.75;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 7:
                this.swordLength = 124;
                this.swingSpeed = 0.06;
                this.weight = 23;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1;
                playerFigure.speed = 6.5;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 8:
                this.swordLength = 136;
                this.swingSpeed = 0.055;
                this.weight = 26;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1;
                playerFigure.speed = 6.25;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 9:
                this.swordLength = 148;
                this.swingSpeed = 0.051;
                this.weight = 28;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1;
                playerFigure.speed = 6;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 10:
                this.swordLength = 160;
                this.swingSpeed = 0.047;
                this.weight = 30;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = .99;
                playerFigure.speed = 5.75;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 11:
                this.swordLength = 175;
                this.swingSpeed = 0.043;
                this.weight = 32;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1;
                playerFigure.speed = 5.5;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 12:
                this.swordLength = 187;
                this.swingSpeed = 0.039;
                this.weight = 34;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.01;
                playerFigure.speed = 5.25;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 13:
                this.swordLength = 199;
                this.swingSpeed = 0.034;
                this.weight = 37;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.02;
                playerFigure.speed = 5;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 14:
                this.swordLength = 212;
                this.swingSpeed = 0.03;
                this.weight = 40;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.03;
                playerFigure.speed = 4.66;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 15:
                this.swordLength = 227;
                this.swingSpeed = 0.028;
                this.weight = 43;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.04;
                playerFigure.speed = 4.33;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 16:
                this.swordLength = 240;
                this.swingSpeed = 0.025;
                this.weight = 46;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.05;
                playerFigure.speed = 4;
                playerFigure.friction = 0.1;
                playerFigure.acceleration = 0.1;
                break;
            case 17:
                this.swordLength = 253;
                this.swingSpeed = 0.022;
                this.weight = 49;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.06;
                playerFigure.speed = 3.66;
                playerFigure.friction = 0.13;
                playerFigure.acceleration = 0.1;
                break;
            case 18:
                this.swordLength = 265;
                this.swingSpeed = 0.019;
                this.weight = 52;
                this.stunModifier = 1;
                this.damageModifier = 1;
                this.knockbackModifier = 1.07;
                playerFigure.speed = 3.33;
                playerFigure.friction = 0.12;
                playerFigure.acceleration = 0.12;
                break;
            case 19:
                this.swordLength = 280;
                this.swingSpeed = 0.016;
                this.weight = 55;
                this.stunModifier = 1.03;
                this.damageModifier = 1;
                this.knockbackModifier = 1.08;
                playerFigure.speed = 3.0;
                playerFigure.friction = 0.09;
                playerFigure.acceleration = 0.11;
                playerFigure.animationModifier = 5.5; 
                playerFigure.diagonalModifier = 0.95;
                break;
            case 20:
                this.swordLength = 305;
                this.swingSpeed = 0.012;
                this.weight = 60;
                this.stunModifier = 1.2;
                this.damageModifier = 1;
                this.knockbackModifier = 1.1;
                playerFigure.speed = 2.2;
                playerFigure.friction = 0.08;
                playerFigure.acceleration = 0.115;
                playerFigure.animationModifier = 5; 
                playerFigure.diagonalModifier = 0.95;
                console.log("big sword");
                break;
        }
    }

    update = () => {
        this.dimensions.width = (this.spriteWidth*this.imageScaleFactor);
        this.dimensions.height = (this.spriteHeight*this.imageScaleFactor);

        this.position.x = playerFigure.center.x
        this.position.y = playerFigure.center.y

        this.swordAngleGoal = (playerFigure.angleToCursor()+160)*(Math.PI / 180);
        //this.swingSpeed = (8+this.swordSize)/(this.swordSize*this.swordSize*this.swordSize);
        //console.log(this.angleDifference(this.swordAngle, this.swordAngleGoal));

        
        this.updateRotation();

        // console.log(this.rotationStep);
        // DEBUGGING
        // console.log(this.angleDifference((Math.abs(this.swordAngle*(180 / Math.PI ))),(Math.abs(this.angleToObject(campfire.getCenterX(), campfire.getCenterY())))))

        // console.log(Math.abs(this.swordAngle*(180 / Math.PI )));
        // console.log(Math.abs(this.angleToObject(campfire.getCenterX(), campfire.getCenterY())));
        
        //console.log((this.previousSwordAngle*(180 / Math.PI)) - (this.swordAngle*(180 / Math.PI)));
    }

    drawCollision = () => {
        canvasContext.beginPath();
        canvasContext.moveTo(this.getCenterX(), this.getCenterY());
        canvasContext.arc(this.getCenterX(), this.getCenterY(), this.swordLength, (this.swordAngle+0.25), (this.swordAngle+0.42));
        canvasContext.lineTo(this.getCenterX(), this.getCenterY());
        canvasContext.fillStyle = "rgba(0, 0, 252, 0.2)";
        canvasContext.fill();
        canvasContext.closePath();
    }

    draw = () => {
        canvasContext.save(); // Save the current transformation matrix
        canvasContext.fillStyle = this.color;
        // Translate to the center of the rectangle
        canvasContext.translate(this.position.x, this.position.y);
  
        // Rotate the rectangle
        canvasContext.rotate(this.swordAngle);
        //canvasContext.rotate(this.swordAngle);
  
        // Draw the rectangle
        //canvasContext.fillRect(-this.dimensions.width-20, (-this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);

        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.spriteWidth-65, this.spriteHeight-30, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        
        this.flipAnimSprite();
        canvasContext.restore(); 
    }

}



export {Sword};