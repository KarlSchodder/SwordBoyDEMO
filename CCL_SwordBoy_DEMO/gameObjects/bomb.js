import { ImageObject } from "./imageObject.js";
import { Explosion } from "./explosion.js";
import { playerFigure, swordObject } from "../main.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";

class Bomb extends ImageObject {

constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, enemy) {
    super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);

        console.log("death animation created");
        this.enemy = enemy;
        this.position.x = this.enemy.getCenterX();
        this.position.y = this.enemy.getCenterY();
        this.calculateSpriteRowCount();
        this.startAnimation(0,12);
    }

targetDelta = {
    "x": 0,
    "y": 0,
    "distance": 0
}

directionX = 0;
directionY = 0;
stunTime = 2;
hittable = true;
radius = 11;
weight = 5;
collisionDMGModifier = 1;
layerModifier = 500;

calculateCollisionDMGModifier = () => {
    this.collisionDMGModifier = 
    (((
    Math.abs(playerFigure.previousPosition.x - playerFigure.position.x)+
    Math.abs(swordObject.previousSwordTipPosition.x - swordObject.getSwordTipPositionX())+
    Math.abs(playerFigure.previousPosition.y - playerFigure.position.y)+
    Math.abs(swordObject.previousSwordTipPosition.y - swordObject.getSwordTipPositionY()))
    /6)+(Math.abs(swordObject.rotationStep)/4))+0.02;
}

onCollision = (otherObject) => {
    if (otherObject.constructor.name === "CollisionCircle" && !this.stunState) {
        this.targetDelta.x = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.getCenterX() - otherObject.getCenterX())+((playerFigure.position.x - playerFigure.previousPosition.x)) + ((swordObject.getSwordTipPositionX() - swordObject.previousSwordTipPosition.x)));
        this.targetDelta.y = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.getCenterY() - otherObject.getCenterY())+((playerFigure.position.y - playerFigure.previousPosition.y)) + ((swordObject.getSwordTipPositionY() - swordObject.previousSwordTipPosition.y)));
        
        this.stunState = true;
        this.onHit();
    }
}

onHit = () => {
    // this.targetDelta.x += -0.4*(playerFigure.getCenterX() - this.getCenterX())
    // this.targetDelta.y += -0.4*(playerFigure.getCenterY() - this.getCenterY())
    this.targetDelta.distance = (Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2));
    this.directionX = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.x / this.targetDelta.distance);
    this.directionY = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.y / this.targetDelta.distance);
}

getCenterX = () => {
    return (this.position.x - this.dimensions.width / 2);
}
getCenterY = () => {
    return (this.position.y - this.dimensions.height / 2);
}
getRadius= () => {
    return (this.radius)
}

update = () => {
this.calculateCollisionDMGModifier();

if (this.currentAnimation.currentSprite === 12) {
    let explosion = new Explosion (0, 0, 49, 49,"./images/explosion.png",1,4,this);
}

    this.center.x = (this.position.x) - (this.dimensions.width/2)
    this.center.y = (this.position.y) - (this.dimensions.height/2)
    
    if (this.stunState) {

    this.friction += 0.01;

    this.position.x += this.directionX/this.friction;
    this.position.y += this.directionY/this.friction;

    this.stunTime -= 0.1
    if (this.stunTime <= 0) {
        //this.calculateStunTime();
        //swordObject.weight;
        this.friction = 0.01;
        this.stunTime = 2;
        this.stunState = false;
        }
        }
        
   
    }     

    draw = () => {
        canvasContext.save(); // Save the current transformation matrix
        canvasContext.fillStyle = this.color;
            // Translate to the center of the rectangle
        canvasContext.translate(this.getCenterX()-44, this.getCenterY()-34);
        
            // Rotate the rectangle
            //canvasContext.rotate(this.swordAngle);
      
            // Draw the rectangle
            //canvasContext.fillRect(-this.dimensions.width-20, (-this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);
    
        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
            this.flipAnimSprite();
            canvasContext.restore(); 
    }
    
}

export {Bomb}