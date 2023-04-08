import * as PIXI from 'pixi.js';
import { playSound } from '/src/sounds';
import { effects } from './particles';
import { state } from './state';
import { shakeScreen } from './shakeScreen';

// Function to detect if the bullet has touched a block in an enemy
export function detectBulletCollision(bullet, bullets, enemyObj, app) {
    const enemy = enemyObj.container;
  
    for (const block of enemy.children.slice()) {
      const bulletGlobal = bullet.getGlobalPosition(new PIXI.Point());
      const blockGlobal = block.getGlobalPosition(new PIXI.Point(), enemy.parent);
  
      if (
        bulletGlobal.x + bullet.width > blockGlobal.x &&
        bulletGlobal.x < blockGlobal.x + block.width &&
        bulletGlobal.y + bullet.height > blockGlobal.y &&
        bulletGlobal.y < blockGlobal.y + block.height
      ) {
        playSound('explosion.wav');
        // Remove the bullet and block
        app.stage.removeChild(bullet);
        bullets.splice(bullets.indexOf(bullet), 1);
        enemy.removeChild(block);
        // Call effects function if enemy has no more blocks
        if (enemy.children.length === 0) {
          effects(blockGlobal.x, blockGlobal.y, 20, 3, app);
          app.stage.removeChild(enemy);
          state.enemies.splice(state.enemies.indexOf(enemyObj), 1);
          playSound('splatter.wav');
          state.enemyCounter--
          state.score++
          shakeScreen(app, 5, 10)
        } else {
           effects(blockGlobal.x, blockGlobal.y, 10, 3, app);
           shakeScreen(app, 5, 2)
        }
        return true;
      }
    }
    return false;
  }