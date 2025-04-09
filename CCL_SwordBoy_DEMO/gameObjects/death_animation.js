import { ImageObject } from "./imageObject.js";
import { canvasContext } from "../gameLayers/canvasLayer.js";

class DeathAnimation extends ImageObject {

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, enemy) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
 
            this.enemy = enemy;
            this.calculateSpriteRowCount();
            this.updateAnimation();
        }

layerModifier = 500;

hittable = false;
stunTime = 7;

updateAnimation = () => {
    this.position.x = this.enemy.getCenterX()-32;
    this.position.y = this.enemy.getCenterY()-80;
    this.startAnimation(0,15);
    this.enemy.active = false;
    console.log("animation started")
}

    update = () => {
        this.stunTime -= 0.1;
        if (this.stunTime < 0) {
            this.active = false;
        }
    }
}
export {DeathAnimation}