import * as PIXI from "pixi.js";
import { state } from "./state";

const blockSize = state.blockSize;
export function regainHealth(player) {
  const blocks = player.children;
  
  if (blocks.length === 1) {
    const newBlock = new PIXI.Graphics();
    newBlock.beginFill(0xffffff);
    newBlock.drawRect(0, 0, blockSize, blockSize);
    newBlock.endFill();
    newBlock.x = blocks[0].x;
    newBlock.y = blocks[0].y - blockSize;
    player.addChild(newBlock);
    return;
  }

  let block, adjacent, side;

  do {
    // Select a random block
    block = blocks[Math.floor(Math.random() * blocks.length)];

    // Find if the block has an adjacent block
    adjacent = blocks.filter(b => 
      (Math.abs(b.x - block.x) == blockSize && b.y == block.y) ||
      (Math.abs(b.y - block.y) == blockSize && b.x == block.x)
    );

    // Find if the block has a free side
    if (adjacent.length > 0) {
      const directions = ['left', 'right', 'up', 'down'];
      side = directions.find(dir => 
        !adjacent.some(b => 
          b.x == block.x + (dir == 'left' ? -blockSize : (dir == 'right' ? blockSize : 0)) &&
          b.y == block.y + (dir == 'up' ? -blockSize : (dir == 'down' ? blockSize : 0))
        )
      );
    }
  } while (!side);

  // Add a new block adjacent to the selected block
  const newBlock = new PIXI.Graphics();
  newBlock.beginFill(0xffffff);
  newBlock.drawRect(0, 0, blockSize, blockSize);
  newBlock.endFill();
  newBlock.x = block.x + (side == 'left' ? -blockSize : (side == 'right' ? blockSize : 0));
  newBlock.y = block.y + (side == 'up' ? -blockSize : (side == 'down' ? blockSize : 0));
  player.addChild(newBlock);
}
