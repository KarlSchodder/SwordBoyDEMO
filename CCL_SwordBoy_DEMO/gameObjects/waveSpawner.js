import { GameObject } from "./gameObject.js";
import { canvas, canvasContext, canvasBoundaries } from "../gameLayers/canvasLayer.js";
import { campfire } from "../main.js";
import { Goblin } from "./goblin.js";
import { BombGoblin } from "./bomber_goblin.js";

class WaveSpawner extends GameObject {

radius = 100;
waveActive = false;
waveCounter = 0;
spawnInterval = 200;
spawnTimer = 0;

directionX = 1;
directionY = 1;

constructor(x, y, width, height, entityID) {
    super(x, y, width, height)
    this.entityID = entityID;
}

updateWaveActivity = () => {

}

updateCanvasPosition = () => {

}

boundaries = {
    "getLeftBoundary" : () => {
        return this.position.x;
    },
    "getTopBoundary" : () => {
        return this.position.y;
    },
    "getRightBoundary" : () => {
        return this.position.x+this.dimensions.width;
    },
    "getBottomBoundary" : () => {
        return this.position.y+this.dimensions.height;
    }
}

placeWaveSpawners = () => {
    switch(this.entityID) {
        case 1:
        this.position.x = -50
        this.position.y = -50
            break;
        case 2:
        this.position.x = canvas.width
        this.position.y = -50
            break;
        case 2:
        this.position.x = -50
        this.position.y = canvas.height
            break;
        case 4:
        this.position.x = canvas.width
        this.position.y = canvas.height
            break;
    }
}

checkBounce = () => {

}

waveSpawnSwitcher = () => {
        console.log("WAVE", campfire.waveCounter);
        if (campfire.waveCounter > 0 && campfire.waveCounter <=3 && this.entityID === 1) {
            this.waveActive = true;
        } else if (campfire.waveCounter > 3 && campfire.waveCounter <= 7 && this.entityID <= 2) {
            this.waveActive = true;
        } else if (campfire.waveCounter > 7 && campfire.waveCounter <= 10 && this.entityID<= 3) {
            this.waveActive = true;
        } else if (campfire.waveCounter > 10 && this.entityID<=4) {
            this.waveActive = true;
        }
}

update = () => {



// WAVES 2-3

if (campfire.waveCounter <= 3 && this.waveActive) {
if (campfire.entityCounter < campfire.entityMax) {
    this.spawnTimer += 1;
    if (this.spawnTimer > this.spawnInterval) {
        //Spawn Enemies
        if (this.entityID === 1) {
        let newGoblin = new Goblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10*campfire.waveCounter);
        campfire.entityCounter += 1;
        this.spawnInterval = (Math.random()*250)+50;
        this.spawnTimer = 0;
        } 
    //     else if (this.entityID === 2) {
    //     let newBombGoblin = new BombGoblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,0);
    //     campfire.entityCounter += 1;
    //     this.spawnInterval = (Math.random()*600)+50;
    //     this.spawnTimer = 0;
    // }
    //     if ((this.previousPosition.x - this.position.x) <= 0.001 && (this.previousPosition.y - this.position.y) > 0.001) {
    //         this.directionX = 0;
    //         this.directionY *= -1*(Math.random());
    //     } else if ((this.previousPosition.y - this.position.y) <= 0.001 && (this.previousPosition.x - this.position.x) > 0.001) {
    //         this.directionY = 0;
    //         this.directionX *= -1*(Math.random());
    //     }
    }
} else if (campfire.entityCounter >= campfire.entityMax) {
    //Test For Enemies Spawned 
    campfire.waveCounter += 1;
    campfire.waveSpawnSwitcher();
    this.spawnInterval = 1500;
    campfire.entityCounter = 0;
    campfire.entityMax = (3*campfire.waveCounter)+4;
    //campfire.waveActive = false;
}
}

//WAVES 4-6

if (campfire.waveCounter > 3 && campfire.waveCounter <= 7 && this.waveActive) {
if (campfire.entityCounter < campfire.entityMax) {
    this.spawnTimer += 1;
    if (this.spawnTimer > this.spawnInterval) {
        //Spawn Enemies
        if (this.entityID === 1) {
        let newGoblin = new Goblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10*campfire.waveCounter);
        campfire.entityCounter += 1;
        this.spawnInterval = (Math.random()*250)+50;
        this.spawnTimer = 0;
        } else if (this.entityID === 2) {
        let newBombGoblin = new BombGoblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,0);
        campfire.entityCounter += 1;
        this.spawnInterval = (Math.random()*600)+50;
        this.spawnTimer = 0;
    }
}
} 

if (campfire.entityCounter > campfire.entityMax) {
    // Test For Enemies Spawned 
    campfire.entityCounter = 0;
    campfire.waveCounter += 1;
    campfire.waveSpawnSwitcher();
    this.spawnInterval = 1500;
    campfire.entityMax = ((Math.random()*4)*this.waveCounter)+this.waveCounter;
    //campfire.waveActive = false;
}
}

//WAVES 7 Onwards

if (campfire.waveCounter > 7 && this.waveActive) {
    if (campfire.entityCounter < campfire.entityMax) {
        this.spawnTimer += 1;
        if (this.spawnTimer > this.spawnInterval) {
            //Spawn Enemies
            if (this.entityID === 1) {
            let newGoblin = new Goblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10*campfire.waveCounter);
            campfire.entityCounter += 1;
            this.spawnInterval = (Math.random()*250)+50;
            this.spawnTimer = 0;
            } else if (this.entityID <= 3) {
            let newBombGoblin = new BombGoblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,0);
            campfire.entityCounter += 1;
            this.spawnInterval = (Math.random()*600)+50;
            this.spawnTimer = 0;
            } else if (this.entityID === 4) {
            let newGoblin = new Goblin(this.position.x,this.position.y,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10*campfire.waveCounter);
            campfire.entityCounter += 1;
            this.spawnInterval = (Math.random()*100)+30;
            this.spawnTimer = 0;
            }
    }
    }
    if (campfire.entityCounter > campfire.entityMax) {
        // Test For Enemies Spawned 
        campfire.entityCounter = 0;
        campfire.waveCounter += 1;
        campfire.waveSpawnSwitcher();
        this.spawnInterval = 1500;
        campfire.entityMax = ((Math.random()*4)*this.waveCounter)+this.waveCounter;
        //campfire.waveActive = false;
    }
}


if (this.directionX <= 0.001 && this.directionY <= 0.001) {(this.placeWaveSpawners())}
else if (this.directionX !== 0) {this.directionY = 0}
else if (this.directionY !== 0) {this.directionX = 0}


//BOUNCING
    if ((this.position.x > -50 && this.position.x < canvas.width) && (this.position.y > -50 && this.position.y < canvas.height)) {
        this.placeWaveSpawners(1);
        this.placeWaveSpawners(2);
        this.placeWaveSpawners(3);
        this.placeWaveSpawners(4);
    } else {

    if (this.directionX !==0 && this.directionY === 0) {
        this.position.x += this.directionX
    } else if (this.directionY !==0 && this.directionX === 0) {
        this.position.y += this.directionY
    }

    if (this.position.x >= (canvas.width) && this.position.y <= -50) {
        this.position.x = canvas.width;
        this.position.y = -50;
        const randomizer = Math.random();

        if (randomizer > 0.5) {
            this.directionX = -1*(3*Math.random()+1);
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = (3*Math.random()+1);
        }

    } else

    if (this.position.y >= (canvas.height) && this.position.x <= -50) {
        this.position.y = canvas.height;
        this.position.x = -50;
        const randomizer = Math.random();

        if (randomizer > 0.5) {
            this.directionX = (3*Math.random()+1);
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = -1*(3*Math.random()+1);
        }

    } else

    if (this.position.x <= -50 && this.position.y <= -50) {
        this.position.x = -50;
        this.position.y = -50;
        const randomizer = Math.random();

        if (randomizer > 0.5) {
            this.directionX = -1*(3*Math.random()+1);
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = (3*Math.random()+1);
        }
    } else     
    
    if (this.position.y >= (canvas.height) && this.position.x >= (canvas.width)) {
        this.position.y = canvas.height;
        this.position.x = canvas.width;
        const randomizer = Math.random();

        if (randomizer > 0.5) {
            this.directionX = -1*(3*Math.random()+1);
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = -1*(3*Math.random()+1);
        }

    }
    }
}
}





export {WaveSpawner}