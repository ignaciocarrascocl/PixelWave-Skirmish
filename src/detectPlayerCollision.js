// src/detectPlayerCollision.js
import * as PIXI from "pixi.js";
import { playSound } from "/src/sounds";
import { effects } from "./particles";
import { state } from "./state";
import { shakeScreen } from "./shakeScreen";

export function detectPlayerCollision(player, enemy, app) {
    for (let i = player.children.length - 1; i >= 0; i--) {
      const playerBlock = player.children[i];
      const playerBounds = playerBlock.getBounds();
  
      for (let j = enemy.container.children.length - 1; j >= 0; j--) {
        const enemyBlock = enemy.container.children[j];
        const enemyBounds = enemyBlock.getBounds();
  
        if (playerBounds.intersects(enemyBounds)) {
          const blockGlobal = enemy.container.getGlobalPosition(new PIXI.Point());
          effects(blockGlobal.x, blockGlobal.y, 20, 3, app);
          app.stage.removeChild(enemy.container);
          state.enemies.splice(state.enemies.indexOf(enemy), 1);
          playSound("splatter.wav");
          state.enemyCounter--;
          state.score++;
          shakeScreen(app, 5, 10);
  
          if (playerBlock.getBounds().intersects(enemyBounds)) {
            player.removeChild(playerBlock);
          }
  
          return true;
        }
      }
    }
  }
  