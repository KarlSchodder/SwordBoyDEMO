import {canvas, canvasContext, canvasBoundaries} from "../gameLayers/canvasLayer.js";
import {gameObjects} from "../gameLayers/logicLayer.js";
import {cursorInstance} from "../main.js";
import {campfire} from "../main.js";
import {playerFigure} from "../main.js";

class GameObject {

    layerModifier = 0;

    targetDelta = {
        "x": 0,
        "y": 0,
        "distance": 0,
    }

    directionX = 0;
    directionY = 0;

    hittable = true;
    active = true;
    friction = 0.1;

    health = 5;
    radius = 10;

    visionRadius = 5;
    detectable = false;
    detecting = false;

    collisionColor = "red";
    color = "black";

    previousCanvas = {
        "width": canvas.width,
        "height": canvas.height
    }

    previousPosition = {
        "x": 0,
        "y": 0
    }

    position = {
        "x": 50,
        "y": 50
    }

    dimensions = {
        "width": 50,
        "height": 50    
    }    
    
    center = {
        "x": this.position.x + (this.dimensions.width/2),
        "y": this.position.y + (this.dimensions.height/2)
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
    
    onCollision = (otherObject) => {
        // Code to be executed on collision
    }

    onDetection = (otherObject) => {

    }
    
    onHit = () => {

    }

    onDeath = () => {

    }

    drawShadow = () => {

    }

    drawCollision = () => {
        if (this.hittable) {
        canvasContext.beginPath();
        canvasContext.arc(this.getCenterX(), this.getCenterY(), this.getRadius(), 0, 2 * Math.PI);
        canvasContext.fillStyle = "rgba(252, 0, 0, 0.2)";
        canvasContext.fill();
        canvasContext.closePath();
        }
    }

    checkForCollision = () => {
        for (let i = 0; i < gameObjects.length; i++) {
            let checkObject = gameObjects[i];
    
            // Skip self-check
            if (this === checkObject) {
                continue;
            }

            if (this.active && checkObject.active && this.hittable && checkObject.hittable) {

            // if (checkObject.active) {
            //     continue;
            // }
            
            // if (this.active && checkObject.active) {
            //     continue;
            // }

            // Calculate distance between centers
            const centerX = this.getCenterX();
            const centerY = this.getCenterY();
            const checkCenterX = checkObject.getCenterX();
            const checkCenterY = checkObject.getCenterY();

            const dx = centerX - checkCenterX;
            const dy = centerY - checkCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            // Sum of radii
            const radius = this.getRadius();
            const checkRadius = checkObject.getRadius();
            const sumOfRadii = radius + checkRadius;
    
            // Check for collision
            if (distance <= sumOfRadii) {
                // Code executed on collision
                this.onCollision(checkObject);
                checkObject.onCollision(this);
                }
            }
        }
    }

    drawVision = () => {
        if (this.detecting || this.detectable) {
        canvasContext.beginPath();
        canvasContext.arc(this.getCenterX(), this.getCenterY(), this.visionRadius, 0, 2 * Math.PI);
        canvasContext.fillStyle = "rgba(0, 252, 0, 0.2)";
        canvasContext.fill();
        canvasContext.closePath();
        }
    }

    checkForDetection = () => {
        for (let i = 0; i < gameObjects.length; i++) {
            let checkObject = gameObjects[i];
    
            // Skip self-check
            if (this === checkObject) {
                continue;
            }

            if (this.active && checkObject.active && this.detecting && checkObject.detectable) {

            // if (checkObject.active) {
            //     continue;
            // }
            
            // if (this.active && checkObject.active) {
            //     continue;
            // }

            // Calculate distance between centers
            const centerX = this.getCenterX();
            const centerY = this.getCenterY();
            const checkCenterX = checkObject.getCenterX();
            const checkCenterY = checkObject.getCenterY();

            const dx = centerX - checkCenterX;
            const dy = centerY - checkCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            // Sum of radii
            const radius = this.visionRadius;
            const checkRadius = checkObject.visionRadius;
            const sumOfRadii = radius + checkRadius;
    
            // Check for collision
            if (distance <= sumOfRadii) {
                // Code executed on collision
                this.onDetection(checkObject);
                checkObject.onDetection(this);
                }
            }
        }
    }

    createWaveSpawners = () => {
        
    }

    placeWaveSpawners = () => {
        
    }

    updateCanvasPosition = () => {
        this.position.x = 
        (
            (
        ((this.previousPosition.x + (this.dimensions.width/2)) //Center of Previous Position
        -((this.previousCanvas.width/2))) //Find difference to Previous Center of Canvas
        // ^^^ Collect relative x co-ordinate with Previous Center as 0,0
        *((canvas.width)
        /(this.previousCanvas.width)
        ) // Find and deploy Dilation Factor
            -this.dimensions.width/2 // Correct to Apply to Center of Object
            ) 
        )+((canvas.width/2)) 
        // ^^^ Translate Value to top left = 0,0
        this.position.y = 
        (
            (
        ((this.previousPosition.y + (this.dimensions.height/2)) //Center of Previous Position
        -((this.previousCanvas.height/2))) //Find difference to Previous Center of Canvas
        // ^^^ Collect relative y co-ordinate with Previous Center as 0,0
        *((canvas.height)
        /(this.previousCanvas.height)
        ) // Find and deploy Dilation Factor
            -this.dimensions.height/2 // Correct to Apply to Center of Object
            ) 
        )+((canvas.height/2)) 
        // ^^^ Translate Value to top left = 0,0
    }

    angleToCursor = () => {
        let dy = (this.position.y + (this.dimensions.height/2)) - cursorInstance.center.y;
        let dx = (this.position.x + (this.dimensions.width/2)) - cursorInstance.center.x;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    storeCurrentCanvasSize = () => {

        //if (this.previousCanvas.width !== canvas.width) {
            this.previousCanvas.width = window.innerWidth
            
        //}
        ;
        //if (this.previousCanvas.height !== canvas.height) {
            this.previousCanvas.height = window.innerHeight
            
        //}
        ;
        
    }

    angleToObject = (positionX, positionY) => {
        let dy = this.getCenterX() - positionX;
        let dx = this.getCenterY() - positionY;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    angleToPlayer = () => {
        let dy = this.center.y - playerFigure.position.y;
        let dx = this.center.x - playerFigure.position.x;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    storeCurrentPosition = () => {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    restorePreviousPosition = () => {
        this.position.x = this.previousPosition.x;
        this.position.y = this.previousPosition.y;
    }

    update = () => {

    }

    draw = () => {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    constructor(x,y,width,height) {
        this.position.x = x;
        this.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        gameObjects.push(this);
    }


    // checkForCollision = () => {
    //     for (let i = 0; i < gameObjects.length; i++) {
    //         let checkObject = gameObjects[i];
            

    //         //overlap on x axis
    //         if(this === checkObject){
    //             continue;
    //         }
    //         if(this.boundaries.getLeftBoundary() <= checkObject.boundaries.getRightBoundary() &&
    //             this.boundaries.getRightBoundary() >= checkObject.boundaries.getLeftBoundary()) {
    //             //overlap on y axis
    //             if(this.boundaries.getTopBoundary() <= checkObject.boundaries.getBottomBoundary() &&
    //                 this.boundaries.getBottomBoundary() >= checkObject.boundaries.getTopBoundary()) {
    //                 //Code executed on collision
    //                 this.onCollision(checkObject);
    //                 checkObject.onCollision(this);


    //             }
    //         }
    //     }
    // }
}

export {GameObject};