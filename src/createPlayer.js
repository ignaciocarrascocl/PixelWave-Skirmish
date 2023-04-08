import * as PIXI from "pixi.js";

// Define the tetramino shapes
const tetraminos = [
  // I
  [[0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0 ],
  [1, 1, 1, 1, 1, 1]]
];

// Function to generate the player
export function createPlayer(app) {
  const player = new PIXI.Container();
  const blockSize = 10;

  // Choose a random tetramino shape
  const tetramino = tetraminos[Math.floor(Math.random() * tetraminos.length)];

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
  app.stage.addChild(player);

  return player;
}
