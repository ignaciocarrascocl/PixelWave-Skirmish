import * as PIXI from 'pixi.js';

export function createRedCircles(app) {
  // Define the size and spacing of the circles
  const circleSize = 30;
  const circleSpacing = 10;

  // Define the color of the circles
  const circleColor = 0xFF0000;

  // Create the circles in the specified pattern
  const circles = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if ((x === 0 || x === 2) && (y === 0 || y === 2) && !(x === 1 && y === 1)) {
        // Create a red circle for positions (0,0), (0,2), (2,0), and (2,2)
        const circle = new PIXI.Graphics();
        circle.beginFill(circleColor);
        circle.drawCircle(x * circleSize + (x - 1) * circleSpacing, y * circleSize + (y - 1) * circleSpacing, circleSize);
        circle.endFill();
        circles.push(circle);
        app.stage.addChild(circle);
      }
    }
  }

  // Center the circles in the canvas
  app.stage.position.set(app.screen.width / 2, app.screen.height / 2);

  // Append the app's view to the DOM
  document.body.appendChild(app.view);

  return app;
}
