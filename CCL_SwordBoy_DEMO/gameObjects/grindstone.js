import { ImageObject } from "./imageObject.js";
import { center, swordObject, playerFigure } from "../main.js";
import { Flint } from "./flint.js";

class Grindstone extends ImageObject {
    onCollision = (otherObject) => {
        if (otherObject.constructor.name === "SquarePacMan" && otherObject.keys.interact) {
            otherObject.keys.interact = false;
            if (playerFigure.materials.flint > 0 && swordObject.swordSize > 1) {
                playerFigure.materials.flint -= 1;
                swordObject.swordSize -= 1;
                swordObject.updateSwordSize();
                this.materials -= 1;
                this.animationFlip = true;
            }
        }
    }
    onDetection = (otherObject) => {
                if (otherObject.constructor.name === "Flint" && (this.materials === otherObject.anvilID) && (this.animationFlip)) {
                otherObject.active = false;
                //this.animationFlip = false;
        }
    }

materials = 0;
detecting = true;
visionRadius = 150;

updateAnimation = () => {
    const displacementX = (this.getCenterX()-20) + (Math.random()*120) -60
    const displacementY = (this.getCenterY()+10) + (Math.random()*40)
    
    let flint = new Flint(displacementX, displacementY,9,9,"images/flint.png",4,4,true,true,this.materials);
}

animationFlip = false;
dimensions = {
        "width": this.spriteWidth*this.imageScaleFactor,
        "height": this.spriteHeight*this.imageScaleFactor
}

radius = 60;

update = () => {
    this.position.x = center.position.x - 84;
    this.position.y = center.position.y + 4;
}

}

export {Grindstone}