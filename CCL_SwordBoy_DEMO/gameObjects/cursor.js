import {GameObject} from "./gameObject.js";
import {canvasContext} from "../gameLayers/canvasLayer.js";
import {ImageObject} from "./imageObject.js";

class Cursor extends ImageObject {

layerModifier = 5000;
currentLoop = 1;
cursorClick = false;
cursorCollector = true;

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

    onCollision	= (otherObject) => {
        
    }

    update = () => {
        this.center.x = (this.position.x + (this.dimensions.width/2))
        this.center.y = (this.position.y + (this.dimensions.height/2))

        console.log(this.layerModifier);

        if (this.cursorClick) {
            //this.layerModifier += 500;
            console.log("mouse actually clicked")
            this.cursorClick = false;
        }

        if (this.currentLoop === 1) {
            this.startAnimation(0,1)
            this.currentLoop = 2;
        }
    }

}

export {Cursor}