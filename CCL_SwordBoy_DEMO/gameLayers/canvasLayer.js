import {gameObjects} from "./logicLayer.js";
import {goblin} from "../main.js";

const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

    // Function to set the canvas size based on the window dimensions
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasContext.imageSmoothingEnabled = false;

        for (let i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].active === true) {
            gameObjects[i].updateCanvasPosition();
            gameObjects[i].placeWaveSpawners();
            gameObjects[i].storeCurrentCanvasSize();
            }
        }
  
        // Call your drawing functions here with updated canvas dimensions
        // Example: drawRectangles();
      }
  
      // Initial setup
      setCanvasSize();
  
      // Listen for window resize events and update canvas size accordingly
      window.addEventListener('resize', setCanvasSize);
  
      // Your drawing functions go here
      // Example function drawRectangles() {
      //   // Draw rectangles based on the canvas size
      //   ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      // }
      canvasContext.imageSmoothingEnabled = false;

let canvasBoundaries = {
    "getLeftBoundary" : () => {
        return 0;
    },
    "getTopBoundary" : () => {
        return 0;
    },
    "getRightBoundary" : () => {
        return canvas.width;
    },
    "getBottomBoundary" : () => {
        return canvas.height;
    }
}

export {canvas, canvasContext, canvasBoundaries}