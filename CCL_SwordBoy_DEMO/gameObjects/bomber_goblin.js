import {Goblin} from "./goblin.js";
import {campfire, playerFigure, swordObject} from "../main.js";
import { Bomb } from "./bomb.js";

class BombGoblin extends Goblin {
    speed = 1.5;
    health = 1;

dropResource = () => {
    let bomb = new Bomb(50, 50, 15, 11,"./images/bombSpriteSheet.png",4,4,this);
}

onCollision = (otherObject) => {

    if(otherObject.constructor.name === "Fire") {
        otherObject.health -= 1;
        otherObject.updateHealth();
        this.dropResource();
        this.onDeath();
    }    
    if(otherObject.constructor.name === "CollisionCircle") {
        this.targetDelta.x = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.x - otherObject.getCenterX())+((playerFigure.position.x - playerFigure.previousPosition.x)) + ((swordObject.getSwordTipPositionX() - swordObject.previousSwordTipPosition.x)));
        this.targetDelta.y = (4*(swordObject.weight - this.weight)*this.collisionDMGModifier)*((this.center.y - otherObject.getCenterY())+((playerFigure.position.y - playerFigure.previousPosition.y)) + ((swordObject.getSwordTipPositionY() - swordObject.previousSwordTipPosition.y)));
        this.onHit();
    }
    
}

    update = () => {
        this.calculateCollisionDMGModifier();

        if (!this.stunState && this.health <= 0) {
            this.onDeath();
        }

        this.animDurationPerSprite = 5.5/this.speed;
        
        this.center.x = (this.position.x) +(this.dimensions.width/2)
        this.center.y = (this.position.y) +(this.dimensions.height/2)

        if (this.currentLoop === 1) {this.shadowPosition.x = this.position.x+16} else if (
            this.currentLoop === 2) {this.shadowPosition.x = this.position.x+12}
        this.shadowPosition.y = this.position.y + 56

        if (this.stunState) {
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
            
            this.animDurationPerSprite = 5.5/this.speed;
    
            // Calculate direction towards the center
            this.targetDelta.x = (campfire.center.x - this.center.x);
            this.targetDelta.y = (campfire.center.y - this.center.y);
      
            // Calculate distance to the center
            this.targetDelta.distance = Math.sqrt(this.targetDelta.x ** 2 + this.targetDelta.y ** 2);
            
            // Normalize direction
            let directionX = this.targetDelta.x / this.targetDelta.distance;
            let directionY = this.targetDelta.y / this.targetDelta.distance;
      
            // Update object position with constant speed
            this.position.x += directionX * this.speed;
            this.position.y += directionY * this.speed;

        if (directionX >= 0 && this.currentLoop != 1) {
            this.startAnimation(16,23);
            this.currentLoop = 1;
        } else 
        if (directionX < 0 && this.currentLoop != 2) {
            this.startAnimation(24,31);
            this.currentLoop = 2;
        }
        }
    }
}


export {BombGoblin}