import { canvas, canvasContext, canvasBoundaries } from "../gameLayers/canvasLayer.js";
import { cursorInstance, playerFigure, anvil, grindstone } from "../main.js";
import { GameObject } from "./gameObject.js";
import { ImageObject } from "./imageObject.js";
import { GameOverScreen } from "./gameOverScreen.js";

class SquarePacMan extends ImageObject {

    entityID = 1;

    hardcore = true;

    weight = 7;
    speed = 10 // adjustable top movement speed
    acceleration = 0.1 // adjustable acceleration
    friction = 0.1 // adjustable friction
    diagonalModifier = 0.93;
    velocity = { x: 0, y: 0 }
    materials = {
        "iron": 0,
        "flint": 0
    }

    radius = 8;

    getCenterY = () => {
        return ((this.position.y + this.dimensions.height / 2) + 5);
    }

    currentLoop = 0;

    keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        interact: false
    }

    dead = false;

    position = {
        "x": 100,
        "y": 100
    }

    dimensions = {
        "width": this.spriteWidth * this.imageScaleFactor,
        "height": this.spriteHeight * this.imageScaleFactor
    }

    boundaries = {
        "getLeftBoundary": () => {
            return this.position.x;
        },
        "getTopBoundary": () => {
            return this.position.y;
        },
        "getRightBoundary": () => {
            return this.position.x + this.dimensions.width;
        },
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height;
        }
    }

    color = "black";

    onCollision = (otherObject) => {
        if (otherObject.constructor.name === "Iron" && !otherObject.aesthetic) {
            this.materials.iron += 1;
            console.log(this.materials.iron);

            anvil.updateAnimation();
            anvil.materials += 1;
            // anvil.animationFlip = true;
            console.log(anvil.materials);
            otherObject.active = false;
        }

        if (otherObject.constructor.name === "Flint" && !otherObject.aesthetic) {

            this.materials.flint += 1;
            console.log(this.materials.flint);
            grindstone.updateAnimation();
            grindstone.materials += 1;
            console.log(grindstone.materials);
            //grindstone.updateAnimation();

            otherObject.active = false;
        }
        if ((otherObject.constructor.name === "Goblin" ||
            otherObject.constructor.name === "BombGoblin") && (this.hardcore === true)) {
            let gameOverScreen = new GameOverScreen((canvas.width / 2) - 4004, (canvas.height / 2) - 4004, 2001, 2001, "./images/kittycat_gameover.png", 1, 4, this);
        }
    }

    checkWorldPosition = () => {
        if (this.boundaries.getRightBoundary() <= canvasBoundaries.getLeftBoundary()) {
            this.position.x += (canvasBoundaries.getRightBoundary() + this.dimensions.width)

        } else if (this.boundaries.getBottomBoundary() <= canvasBoundaries.getTopBoundary()) {
            this.position.y += (canvasBoundaries.getBottomBoundary() + this.dimensions.height)

        } else if (this.boundaries.getLeftBoundary() >= canvasBoundaries.getRightBoundary()) {
            this.position.x -= (canvasBoundaries.getRightBoundary() + this.dimensions.width)

        } else if (this.boundaries.getTopBoundary() >= canvasBoundaries.getBottomBoundary()) {
            this.position.y -= (canvasBoundaries.getBottomBoundary() + this.dimensions.height)
        }
    }

    update = () => {
        if (this.currentLoop <= 8) { this.animDurationPerSprite = 32 / this.animationModifier }
        else if (this.currentLoop > 8) { this.animDurationPerSprite = 48 / this.animationModifier }
        ;

        if (this.keys.up) { this.velocity.y -= this.acceleration };
        if (this.keys.down) { this.velocity.y += this.acceleration };
        if (this.keys.left) { this.velocity.x -= this.acceleration };
        if (this.keys.right) { this.velocity.x += this.acceleration };
        if (this.keys.interact) { }

        this.center.x = (this.position.x) + (this.dimensions.width / 2)
        this.center.y = (this.position.y) + (this.dimensions.height / 2)

        // Normalize diagonal movement
        if ((this.keys.up || this.keys.down) && (this.keys.left || this.keys.right)) {
            this.velocity.y *= (this.diagonalModifier) // 1 / sqrt(2)
            this.velocity.x *= (this.diagonalModifier)
        }

        // Apply friction
        this.velocity.x *= 1 - this.friction;
        this.velocity.y *= 1 - this.friction;

        // Stopping Threshold 
        if (Math.abs(this.velocity.y) <= 0.001) { this.velocity.y = 0 }
        if (Math.abs(this.velocity.x) <= 0.001) { this.velocity.x = 0 }

        // Update position based on velocity
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;

        //Animation Handler



        if (this.velocity.x > 0.1 || (this.velocity.y < -0.1 && this.velocity.x === 0)) {
            if (cursorInstance.position.x > this.center.x &&
                cursorInstance.position.y > this.center.y &&
                this.currentLoop !== 1) {
                this.startAnimation(8, 15);
                //console.log("1")
                this.currentLoop = 1;
            } else
                if (cursorInstance.position.x < this.center.x &&
                    cursorInstance.position.y > this.center.y &&
                    this.currentLoop !== 2) {
                    this.startAnimation(0, 7);
                    //console.log("2")
                    this.currentLoop = 2;
                } else
                    if (cursorInstance.position.x < this.center.x &&
                        cursorInstance.position.y < this.center.y &&
                        this.currentLoop !== 3) {
                        this.startAnimation(16, 23);
                        //console.log("3")
                        this.currentLoop = 3;
                    } else
                        if (cursorInstance.position.x > this.center.x &&
                            cursorInstance.position.y < this.center.y &&
                            this.currentLoop !== 4) {
                            this.startAnimation(24, 31);
                            //console.log("4")
                            this.currentLoop = 4;
                        }
        } else
            if (this.velocity.x < -0.1 || (this.velocity.y > 0.1 && this.velocity.x === 0)) {
                if (cursorInstance.position.x > this.center.x &&
                    cursorInstance.position.y > this.center.y &&
                    this.currentLoop !== 5) {
                    this.startAnimation(40, 47);
                    //console.log("5")
                    this.currentLoop = 5;
                } else
                    if (cursorInstance.position.x < this.center.x &&
                        cursorInstance.position.y > this.center.y &&
                        this.currentLoop !== 6) {
                        this.startAnimation(32, 39);
                        //console.log("6")
                        this.currentLoop = 6;
                    } else
                        if (cursorInstance.position.x < this.center.x &&
                            cursorInstance.position.y < this.center.y &&
                            this.currentLoop !== 7) {
                            this.startAnimation(56, 63);
                            //console.log("7")
                            this.currentLoop = 7;
                        } else
                            if (cursorInstance.position.x > this.center.x &&
                                cursorInstance.position.y < this.center.y &&
                                this.currentLoop !== 8) {
                                this.startAnimation(48, 55);
                                //console.log("8")
                                this.currentLoop = 8;
                            }
            } else
                if ((!this.keys.up && !this.keys.left && !this.keys.down && !this.keys.down) ||
                    (this.keys.up && this.keys.left && this.keys.down && this.keys.down) ||
                    (Math.abs(this.velocity.x) <= 0.1 && Math.abs(this.velocity.y) <= 0.1)) {
                    if (cursorInstance.position.x > this.center.x &&
                        cursorInstance.position.y > this.center.y &&
                        this.currentLoop !== 9) {
                        this.startAnimation(72, 79);
                        //console.log("9")
                        this.currentLoop = 9;
                    } else
                        if (cursorInstance.position.x < this.center.x &&
                            cursorInstance.position.y > this.center.y &&
                            this.currentLoop !== 10) {
                            this.startAnimation(64, 71);
                            //console.log("10")
                            this.currentLoop = 10;
                        } else
                            if (cursorInstance.position.x < this.center.x &&
                                cursorInstance.position.y < this.center.y &&
                                this.currentLoop !== 11) {
                                this.startAnimation(88, 95);
                                //console.log("11")
                                this.currentLoop = 11;
                            } else
                                if (cursorInstance.position.x > this.center.x &&
                                    cursorInstance.position.y < this.center.y &&
                                    this.currentLoop !== 12) {
                                    this.startAnimation(80, 87);
                                    //console.log("12")
                                    this.currentLoop = 12;
                                }
                }

        this.checkWorldPosition();
        //console.log(cursorInstance.position);
        //console.log(this.position);
    }

}



export { SquarePacMan };



