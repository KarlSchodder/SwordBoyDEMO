import {ImageObject} from "./imageObject.js";
import {GameObject} from "./gameObject.js";
import {canvasContext, canvasBoundaries, canvas} from "../gameLayers/canvasLayer.js";
import {gameObjects} from "../gameLayers/logicLayer.js";
import { playerFigure, waveSpawner1, anvil, waveSpawner4, waveSpawner3, merchantGoblin, waveSpawner2, grindstone, cursorInstance, swordObject } from "../main.js";
import { MerchantGoblin } from "./merchant_goblin.js";
import { Smoke } from "./smoke.js";
import { GameOverScreen } from "./gameOverScreen.js";

class Fire extends ImageObject {
    
constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor, health) {
    super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
            this.imageObject = new Image();
            this.imageObject.addEventListener("load", this.onImageLoaded)
            this.imageObject.src = imagePath;
            this.spriteWidth = width;
            this.spriteHeight = height;
            this.health = health;
            this.animDurationPerSprite = animDurationPerSprite;
            this.imageScaleFactor = imageScaleFactor;
            this.calculateSpriteRowCount();
            this.updateHealth();
        }

    entityID = 2;
    waveCounter = 0;
    waveActive = false;

    entityCounter = 0;
    entityMax = 7;

    materials = {
        "iron": 0,
        "flint": 0
    }

    getCenterY = () => {
        return ((this.center.y)+30);
    }

    dimensions = {
        "width": this.spriteWidth*this.imageScaleFactor,
        "height": this.spriteHeight*this.imageScaleFactor
    }

    gameStart = false;
    gameState = -1;
    hittable = true;

    resourceDropRate = 0.5;
    merchantTimer = 500;

    health = 0;
    stunTime = 5;
    stunState = false;

    radius = 20;

    position = {
        "x": 0,
        "y": 0
    }

    onCollision = (otherObject) => {
    // if(otherObject.constructor.name === "Iron") {
    //         playerFigure.materials.iron += 1;
    //         anvil.materials += 1;
    //         anvil.updateAnimation();
    //         otherObject.active = false;
    //     }

    // if(otherObject.constructor.name === "Flint") {
    //         playerFigure.materials.flint += 1;
    //         grindstone.materials += 1;
    //         grindstone.updateAnimation();
    //         otherObject.active = false;
    //     }
    if(otherObject.constructor.name === "CollisionCircle") {
        this.onHit();
        }
    if(otherObject.constructor.name === "Cursor" && (cursorInstance.cursorClick)) {
    this.waveActive = true;
        if (this.gameState === 1) {
            
            this.health += 1;
            this.waveCounter = 1;
            console.log("game started");
            //this.waveActive = true;
            
            waveSpawner1.waveSpawnSwitcher();
            
            this.gameState = 2;
            this.updateHealth();
            
        }
    }
    if(otherObject.constructor.name === "Explosion") {
        this.onHit();
    }
    }

    onHit = () => {
        if (!this.stunState) {
        this.stunState = true;
        this.health -= 1;
        this.updateHealth(); 
    }
        
    }

    updateCanvasPosition = () => {

    }

    updateHealth = () => {

        if (this.health <= 0) {
            this.health = 0;
        }

        console.log(this.health);
        console.log(this.gameState);

        switch(this.health) {
            case 0:
            this.startAnimation(40,47);
            if (this.gameState === 3) {
                console.log("game over")
                let gameOverScreen = new GameOverScreen((canvas.width/2)-4004, (canvas.height/2)-4004, 2001, 2001,"./images/kittycat_gameover.png",1,4,this);
                this.gameState = -1
            } else if (this.gameState === -1) {
                //this.startAnimation(40,47);
                console.log("game load")
                this.gameState = 0;
                this.updateHealth();
                
            } else if (this.gameState === 0) {
                //&& this.currentAnimation.currentSprite >=40
                 
                //this.startAnimation(this.currentAnimation.currentSprite+8,this.currentAnimation.currentSprite+8);
                
                console.log("game loaded")
                this.gameState = 1;
                this.updateHealth();
            }
                break;
            case 1:
            this.startAnimation(0,7);
            this.radius = 5;
            this.resourceDropRate = 1;
                break;
            case 2:
            this.startAnimation(8,15);
            this.radius = 15;
            this.resourceDropRate = 0.8;
                break;
            case 3:
            this.startAnimation(16,23);
            this.radius = 25;
            this.resourceDropRate = 0.6;
                break;
            case 4:
            this.startAnimation(24,31);
            this.radius = 35;
            this.resourceDropRate = 0.4;
                break;
            case 5:
            this.startAnimation(32,39);
            this.radius = 45;
            this.resourceDropRate = 0.2;
                break;
        }
    }

    cloudPosition = {
        "x": 0,
        "y": 0,
    }

    waveSpawnSwitcher = () => {
        if (this.waveCounter > 0 && this.waveCounter <= 3)
            waveSpawner1.waveActive = true;
        if (this.waveCounter > 3 && this.waveCounter <= 6) {
            waveSpawner1.waveActive = true;
        } else if (this.waveCounter > 6
             //&& this.waveCounter <= 10
             )
            waveSpawner1.waveActive = true;
            waveSpawner2.waveActive = true;
            waveSpawner3.waveActive = true;
            waveSpawner4.waveActive = true;
    }

    update = () => {
        if (this.gameState === -1) {
            swordObject.swordSize = 5;
            swordObject.damage = 3; 
            this.waveActive = false;
            this.waveCounter = 0;
            waveSpawner1.waveActive = false;
        } else if (this.gameState === 2) {
            this.waveActive = true;
            this.gameState = 3;
        }

        if (this.materials.iron >= 3) {
            this.merchantTimer -= 1;
            console.log(this.merchantTimer);
            if (this.merchantTimer <= 0) {
                let flintMerchant = new MerchantGoblin(-100,-100,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,5,0,3);
                this.materials.iron -= 3;
                this.merchantTimer = 500;
            }
        }

        if (this.materials.flint >= 3) {
            this.merchantTimer -= 1;
            console.log(this.merchantTimer);
            if (this.merchantTimer <= 0) {
                let ironMerchant = new MerchantGoblin(-100,-100,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,5,3,0);
                this.materials.flint -= 3;
                this.merchantTimer = 500;
            }
        }

        this.position.x = (canvas.width/2) - (this.dimensions.width/2);
        this.position.y = (canvas.height/2) - (this.dimensions.height/2);

        this.center.x = this.position.x + (this.dimensions.width/2);
        this.center.y = this.position.y + (this.dimensions.height/2);
        
        this.cloudPosition.x = this.center.x;
        this.cloudPosition.y = this.center.y;

        if (this.stunState) {
            this.stunTime -= 0.1
            if (this.stunTime <= 0) {
                this.stunState = false;
            }
        } 
        
        if (!this.stunState) {
            this.stunTime = 5;
        }
    }
}


export {Fire}