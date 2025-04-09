import {Goblin} from "./goblin.js";
import {campfire, swordObject, playerFigure} from "../main.js";
import {canvas, canvasContext} from "../gameLayers/canvasLayer.js";
import {GoblinShadow} from "./goblin_shadow.js";
import { Iron } from "./iron.js";
import { Flint } from "./flint.js";

class MerchantGoblin extends Goblin {
    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, healthModifier, iron, flint) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, healthModifier);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.health = 20;
            this.materials.iron = iron;
            this.materials.flint = flint;
            this.health += healthModifier;
            this.calculateSpriteRowCount();

            console.log("merchant spawned");
            this.respawn();
            let shadow = new GoblinShadow(this,-50,-50,13,9,"./images/enemies/goblin_shadow.png",1,4);
        }

    dropRate = 0.8;
    dropCount = 6;

    updateAnimation = () => {
        if (this.directionX >= 0 && this.currentLoop != 1) {
            this.startAnimation(64,71);
            this.currentLoop = 1;
        } else 
        if (this.directionX < 0 && this.currentLoop != 2) {
            this.startAnimation(72,79);
            this.currentLoop = 2;
        }
    }

    onCollision = (otherObject) => {
        if(otherObject.constructor.name === "CollisionCircle") {
            this.targetDelta.x = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.x - otherObject.getCenterX())+((playerFigure.position.x - playerFigure.previousPosition.x)) + ((swordObject.getSwordTipPositionX() - swordObject.previousSwordTipPosition.x)));
            this.targetDelta.y = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.y - otherObject.getCenterY())+((playerFigure.position.y - playerFigure.previousPosition.y)) + ((swordObject.getSwordTipPositionY() - swordObject.previousSwordTipPosition.y)));
            if (this.materials.iron === 3) {
                this.materials.iron = 0;
                this.updateAnimation();
                let iron = new Iron(this.getCenterX()+5,this.getCenterY()+11,9,9,"images/iron.png",4,4,false);
                let iron2 = new Iron(this.getCenterX()-7,this.getCenterY()+5,9,9,"images/iron.png",4,4,false);
                let iron3 = new Iron(this.getCenterX()+12,this.getCenterY()-3,9,9,"images/iron.png",4,4,false);
            }
            if (this.materials.flint === 3) {
                this.materials.flint = 0;
                this.updateAnimation();
                let flint = new Flint(this.getCenterX()-9,this.getCenterY()+3,9,9,"images/flint.png",4,4,false);
                let flint2 = new Flint(this.getCenterX()+7,this.getCenterY()+8,9,9,"images/flint.png",4,4,false);
                let flint3 = new Flint(this.getCenterX()-6,this.getCenterY()-11,9,9,"images/flint.png",4,4,false);
            }
            if (this.health < 0) {
                this.dropResource();
            }
            this.onHit();
        }
        if(otherObject.constructor.name === "Fire") {
            otherObject.health -= 1;
            otherObject.updateHealth();
            this.onDeath();
        }   
    }

    speed = 1;
    spawnPoint = 1;
    spawnSide = 1;
    targetDelta = {
        "x": 0,
        "y": 0,
        "distance": 0
    }

    update = () => {
    this.calculateCollisionDMGModifier();
    if ((this.getCenterX() < -300 || this.getCenterX() > canvas.width+300) || (this.getCenterY() < -300 || this.getCenterY() > canvas.height+300)){
        campfire.materials.iron += this.materials.iron
        campfire.materials.flint += this.materials.flint
        this.active = false;
    }

        this.animDurationPerSprite = 5/this.speed;
        
        
    if (!this.stunState && this.health <= 0) {
        this.onDeath();
    }

    this.center.x = (this.position.x) +(this.dimensions.width/2)
    this.center.y = (this.position.y) +(this.dimensions.height/2)

        if (this.currentLoop === 1) {this.shadowPosition.x = this.position.x+16} else if (
            this.currentLoop === 2) {this.shadowPosition.x = this.position.x+12}
        this.shadowPosition.y = this.position.y + 56

        if (this.stunState) {
        
            this.updateAnimation();
    
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
    
    } else {
        this.calculateStunTime();

        if (this.fearful) {
            this.speed = 3.2;
        }

        // WALK DIAGONALLY ALONG EDGES
        if(this.spawnSide === 1) {
            //Top Side
            if (this.spawnPoint <= 0.5) {
                this.targetDelta.y = (this.spawnPoint*(canvas.height/2)+canvas.height/4) - this.center.y;
                this.targetDelta.x = (0-this.dimensions.width) - this.center.x - 200;
            } else {
                this.targetDelta.y = (this.spawnPoint*(canvas.height/2)+canvas.height/4) - this.center.y;
                this.targetDelta.x = canvas.width - this.center.x + 200; 
            }
        } else if (this.spawnSide === 2) {
            //Bottom Side
            if (this.spawnPoint > 0.5) {
                this.targetDelta.y = (this.spawnPoint*(canvas.height/2)+canvas.height/4) - this.center.y;
                this.targetDelta.x = (0-this.dimensions.width) - this.center.x - 200;
            } else {
                this.targetDelta.y = (this.spawnPoint*(canvas.height/2)+canvas.height/4) - this.center.y;
                this.targetDelta.x = canvas.width - this.center.x + 200; 
            }
        } else if (this.spawnSide === 3) {
            //Left Side
            if (this.spawnPoint <= 0.5) {
                this.targetDelta.x = (this.spawnPoint*(canvas.width/2)+canvas.width/4) - this.center.x;
                this.targetDelta.y = (0-this.dimensions.height) - this.center.y - 200;
            } else {
                this.targetDelta.x = (this.spawnPoint*(canvas.width/2)+canvas.width/4) - this.center.x;
                this.targetDelta.y = canvas.height - this.center.y + 200;
            }
        } else if (this.spawnSide === 4) {
            //Right Side
            if (this.spawnPoint > 0.5) {
                this.targetDelta.x = (this.spawnPoint*(canvas.width/2)+canvas.width/4) - this.center.x;
                this.targetDelta.y = canvas.height - this.center.y + 200
            } else {
                this.targetDelta.x = (this.spawnPoint*(canvas.width/2)+canvas.width/4) - this.center.x;
                this.targetDelta.y = (0-this.dimensions.height) - this.center.y - 200
            }
        }
    
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
// drawShadow = () => {
//         canvasContext.drawImage("./images/enemies/goblin_shadow.png", 0, 0, 13, 9, this.position.x, this.position.y, 52, 36);
// }

respawn = () => {
        this.spawnPoint = Math.random();

        this.spawnSide = Math.floor(this.spawnPoint * 4) + 1;

        if(this.spawnSide === 1) {
            this.position.x = (Math.random()*(canvas.width/2)+canvas.width/4);
            this.position.y = 0-this.dimensions.height;
        } else if (this.spawnSide === 2) {
            this.position.x = (Math.random()*(canvas.width/2)+canvas.width/4);
            this.position.y = canvas.height;
        } else if (this.spawnSide === 3) {
            this.position.y = (Math.random()*(canvas.height/2)+canvas.height/4);
            this.position.x = 0-this.dimensions.width;
        } else if (this.spawnSide === 4) {
            this.position.y = (Math.random()*(canvas.height/2)+canvas.height/4);
            this.position.x = canvas.width;  
        }
    }
}

export {MerchantGoblin}