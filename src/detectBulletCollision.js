import * as PIXI from "pixi.js";
import { playSound } from "/src/sounds";
import { effects } from "./particles";
import { state } from "./state";
import { shakeScreen } from "./shakeScreen";
import { powerUp } from "./powerUps";

// Function to detect if the bullet has touched a block in an enemy
export function detectBulletCollision(bullet, bullets, currentEnemy, app) {
  const enemy = currentEnemy.container;

  for (const block of enemy.children.slice()) {
    const bulletGlobal = bullet.getGlobalPosition(new PIXI.Point());
    const blockGlobal = block.getGlobalPosition(new PIXI.Point(), enemy.parent);

    if (
      bulletGlobal.x + bullet.width > blockGlobal.x &&
      bulletGlobal.x < blockGlobal.x + block.width &&
      bulletGlobal.y + bullet.height > blockGlobal.y &&
      bulletGlobal.y < blockGlobal.y + block.height
    ) {
      // Remove the bullet and block
      app.stage.removeChild(bullet);
      bullets.splice(bullets.indexOf(bullet), 1);
      enemy.removeChild(block);

      if (enemy.children.length === 0) {
        spawnPowerUp(app, enemy);
        effects(blockGlobal.x, blockGlobal.y, 5, 3, app, enemy.customColor);
        app.stage.removeChild(enemy);
        state.enemies.splice(state.enemies.indexOf(currentEnemy), 1);
        playSound("explosion.wav", 1, 1);
        state.enemyCounter--;
        state.score = state.score + 10;
        shakeScreen(app, 5, 10);
      } else {
        playSound("explosion.wav", 0.5, 2);
        effects(blockGlobal.x, blockGlobal.y, 10, 5, app, enemy.customColor);
        shakeScreen(app, 5, 2);
        currentEnemy.isShot = true;
      }
      return true;
    }
  }
  return false;
}

// GeneratePowerUp
function spawnPowerUp(app, enemy) {
  const probability = state.wave <= 20 ? 0.5 / Math.log(state.wave + 1) : 0.1;
  const randomNum = Math.random();
  if (randomNum < probability) {
    powerUp(app, enemy);
  }
}
