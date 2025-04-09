import { playerFigure, anvil } from "../main.js";
import { ImageObject } from "./imageObject.js";
import { Resource } from "./resource.js";

class Iron extends Resource {

dimensions = {
    "width": this.spriteWidth*this.imageScaleFactor,
    "height": this.spriteHeight*this.imageScaleFactor
}

resource = 1;

updateAnimation = () => {
    if (this.resource === 1) {
        this.startAnimation(0,31);
        this.resource = 3;
    }
}

removeItem = () => {
    playerFigure.materials.iron -= 1;
    anvil.materials -= 1;
}

snapToWorkstation = () => {
    this.position.x = (anvil.getCenterX()-20) + (Math.random()*120) -60
    this.position.y = (anvil.getCenterY()+10) + (Math.random()*40)
}

getCenterX = () => {
    return (this.position.x + this.dimensions.width / 2);
}
getCenterY = () => {
    return (this.position.y + this.dimensions.height / 2);
}
getRadius= () => {
    return (this.radius)
}

}

export {Iron}