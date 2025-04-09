import {YummyDot} from "./gameObjects/yummyDot.js";
import {SquarePacMan} from "./gameObjects/squarePacman.js";
import {canvas, canvasContext} from "./gameLayers/canvasLayer.js";
import {gameLoop, gameObjects} from "./gameLayers/logicLayer.js";
import {Wall} from "./gameObjects/wall.js";
import {Cursor} from "./gameObjects/cursor.js";
import {Enemy} from "./gameObjects/enemy.js";
import {ImageObject} from "./gameObjects/imageObject.js";
import {Sword} from "./gameObjects/sword.js";
import {Shadow} from "./gameObjects/shadow.js";
import {Fire} from "./gameObjects/campfire.js";
import {Goblin} from "./gameObjects/goblin.js";
import {BombGoblin} from "./gameObjects/bomber_goblin.js";
import {Resource} from "./gameObjects/resource.js";
import {MerchantGoblin} from "./gameObjects/merchant_goblin.js";
import {Iron} from "./gameObjects/iron.js";
import {Flint} from "./gameObjects/flint.js";
import {CollisionCircle} from "./gameObjects/collision_circle.js";
import {Center} from "./gameObjects/center.js";
import { WaveSpawner } from "./gameObjects/waveSpawner.js";
import {Anvil} from "./gameObjects/anvil.js";
import {Grindstone} from "./gameObjects/grindstone.js";

/*
CODELAB ESSENTIALS
 - Statistics
    - Different Player and Sword Stats depending on Sword Size
      - Adapt Player...
        - Acceleration
        - Velocity
        - Friction
      - Adapt Sword
        - Swing Speed
        - Weight
        - Damage
        - Sprite 
 - Wave and Spawn Controller

BUGS BUGS BUGS
 - Shadows Flickering at Spawn
 - Resources can no longer be brought into "cursor collected" 
    mode after enough of them have been collected and/or 
    "cursor collected"
 - Sometimes they can't even be used by the workstation
 - Y sorting shenanigans
 - Goblins still hold resource after getting hit and dropping it
 (solved with a "hit" and "death" sprite)

GIVEN TIME
 - More Enemies
    - Slimes
    - Skeleton
    - Flying Eyeball
 - Bosses 
    - Goblin Chieftain
    - Goblin Elder
 - Enemy "Flavours"
    - Goblins
      - Goblin Brute
        - Targets the player if hit && detected (faster, red eyes)
        - More Health 
        - Wears Armor
        - Brown

      - Goblin Shaman
      - Goblin Thief
        - Spawns if you have more than 10 materials at your campfire
      - Goblin Assassin
        - Only targets the Player
    - Slimes
      - Small
      - Medium
      - Large
      - Poison Variants
    - Skeletons
    - Elves?
    - Black Knights?

 - Scoreboard
    - Adaptive to Canvas Size
 - Charge Attack
    - Collision Arc

AFTER PROJECT
 - Sword Effects
    - Sparks
    - Trailing 
    - Screen Shake (for some enemies too)
 - Weather Effects
    - Rain
    - Snow
    - Wind
    - Sun
    - Fog
 - Nighttime
 - Bosses
 - Fancy Upgrades
    - Bow & Crossbow
    - Tower Defense Flowers
    - Elemental Gems
*/

let playerShadow = new Shadow(120,120,15,9,"./images/playerFigure/player_shadow.png",1,4);
//let goblinShadow = new GoblinShadow(120,120,13,9, "./images/enemies/goblin_shadow.png",1,4);
//let bombGoblinShadow = new BombGoblinShadow(120,120,13,9, "./images/enemies/goblin_shadow.png",1,4);
let center = new Center(0,0,43,20,"images/firepit.png",4,4);
let iron = new Iron(200,700,9,9,"images/iron.png",4,4,true,false);
let iron2 = new Iron(700,700,9,9,"images/iron.png",4,4,true,false);
let iron3 = new Iron(750,800,9,9,"images/iron.png",4,4,true,false);
let flint = new Flint(300,300,9,9,"images/flint.png",4,4,true,false);
let anvil = new Anvil(200,200,19,15,"images/anvil.png",4,4);
let grindstone = new Grindstone(200,200,19,15,"images/grindstone.png",4,4);

let waveSpawner1 = new WaveSpawner(-50,-50,50,50,1);
let waveSpawner2 = new WaveSpawner(canvas.width,-50,50,50,2);
let waveSpawner3 = new WaveSpawner(-50,canvas.height,50,50,3);
let waveSpawner4 = new WaveSpawner(canvas.width,canvas.height,50,50,4);

let goblin = new Goblin(500,900,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10);
//let goblin2 = new Goblin(0,100,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,10);
let bombGoblin = new BombGoblin(200,0,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,5);
let merchantGoblin = new MerchantGoblin(300,450,21,20,"./images/enemies/goblin_sprite_sheet.png",4,4,5);
let playerFigure = new SquarePacMan(((canvas.width/2)+25),((canvas.height/2)+50),15,17,"./images/playerFigure/playerFigure_sprite_sheet.png",12,4);

let campfire = new Fire(500,500,35,36,"images/fire_sprite_sheet.png",4,4,0);

let swordObject = new Sword(120,120,71,27,"./images/playerFigure/sword_sprite_sheet.png",1,4);
let cursorInstance = new Cursor(0,0,10,6,"./images/cursor.png",18,4);

let collisionCircle1 = new CollisionCircle(0,0,12,0)
let collisionCircle2 = new CollisionCircle(0,0,12,1)
let collisionCircle3 = new CollisionCircle(0,0,12,2)
let collisionCircle4 = new CollisionCircle(0,0,12,3)
let collisionCircle5 = new CollisionCircle(0,0,12,4)
let collisionCircle6 = new CollisionCircle(0,0,12,5)
let collisionCircle7 = new CollisionCircle(0,0,12,6)
let collisionCircle8 = new CollisionCircle(0,0,12,7)
let collisionCircle9 = new CollisionCircle(0,0,12,8)
let collisionCircle10 = new CollisionCircle(0,0,12,9)
let collisionCircle11 = new CollisionCircle(0,0,12,10)
let collisionCircle12 = new CollisionCircle(0,0,12,11)
let collisionCircle13 = new CollisionCircle(0,0,12,12)
let collisionCircle14 = new CollisionCircle(0,0,12,13)
let collisionCircle15 = new CollisionCircle(0,0,12,14)
let collisionCircle16 = new CollisionCircle(0,0,12,15)
let collisionCircle17 = new CollisionCircle(0,0,12,16)
let collisionCircle18 = new CollisionCircle(0,0,12,17)
let collisionCircle19 = new CollisionCircle(0,0,12,18)
let collisionCircle20 = new CollisionCircle(0,0,12,19)

function updateCursorPosition(e) {
    cursorInstance.position.x = e.clientX - canvas.getBoundingClientRect().left;
    cursorInstance.position.y = e.clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener('mousemove', updateCursorPosition);
canvas.addEventListener('click', handleMouseClick)
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function handleMouseClick(event) {
  // Handle mouse click logic here
  console.log('Mouse clicked at', event.clientX, event.clientY);
  // You can add your game logic or actions here
  cursorInstance.cursorClick = true;
}

function handleKeyDown(event) {
  handleKeyChange(event, true);
}

function handleKeyUp(event) {
  handleKeyChange(event, false);
}

function handleKeyChange(event, value) {
  switch (event.key) {
    case 'w':
      playerFigure.keys.up = value;
      break;
    case 's':
      playerFigure.keys.down = value;
      break;
    case 'a':
      playerFigure.keys.left = value;
      break;
    case 'd':
      playerFigure.keys.right = value;
      break;
    // case 'c':
    //     swordObject.swordSize += 0.5;
    //     // swordObject.weight -= 1.5;
    //     // swordObject.swingSpeed += 0.0025;
    //     swordObject.updateSwordSize();
    //     break;
    // case 'x':
    //     swordObject.swordSize -= 0.5;
    //     // swordObject.weight += 1.5;
    //     // swordObject.swingSpeed -= 0.0025;
    //     swordObject.updateSwordSize();
    //     break;
    // case 'r':
    //     swordObject.swordSize = 20;
    //     // swordObject.weight = 60;
    //     // swordObject.swingSpeed = 0.020;
    //     // playerFigure.speed = 4;
    //     swordObject.updateSwordSize();
    //     break;
    case 't':
        console.log("Sword Size", swordObject.swordSize, "Sword Base Damage", swordObject.damage);
        console.log("WAVE", campfire.waveCounter);
        console.log("Spawn Interval", waveSpawner1.spawnInterval);
        console.log(campfire.waveActive, waveSpawner1.waveActive, waveSpawner2.waveActive, waveSpawner3.waveActive, waveSpawner4.waveActive);
        break;
    case 'e': 
        playerFigure.keys.interact = value;
        break;
  }
}

requestAnimationFrame(gameLoop);

export {playerFigure, cursorInstance, merchantGoblin, campfire, anvil, grindstone, goblin, bombGoblin, swordObject, center, waveSpawner1, waveSpawner2, waveSpawner3, waveSpawner4};