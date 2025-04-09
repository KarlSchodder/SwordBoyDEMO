import { ImageObject } from "./imageObject.js";
import { center, swordObject, playerFigure } from "../main.js";
import { Iron } from "./iron.js";

class Anvil extends ImageObject {
    onCollision = (otherObject) => {
        if (otherObject.constructor.name === "SquarePacMan" && otherObject.keys.interact) {
            otherObject.keys.interact = false;
            if (playerFigure.materials.iron > 0 && swordObject.swordSize < 20) {
                playerFigure.materials.iron -= 1;
                swordObject.swordSize += 1;
                swordObject.updateSwordSize();
                this.materials -= 1;
                this.animationFlip = true;
            }
        }
    }
    
    onDetection = (otherObject) => {
        if (otherObject.constructor.name === "Iron" && (this.materials === otherObject.anvilID) && (this.animationFlip)) {
            otherObject.active = false;
            //this.animationFlip = false;
        }
    }

    detecting = true;
    visionRadius = 150;
    materials = 0;

    updateAnimation = () => {
        const displacementX = (this.getCenterX() - 20) + (Math.random() * 120) - 60
        const displacementY = (this.getCenterY() + 10) + (Math.random() * 40)

        let iron = new Iron(displacementX, displacementY, 9, 9, "images/iron.png", 4, 4, true, true, this.materials);
    }

    animationFlip = false;

    dimensions = {
        "width": this.spriteWidth * this.imageScaleFactor,
        "height": (this.spriteHeight * this.imageScaleFactor) - 4
    }

    radius = 60;

    update = () => {
        this.position.x = center.position.x + center.dimensions.width + 8;
        this.position.y = center.position.y + 4;
    }
}

export { Anvil }