import * as PIXI from "pixi.js";
import { playSound } from "/src/sounds";
import { state } from "./state";
import { shakeScreen } from "./shakeScreen";

export function setupShooting(player, app) {
  const bulletSize = 5;
  const bulletSpeed = 5;
  const bullets = [];
  let bombCooldown = false;
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyZ" && !bombCooldown) {
      if (!player || state.gameOver) return;
      e.preventDefault();
      if (state.bombs) {
        state.bombs--;
        bombCooldown = true;
        setTimeout(() => {
          bombCooldown = false;
        }, 3000);
        shakeScreen(app, 10, 5);
        playSound("lasergunshot.wav", 0.5);
        const playerY = player.y + player.height;
        const screenWidth = app.renderer.screen.width;
        const numBullets = Math.floor(screenWidth / (bulletSize * 2));
        for (let row = 0; row < 3; row++) {
          for (let i = 0; i < numBullets; i++) {
            const bullet = createBullet(
              i * bulletSize * 2,
              playerY - row * bulletSize * 4,
              bulletSize * 2,
              bulletSize * 2,
              "#FE2E2E"
            );
            bullets.push(bullet);
            app.stage.addChild(bullet);
          }
        }
      } else {
        playSound("deploy.wav");
        shakeScreen(app, 5, 3);
      }
    }
  });

  // Rest of the function remains unchanged
  window.addEventListener("keydown", (e) => {
    if (state.gameOver) return;
    if (e.code === "KeyX") {
      e.preventDefault();

      const playerY = player.y + player.height;
      const weaponUpgrade = state.weaponUpgrade;
      const bulletSpacing = 3 * bulletSize;

      const remainingBlocks = player.children.filter((child) => child.visible);
      const middle =
        remainingBlocks.reduce(
          (total, block) =>
            total + block.getBounds().x + block.getBounds().width / 2,
          0
        ) / remainingBlocks.length;

      const generateBullets = (numBullets, yOffset = 0) => {
        const startX = middle - ((numBullets - 1) * bulletSpacing) / 2;
        for (let i = 0; i < numBullets; i++) {
          const bullet = createBullet(
            startX + i * bulletSpacing,
            playerY + yOffset,
            bulletSize,
            bulletSize,
            "#F7FE2E"
          );
          bullets.push(bullet);
          app.stage.addChild(bullet);
        }
      };

      let pitch = 20;

      if (weaponUpgrade === 1) {
        generateBullets(1);
      } else if (weaponUpgrade === 2) {
        pitch = 5;
        generateBullets(3);
      } else if (weaponUpgrade === 3) {
        pitch = 2;
        generateBullets(5);
      }

      playSound("lasergunshot.wav", 0.3, pitch);
    }
  });

  app.ticker.add(() => {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];
      bullet.y -= bulletSpeed;
      if (bullet.y < -bullet.height) {
        app.stage.removeChild(bullet);
        bullets.splice(i, 1);
      }
    }
  });

  return bullets;
}

function createBullet(x, y, width, height, color) {
  const bullet = new PIXI.Graphics();
  bullet.beginFill(color);
  bullet.drawRect(0, 0, width, height);
  bullet.endFill();
  bullet.x = x - width / 2;
  bullet.y = y - height / 2;
  return bullet;
}
