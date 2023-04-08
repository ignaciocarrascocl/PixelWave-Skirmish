import * as PIXI from 'pixi.js';
import { createRedCircles } from './generateKeys';

export function createButtonCanvas() {
  // Define the width and height of each pixel
  const pixelSize = 5;

  // Define the color of the pixels
  const pixelColor = 0x000000;

  // Calculate the total width and height of the canvas
  const canvasWidth = pixelSize * 60;
  const canvasHeight = pixelSize * 40;

  // Create a new Pixi Application for the button canvas
  const app = new PIXI.Application({
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: 0xFFFFFF,
  });

  // Create the grid of pixels with borders
  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const graphics = new PIXI.Graphics();
      graphics.lineStyle(1, pixelColor, 1);
      graphics.drawRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      app.stage.addChild(graphics);
    }
  }
  createRedCircles(app)
  // Append the app's view to the DOM
  document.body.appendChild(app.view);

  return app;
}
