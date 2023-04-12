import * as PIXI from "pixi.js";
import { state} from "./state";

export function restartPlayer(player, app){
// Define the tetramino shapes
const shape = [
    // I
    [[0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0 ],
    [1, 1, 1, 1, 1, 1]]
  ];
    // Choose a random tetramino shape
    const tetramino = shape[Math.floor(Math.random() * shape.length)];
    const blockSize = state.blockSize;
      // Loop through the tetramino array and add blocks to the player container
  for (let i = 0; i < tetramino.length; i++) {
    for (let j = 0; j < tetramino[i].length; j++) {
      if (tetramino[i][j] === 1) {
        const block = new PIXI.Graphics();
        block.beginFill(0xffffff);
        block.drawRect(0, 0, blockSize, blockSize);
        block.endFill();
        block.x = j * blockSize;
        block.y = i * blockSize;
        player.addChild(block);
      }
    }
  }

    player.x = (app.screen.width - player.width) / 2;
    player.y = app.screen.height - player.height * 2;
}