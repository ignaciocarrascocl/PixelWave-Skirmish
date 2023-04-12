import * as PIXI from "pixi.js";

// Function to generate the player
export function createPlayer(app) {
  const player = new PIXI.Container();

  app.stage.addChild(player);

  return player;
}
