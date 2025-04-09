import {GameObject} from "./gameObject.js";
import {playerFigure, swordObject} from "../main.js";
import { canvasContext} from "../gameLayers/canvasLayer.js";

class CollisionCircle extends GameObject{

    constructor(x, y, radius, relativePosition){
    super (x,y)
    this.radius = radius;
    this.relativePosition = relativePosition;
    }


actualNormalizedPosition = 0;

update = () => {
    //if (this.relativePosition > swordObject.swordSize+1) {this.hittable = false}
    this.actualNormalizedPosition = (swordObject.swordLength-45)/(20/this.relativePosition)+45;

    this.position.x = swordObject.getCenterX() + this.actualNormalizedPosition * Math.cos(swordObject.swordAngle+0.345);
    this.position.y = swordObject.getCenterY() + this.actualNormalizedPosition * Math.sin(swordObject.swordAngle+0.345);

    this.radius = 7 + (swordObject.swordSize/4)

    if (this.relativePosition === 19) {
        this.radius = 10;
    } 

    if (swordObject.swordSize <= 14 && this.relativePosition === 19) {
        this.radius = 9;
    } 

    if (swordObject.swordSize <= 11 && this.relativePosition === 19) {
        this.radius = 7;
    } 

    
    if (swordObject.swordSize <= 11 && this.relativePosition === 19) {
        this.radius = 5;
    } 
}

drawCollision = () => {
    if (this.hittable) {
    canvasContext.beginPath();
    canvasContext.arc(this.getCenterX(), this.getCenterY(), this.getRadius(), 0, 2 * Math.PI);
    canvasContext.fillStyle = "rgba(0, 252, 0, 0.2)";
    canvasContext.fill();
    canvasContext.closePath();
    }
}

getCenterX = () => {
        return (this.position.x);
    }
getCenterY = () => {
        return (this.position.y);
    }
getRadius= () => {
        return (this.radius)
    }


onCollision = (otherObject) => {

}

}

export {CollisionCircle}