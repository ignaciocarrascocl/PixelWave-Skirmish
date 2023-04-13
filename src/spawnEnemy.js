import * as PIXI from "pixi.js";
import { state } from "./state";
import { playSound } from "/src/sounds";

export function spawnEnemy(app, player) {
  if (!state.waiting && state.gameStarted) {
    let currentWave = state.wave;
    let wave = state.waves[currentWave];
    let types = ["type1", "type2", "type3"];
    for (let i = 0; i < types.length; i++) {
      let type = types[i];
      if (wave[type] > state.generatedEnemies[type]) {
        const enemy = createEnemy(app, player, type);
        state.enemies.push(enemy);
        state.enemyCounter++;
        state.generatedEnemies[type]++;
        state.gameStarted = true;
        playSound("eject.wav");
        return;
      }
    }
    state.waveReady = true;
  }
}

function createEnemy(app, player, type) {
  const pattern =
    state.patterns[Math.floor(Math.random() * state.patterns.length)];
  const enemy = new PIXI.Container();
  enemy.customColor = "";
  const blockSize = 10;
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell) return;
      const block = new PIXI.Graphics();
      const colorSetIndex = type === "type1" ? 0 : type === "type2" ? 1 : 2;
      const randomColorIndex = Math.floor(
        Math.random() * state.colors[colorSetIndex].length
      );
      const randomColor = state.colors[colorSetIndex][randomColorIndex];
      const movement =
        type === "type1"
          ? movementType1(enemy, app).update
          : type === "type2"
          ? movementType2(enemy, app, player).update
          : movementType3(enemy, app).update;
      enemy.move = movement;
      const maxX =
        app.screen.width - enemy.width - app.screen.width * 0.2;
      const minX = app.screen.width * 0.2 + enemy.width;
      console.log(maxX, minX)
      const xPosition = Math.random() * (maxX - minX) + minX;
      enemy.position.set(xPosition, -30);
      enemy.customColor = randomColor;
      block.beginFill(randomColor);
      block.drawRect(0, 0, blockSize, blockSize);
      block.endFill();
      block.x = j * blockSize;
      block.y = i * blockSize;
      enemy.addChild(block);
    });
  });
  app.stage.addChild(enemy);
  return { container: enemy, update: enemy.move };
}

function movementType1(enemy, app) {
  const initialDistance = app.screen.height * 0.2;
  const maxDistance = app.screen.height * 0.7;
  const minDistance = app.screen.height * 0.1;
  let currentDistance = initialDistance;
  let timeCounter = 0;
  let moveDirection = 1;
  const maxTimeCounter = 240; // doubled the time counter to slow down the movement
  const horizontalSpeed = Math.random() * 2 + 0.5; // random horizontal speed between 0.5 and 2.5
  const amplitude = app.screen.height * 0.005; // amplitude of the sinusoidal movement
  const update = () => {
    timeCounter++;

    if (timeCounter >= maxTimeCounter) {
      currentDistance = Math.random() * initialDistance;
      timeCounter = 0;

      if (moveDirection === 1 && enemy.y > maxDistance) {
        moveDirection = -1;
      } else if (moveDirection === -1 && enemy.y < minDistance) {
        moveDirection = 1;
      }
    }

    enemy.y +=
      amplitude *
      Math.sin((2 * Math.PI * timeCounter) / maxTimeCounter) *
      moveDirection; // sinusoidal vertical movement
    enemy.x += horizontalSpeed * moveDirection; // horizontal movement

    // Keep the enemy within the screen bounds
    if (enemy.x >= app.screen.width - enemy.width) {
      moveDirection = -1;
    } else if (enemy.x <= 0) {
      moveDirection = 1;
    }
  };
  return { update };
}

function movementType2(enemy, app) {
  const initialY = app.screen.height * 0.2;
  const maxDistance = app.screen.height * 0.7;
  const minDistance = app.screen.height * 0.1;
  const enemyWidth = enemy.width;
  const enemyHeight = enemy.height;
  let currentY = initialY;
  let timeCounter = 0;
  let moveDirection = 1;
  const maxTimeCounter = 240;
  const amplitude = app.screen.height * 0.005;
  const update = () => {
    timeCounter++;

    if (timeCounter >= maxTimeCounter) {
      currentY = Math.random() * (maxDistance - minDistance) + minDistance;
      timeCounter = 0;

      if (moveDirection === 1 && enemy.y > currentY) {
        moveDirection = -1;
      } else if (moveDirection === -1 && enemy.y < currentY) {
        moveDirection = 1;
      }
    }

    enemy.y +=
      amplitude *
      Math.sin((2 * Math.PI * timeCounter) / maxTimeCounter) *
      moveDirection;

    // Keep the enemy within the screen bounds
    if (enemy.x >= app.screen.width - enemyWidth) {
      enemy.x = app.screen.width - enemyWidth;
    } else if (enemy.x <= 0) {
      enemy.x = 0;
    }
    if (enemy.y >= app.screen.height - enemyHeight) {
      enemy.y = app.screen.height - enemyHeight;
    } else if (enemy.y <= 0) {
      enemy.y = 0;
    }
  };

  return { update };
}

function movementType3(enemy, app) {
  const endY1 = app.screen.height * 0.4;
  const endX = enemy.x;
  const endY2 = app.screen.height - enemy.height;
  const endY3 = app.screen.height * 0.1;
  const endY4 = app.screen.height * 0.2;
  enemy.x = Math.random() * (app.screen.width * 0.8) + app.screen.width * 0.1;
  let timeCounter = 0;
  let moveType = 1;
  const moveSpeed = app.screen.height * 0.005;

  const update = () => {
    timeCounter++;

    if (moveType === 1) {
      enemy.y += moveSpeed;
      if (enemy.y >= endY1) {
        moveType = 2;
        timeCounter = 0;
      }
    } else if (moveType === 2) {
      enemy.x += (endX - enemy.x) / (app.ticker.FPS * 1); // move in 1 second
      enemy.y = endY1;
      if (timeCounter >= app.ticker.FPS * 1) {
        moveType = 3;
        timeCounter = 0;
      }
    } else if (moveType === 3) {
      enemy.y += moveSpeed;
      if (enemy.y >= endY2) {
        moveType = 4;
        timeCounter = 0;
      }
    } else if (moveType === 4) {
      enemy.y -= moveSpeed;
      if (enemy.y <= endY3) {
        moveType = 5;
        timeCounter = 0;
      }
    } else if (moveType === 5) {
      enemy.y -= moveSpeed;
      if (enemy.y <= endY4) {
        moveType = 1;
        timeCounter = 0;
      }
    }

    // Keep the enemy within the screen bounds
    if (enemy.x >= app.screen.width - enemy.width) {
      enemy.x = app.screen.width - enemy.width;
    } else if (enemy.x <= 0) {
      enemy.x = 0;
    }
    if (enemy.y >= app.screen.height - enemy.height) {
      enemy.y = app.screen.height - enemy.height;
    } else if (enemy.y <= 0) {
      enemy.y = 0;
    }
  };

  return { update };
}
