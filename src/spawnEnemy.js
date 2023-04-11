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
        let x =
          Math.random() * (app.screen.width - app.screen.width * 0.1 * 2) +
          app.screen.width * 0.1;
        const enemy = createEnemy(x, app, player, type);
        enemy.isShot = false;
        console.log(enemy.isShot)
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

function createEnemy(x, app, player, type) {
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
          ? randomMovement(enemy, app, player).update
          : type === "type2"
          ? randomMovement(enemy, app, player).update
          : randomMovement(enemy, app).update;
      enemy.move = movement;
      enemy.position.set(x, -30);
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

function randomMovement(enemy, app) {
  let distance = app.screen.height * 0.2;
  let timeCounter = 0;
  let moveDirection = 1;
  let shotTimer = 0;
  let isMovingRight = false;
  enemy.x = Math.random() * (app.screen.width * 0.8) + app.screen.width * 0.1;
  enemy.y = -enemy.height;

  const update = () => {
    timeCounter++;

    if (enemy.isShot) {
      shotTimer++;

      if (shotTimer <= 180) { // 3 seconds (assuming 60 FPS)
        if (moveDirection === 1 && enemy.y > app.screen.height * 0.7) {
          moveDirection = -1;
        } else if (moveDirection === -1 && enemy.y < app.screen.height * 0.1) {
          moveDirection = 1;
        }

        enemy.y += (distance / 120) * moveDirection; // move enemy up or down
      } else if (shotTimer > 180 && shotTimer <= 240) { // 1 second (assuming 60 FPS)
        if (!isMovingRight) {
          moveDirection = 1;
          isMovingRight = true;
        }

        enemy.x += app.screen.width * 0.5 / 60; // move enemy to the right
      } else {
        enemy.isShot = false;
        shotTimer = 0;
        isMovingRight = false;
      }
    } else {
      if (timeCounter >= 120) {
        distance = Math.random() * (app.screen.height * 0.2);
        timeCounter = 0;
        if (moveDirection === 1 && enemy.y > app.screen.height * 0.7) {
          moveDirection = -1;
        } else if (moveDirection === -1 && enemy.y < app.screen.height * 0.1) {
          moveDirection = 1;
        }
      }

      enemy.y += (distance / 120) * moveDirection; // move enemy up or down
    }
  };

  return { update };
}
