import { DeathAnimation } from "./death_animation.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";

class Smoke extends DeathAnimation{

    layerModifier = 1000;

    hittable = false;
    stunTime = 7;
    
    updateAnimation = () => {
        this.position.x = this.enemy.cloudPosition.x;
        this.position.y = this.enemy.cloudPosition.y;
        this.startAnimation(0,6);
    }
    
    draw = () => {
        canvasContext.save(); // Save the current transformation matrix
        canvasContext.fillStyle = this.color;
            // Translate to the center of the rectangle
        canvasContext.translate(this.position.x-68, this.position.y-68);
        
            // Rotate the rectangle
            //canvasContext.rotate(this.swordAngle);
      
            // Draw the rectangle
            //canvasContext.fillRect(-this.dimensions.width-20, (-this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);
    
        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
            this.flipAnimSprite();
            canvasContext.restore(); 
    }

    update = () => {
        this.stunTime -= 0.1;
        if (this.stunTime < 0) {
            this.active = false;
        }
    }
}

export {Smoke}