import {GameObject} from "./gameObject.js"
import {canvasContext, canvas} from "../gameLayers/canvasLayer.js";
import {campfire, playerFigure, swordObject} from "../main.js";
import {ImageObject} from "./imageObject.js";
import { Flint } from "./flint.js";
import { Iron } from "./iron.js";
import { DeathAnimation } from "./death_animation.js";

class Enemy extends ImageObject{
    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, healthModifier) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.calculateSpriteRowCount();

            this.health += healthModifier;
        }
    
    dropRate = 0.01;
    dropCount = 1;

    color = "green";
    radius = 25;
    hasShadow = false;
    entityID = 0;
    dropRate = 0;
    collisionDMGModifier = 0;

dropResource = () => {
    if (this.dropRate*campfire.resourceDropRate > Math.random() && this.dropCount > 0) 
    
    {this.dropCount -= 1
    console.log(this.dropCount);
        if (0.5 >= Math.random()) {
            let iron = new Iron(this.getCenterX(),this.getCenterY(),9,9,"images/iron.png",4,4,false,false);
        } else {
            let flint = new Flint(this.getCenterX(),this.getCenterY(),9,9,"images/flint.png",4,4,false,false);
        }
    }
}

onDeath = () => {
    let deathAnim = new DeathAnimation(50, 50, 10, 23,"./images/deathAnimation.png",4,4,this);
}

enactDamage = () => {
    this.calculateCollisionDMGModifier();
    this.health -= swordObject.damage*this.collisionDMGModifier*swordObject.damageModifier;
    // console.log("base damage", swordObject.damage)
    // console.log("calculated damage", swordObject.damage*this.collisionDMGModifier*swordObject.damageModifier)
    // if (this.health <= 0 && this.stunState) {
    //     this.onDeath();
    // }
} 

checkOutOfBounds = () => {
    if ((this.getCenterX() < -300 || this.getCenterX() > canvas.width+300) || (this.getCenterY() < -300 || this.getCenterY() > canvas.height+300)) {
        return true;
    }
}

getCenterX = () => {
        return (this.position.x + this.dimensions.width / 2);
    }
getCenterY = () => {
        return ((this.position.y + this.dimensions.height / 2)+10);
    }
getRadius= () => {
        return (this.radius)
    }

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}
    speed = 1;
    weight = 1;
    damage = 5;
    stunTime = 5;

targetDelta = {
    "x": 0,
    "y": 0,
    "distance": 0,
}

    fearful = false;
    stunState = false;
    hittable = true;
    knockback = 0;
    currentLoop = 0;

createShadow = () => {

}

imploding = false;

onHit = () => {
    this.calculateCollisionDMGModifier();
    this.enactDamage();
    // console.log(this.collisionDMGModifier);

    if (this.health < 0) {
        this.dropResource();
    }

    this.targetDelta.distance = (Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2));
    this.directionX = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.x / this.targetDelta.distance);
    this.directionY = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*((this.collisionDMGModifier+1)/2))*(this.targetDelta.y / this.targetDelta.distance);

    this.stunState = true;
    this.hittable = false;

    //this.currentDurationOfSprite = 1000;
    this.fearful = true;

    // this.targetDelta.x = this.center.x - otherObject.getCenterX();
    // this.targetDelta.y = this.center.y - otherObject.getCenterY();

    // this.targetDelta.x = this.center.x - playerFigure.center.x;
    // this.targetDelta.y = this.center.y - playerFigure.center.y;

    /*Apply Modifiers
        - Include playerfigure previous position difference into modifier
        - Include swordObjectTip previous position difference into modifier
        - The greater the weight of the sword, the more the modifiers make a 
            difference compared to the original values
        - If rotationstep is below a certain threshold and playerfigure position 
            difference is below a certain threshold, then target delta is determined by
            relative position to the collision circle
    */ 
    
}
    respawn = () => {
        const randomDecimal = Math.random();

        const randomValue = Math.floor(randomDecimal * 4) + 1;

            if(randomValue === 1) {
                    this.position.x = Math.random()*canvas.width;
                    this.position.y = 0-this.dimensions.height;
            } else if (randomValue === 2) {
                    this.position.x = Math.random()*canvas.width;
                    this.position.y = canvas.height;
            } else if (randomValue === 3) {
                    this.position.y = Math.random()*canvas.height;
                    this.position.x = 0-this.dimensions.width;
            } else if (randomValue === 4) {
                    this.position.y = Math.random()*canvas.height;
                    this.position.x = canvas.width;  
            }
    }

    onCollision = (otherObject) => {
        if(otherObject.constructor.name === "Fire") {
            this.respawn();
        }    
    }

    angleToPlayer = () => {
        let dy = this.center.y - playerFigure.position.y;
        let dx = this.center.x - playerFigure.position.x;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    angleToCenter = () => {
        let dy = this.center.y - 500;
        let dx = this.center.x - 500;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    calculateCollisionDMGModifier = () => {
        this.collisionDMGModifier = 
        (((
        Math.abs(playerFigure.previousPosition.x - playerFigure.position.x)+
        Math.abs(swordObject.previousSwordTipPosition.x - swordObject.getSwordTipPositionX())+
        Math.abs(playerFigure.previousPosition.y - playerFigure.position.y)+
        Math.abs(swordObject.previousSwordTipPosition.y - swordObject.getSwordTipPositionY()))
        /6)+(Math.abs(swordObject.rotationStep)/4))+0.02;
    }

    calculateStunTime = () => {
        this.stunTime = (swordObject.stunModifier*(this.collisionDMGModifier)*(swordObject.weight - this.weight)*0.5/10)+0.5
        }    

    update = () => {
        //this.calculateCollisionDMGModifier();

        this.center.x = (this.position.x) +(this.dimensions.width/2)
        this.center.y = (this.position.y) +(this.dimensions.height/2)

        if (this.stunState) {
        this.animDurationPerSprite = 1000;
        
        let directionX = this.targetDelta.x / this.targetDelta.distance;
        let directionY = this.targetDelta.y / this.targetDelta.distance;

        let friction = 1;
        friction -= 0.1;

        this.position.x += directionX*friction;
        this.position.y += directionY*friction;

        this.stunTime -= 0.0085
        if (this.stunTime <= 0) {
            this.stunState = false;
            this.hittable = true;
            this.stunTime = ((swordObject.weight - this.weight))/(2*this.collisionDMGModifier)+Math.abs(swordObject.rotationStep*5);
        }
        
        } else {
            
        this.animDurationPerSprite = 5.5/this.speed;

        // Calculate direction towards the center
        let dx = campfire.center.x - this.center.x;
        let dy = campfire.center.y - this.center.y;
  
        // Calculate distance to the center
        let distance = Math.sqrt(dx ** 2 + dy ** 2);
  
        // Normalize direction
        let directionX = dx / distance;
        let directionY = dy / distance;
  
        // Update object position with constant speed
        this.position.x += directionX * this.speed;
        this.position.y += directionY * this.speed;

        // Update Animation
        if (directionX >= 0 && this.currentLoop != 1) {
            this.startAnimation(0,7);
            this.currentLoop = 1;
        } else 
        if (directionX < 0 && this.currentLoop != 2) {
            this.startAnimation(8,15);
            this.currentLoop = 2;
        }
        }
    }
}

export {Enemy}