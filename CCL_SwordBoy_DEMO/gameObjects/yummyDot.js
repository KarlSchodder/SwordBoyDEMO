import {GameObject} from "./gameObject.js"
import {canvasContext} from "../gameLayers/canvasLayer.js";

class YummyDot extends GameObject{
    color = "red";
    
    onCollision	= (otherObject) => {
        
    }

    update = () => {
        this.position.x = this.position.x;
        this.position.y = this.position.y;
    }

    draw = () => {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
}

export {YummyDot}