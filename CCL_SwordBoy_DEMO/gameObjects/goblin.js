import {playerFigure, swordObject} from "../main.js";
import {campfire} from "../main.js";
import {Enemy} from "./enemy.js";
import {GameObject} from "./gameObject.js";
import {gameObjects} from "../gameLayers/logicLayer.js";
import { CollisionCircle } from "./collision_circle.js";
import { GoblinShadow } from "./goblin_shadow.js";
import { Iron } from "./iron.js";
import { Flint } from "./flint.js";

class Goblin extends Enemy {

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, healthModifier) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, healthModifier);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.health = 20;
            this.health += healthModifier;
            this.calculateSpriteRowCount();

            let shadow = new GoblinShadow(this,-300,-300,13,9,"./images/enemies/goblin_shadow.png",1,4);
        }

    dropRate = 0.25;
    dropCount = 1;

    targetingCampfire = true;
    speed = 2;
    detecting = true;
    detectable = true;
    resourceDetected = false;
    visionRadius = 200;

    collectionTime = 7;

    shadowPosition = {
        "x": 0,
        "y": 0
    }

    collisionDMGModifier = 0;

    materials = {
        "iron": 0,
        "flint": 0
    }

    radius = 23;
    
    updateDropCount = () => {

    }

    detectedResource = () => {
        this.detecting = false;
        this.resourceDetected = true;
    }

    respawn = () => {
        this.materials.iron = 0;
        this.materials.flint = 0;

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
        if (otherObject.constructor.name === "Iron" && this.materials.flint === 0 && this.materials.iron === 0 && !otherObject.aesthetic) {
            this.materials.iron += 1;
            this.resourceDetected = false;
            otherObject.active = false;
        } else if (otherObject.constructor.name === "Flint" && this.materials.iron === 0 && this.materials.flint === 0 && !otherObject.aesthetic) {
            this.materials.flint += 1;
            this.resourceDetected = false;
            otherObject.active = false;
        }
        if(otherObject.constructor.name === "CollisionCircle") {
            this.targetDelta.x = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.x - otherObject.getCenterX())+((playerFigure.position.x - playerFigure.previousPosition.x)) + ((swordObject.getSwordTipPositionX() - swordObject.previousSwordTipPosition.x)));
            this.targetDelta.y = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.y - otherObject.getCenterY())+((playerFigure.position.y - playerFigure.previousPosition.y)) + ((swordObject.getSwordTipPositionY() - swordObject.previousSwordTipPosition.y)));
            this.updateAnimation();
            this.onHit();
        }

        if(otherObject.constructor.name === "Fire") {
            otherObject.health -= 1;
            otherObject.updateHealth();
            this.onDeath();
        }    
    }

    onDetection = (otherObject) => {
        if (((otherObject.constructor.name === "Flint" || otherObject.constructor.name === "Iron")  && !otherObject.aesthetic && this.materials.iron === 0 && this.materials.flint === 0)) {
            this.targetDelta.x = (otherObject.getCenterX() - this.center.x)
            this.targetDelta.y = (otherObject.getCenterY() - this.center.y)
            this.detectedResource();
        }
    }

    updateAnimation = () => {
        if (this.directionX >= 0 && this.currentLoop !== 1 && this.materials.iron !== 1 && this.materials.flint !== 1) {
            this.startAnimation(0,7);
            this.currentLoop = 1;
        } else 
        if (this.directionX < 0 && this.currentLoop !== 2 && this.materials.iron !== 1 && this.materials.flint !== 1) {
            this.startAnimation(8,15);
            this.currentLoop = 2;
        } else 
        if (this.directionX >= 0 && this.materials.iron === 1 && this.materials.flint !== 1 && this.currentLoop !== 3) {
            this.startAnimation(48,55);
            this.currentLoop = 3;
        } else 
        if (this.directionX < 0 && this.materials.iron === 1 && this.materials.flint !== 1 && this.currentLoop !== 4) {
            this.startAnimation(56,63);
            this.currentLoop = 4;
        } else 
        if (this.directionX >= 0 && this.materials.flint === 1 && this.materials.iron !== 1 && this.currentLoop !== 5) {
            this.startAnimation(32,39);
            this.currentLoop = 5;
        } else 
        if (this.directionX < 0 && this.materials.flint === 1 && this.materials.iron !== 1 && this.currentLoop !== 6) {
            this.startAnimation(40,47);
            this.currentLoop = 6;
        }
    }

    update = () => {
    this.calculateCollisionDMGModifier();

    if ((this.getCenterX() < -300 || this.getCenterX() > canvas.width+300) || (this.getCenterY() < -300 || this.getCenterY() > canvas.height+300)) {

    if (this.materials.iron === 1) {
        campfire.materials.iron += 1; 
        this.materials.iron = 0;
        console.log("iron stolen");
    } 
    if (this.materials.flint === 1) {
        campfire.materials.flint += 1;
        this.materials.flint = 0;
        console.log("flint stolen");
    } 
    
    this.active = false;
    }

    if (!this.stunState && this.health <= 0) {
        this.onDeath();
    }

    this.center.x = (this.position.x) +(this.dimensions.width/2)
    this.center.y = (this.position.y) +(this.dimensions.height/2)

    if (this.currentLoop === 1 || this.currentLoop === 3 || this.currentLoop === 5) {this.shadowPosition.x = this.position.x+16} else if (
        this.currentLoop === 2 || this.currentLoop === 4 || this.currentLoop === 6) {this.shadowPosition.x = this.position.x+12}
        this.shadowPosition.y = this.position.y + 56;

    if (this.stunState) {
        
        if (this.materials.iron >= 1) {
            this.materials.iron = 0;
            this.updateAnimation();
            let iron = new Iron(this.getCenterX(),this.getCenterY(),9,9,"images/iron.png",4,4,false);
        }
        if (this.materials.flint >= 1) {
            this.materials.flint = 0;
            this.updateAnimation();
            let flint = new Flint(this.getCenterX(),this.getCenterY(),9,9,"images/flint.png",4,4,false);
        }

        this.animDurationPerSprite = 1000;
        
        // directionX = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*(this.collisionDMGModifier+1))*(this.targetDelta.x / this.targetDelta.distance);
        // directionY = ((Math.abs(swordObject.rotationStep)+1)*swordObject.knockbackModifier*(this.collisionDMGModifier+1))*(this.targetDelta.y / this.targetDelta.distance);

        this.friction += 0.008;

        this.position.x += this.directionX/this.friction;
        this.position.y += this.directionY/this.friction;

        this.stunTime -= 0.1
        if (this.stunTime <= 0) {
            this.stunState = false;
            this.hittable = true;
            //this.calculateStunTime();
            //swordObject.weight;
            this.friction = 0.1;
        }

    } else if (this.resourceDetected && !this.stunState) {
        this.calculateStunTime();
        this.animDurationPerSprite = 4/this.speed;

        this.collectionTime -= 0.1;
        this.speed -= 0.05;
        if (this.collectionTime <= 0) {
            this.resourceDetected = false;
            this.collectionTime = 7;
        }

        this.speed = 2.8;

        this.targetDelta.distance = Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2);
        
        // Normalize direction
        this.directionX = this.targetDelta.x / this.targetDelta.distance;
        this.directionY = this.targetDelta.y / this.targetDelta.distance;
  
        // Update object position with constant speed
        this.position.x += this.directionX * this.speed;
        this.position.y += this.directionY * this.speed;

        this.updateAnimation();
        // Update Animation
    } else if (this.materials.flint === 1 || this.materials.iron === 1) {
        this.calculateStunTime();

        this.speed = 1.65;
        this.animDurationPerSprite = 4/this.speed;

        // Calculate direction towards the center
        this.targetDelta.x = (this.center.x - campfire.center.x);
        this.targetDelta.y = (this.center.y - campfire.center.y);
  
        // Calculate distance to the center
        this.targetDelta.distance = Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2);
        
        // Normalize direction
        this.directionX = this.targetDelta.x / this.targetDelta.distance;
        this.directionY = this.targetDelta.y / this.targetDelta.distance;
  
        // Update object position with constant speed
        this.position.x += this.directionX * this.speed;
        this.position.y += this.directionY * this.speed;

        this.updateAnimation();

    } else {
        this.calculateStunTime();
        
        this.speed = 2.2;
        this.animDurationPerSprite = 5.5/this.speed;

        // Calculate direction towards the center
        this.targetDelta.x = (campfire.center.x - this.center.x);
        this.targetDelta.y = (campfire.center.y - this.center.y);
  
        // Calculate distance to the center
        this.targetDelta.distance = Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2);
        
        // Normalize direction
        this.directionX = this.targetDelta.x / this.targetDelta.distance;
        this.directionY = this.targetDelta.y / this.targetDelta.distance;
  
        // Update object position with constant speed
        this.position.x += this.directionX * this.speed;
        this.position.y += this.directionY * this.speed;

        this.updateAnimation();
        } 
    }
}

export {Goblin}