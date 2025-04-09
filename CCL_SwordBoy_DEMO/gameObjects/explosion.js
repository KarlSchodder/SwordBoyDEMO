import { ImageObject } from "./imageObject.js";
import { targetTicksPerSecond } from "../gameLayers/logicLayer.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";
import { campfire } from "../main.js";
import { Smoke } from "./smoke.js";
import { GameOverScreen } from "./gameOverScreen.js";

class Explosion extends ImageObject {

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, specificBomb) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
 
            console.log("death animation created");
            this.specificBomb = specificBomb;
            this.calculateSpriteRowCount();
            this.updateAnimation();
            
        }

stunTime = 11.5;
detecting = true;
detectable = true;
radius = 0;
layerModifier = 500;
visionRadius = 100;

cloudPosition = {
    "x": 0,
    "y": 0,
}

onCollision = (otherObject) => {
    if (otherObject.constructor.name === "Goblin" || 
        otherObject.constructor.name === "BombGoblin" ||
        otherObject.constructor.name === "MerchantGoblin" || 
        otherObject.constructor.name === "Iron" || 
        otherObject.constructor.name === "Flint" ||
        otherObject.constructor.name === "SquarePacMan") {  
    
    if (this.imploding) {
    otherObject.stunState = true;
    otherObject.stunTime = 0.01;
    otherObject.targetDelta.x = -0.0001*(otherObject.center.x-this.center.x)/20;
    otherObject.targetDelta.y = -0.0001*(otherObject.center.y-this.center.y)/20;
    otherObject.targetDelta.distance = (Math.sqrt(otherObject.targetDelta.x ** 2 + otherObject.targetDelta.y ** 2));
    otherObject.directionX = (otherObject.targetDelta.x / otherObject.targetDelta.distance);
    otherObject.directionY = (otherObject.targetDelta.y / otherObject.targetDelta.distance);

    if (otherObject.constructor.name === "SquarePacMan") {
        otherObject.position.x = this.center.x - otherObject.dimensions.width/2;
        otherObject.position.y = this.center.y - otherObject.dimensions.height/2;
    }

    } else if (!this.imploding) {
    otherObject.stunState = true;
    otherObject.stunTime = 5;
    otherObject.health -= 20+(7.5*campfire.waveCounter);
    otherObject.targetDelta.x = this.center.x-otherObject.center.x;
    otherObject.targetDelta.y = this.center.y-otherObject.center.y;
    otherObject.targetDelta.distance = (Math.sqrt(otherObject.targetDelta.x ** 2 + otherObject.targetDelta.y ** 2));
    otherObject.directionX = -1*(otherObject.targetDelta.x / otherObject.targetDelta.distance);
    otherObject.directionY = -1*(otherObject.targetDelta.y / otherObject.targetDelta.distance)
    
    if (otherObject.constructor.name === "SquarePacMan") {
        let gameOverScreen = new GameOverScreen((canvas.width/2)-4002, (canvas.height/2)-4002, 2001, 2001,"./images/kittycat_gameover.png",1,4,this);
        campfire.gameState = -1
    }
}


    }
}

getCenterX = () => {
    return (this.center.x);
}
getCenterY = () => {
    return (this.center.y);
}
getRadius= () => {
    return (this.radius)
}

implosion = true;
hittable = true;

drawVision = () => {
    if (this.detecting || this.detectable) {
    canvasContext.beginPath();
    canvasContext.arc(this.center.x, this.center.y, this.visionRadius, 0, 2 * Math.PI);
    canvasContext.fillStyle = "rgba(0, 252, 0, 0.2)";
    canvasContext.fill();
    canvasContext.closePath();
    }
}

updateAnimation = () => {
    this.position.x = this.specificBomb.getCenterX();
    this.position.y = this.specificBomb.getCenterY();
    this.startAnimation(0,30);
    this.specificBomb.active = false;
    console.log("animation started")
}

cloudSpawned = false;

draw = () => {
    canvasContext.save(); // Save the current transformation matrix
    canvasContext.fillStyle = this.color;
        // Translate to the center of the rectangle
    canvasContext.translate(this.getCenterX()-148, this.getCenterY()-148);
    
        // Rotate the rectangle
        //canvasContext.rotate(this.swordAngle);
  
        // Draw the rectangle
        //canvasContext.fillRect(-this.dimensions.width-20, (-this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);

    canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        this.flipAnimSprite();
        canvasContext.restore(); 
}

    update = () => {
        this.center.x = (this.position.x + this.dimensions.width / 2);
        this.center.y = (this.position.y + this.dimensions.height / 2); 

        this.cloudPosition.x = this.center.x;
        this.cloudPosition.y = this.center.y;

        this.stunTime -= 0.1;
        // if (this.stunTime <= 6 && !this.cloudSpawned) {
        //     let smoke = new Smoke(50, 50, 33, 32,"./images/smokeCloud.png",6,4,this);
        //     this.cloudSpawned = true;
        // } else 
        
        if (this.stunTime <=0) {
            let smoke = new Smoke(50, 50, 33, 32,"./images/smokeCloud.png",6,4,this); 
            this.active = false;
        }

        if (this.currentAnimation.currentSprite >= 0 && this.currentAnimation.currentSprite <= 23) {
            this.animDurationPerSprite = 2;
            this.radius = 100;
            this.imploding = true;
        } 
        else if (this.currentAnimation.currentSprite >=24 && this.currentAnimation.currentSprite < 31) {
            this.animDurationPerSprite = 4;
            this.radius = (this.currentAnimation.currentSprite-21)*10;
            this.imploding = false;
        }
    }

}

export {Explosion}