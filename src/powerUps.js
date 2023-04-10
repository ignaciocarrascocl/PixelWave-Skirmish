import * as PIXI from "pixi.js";
import { playSound } from '/src/sounds';
import { state } from './state';

// Define the tetramino shapes

const powerUps = {
  health: {
    pattern: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1]
      
    ],
    effect: "bomb",
    color: "#2EFEF7",
  },
  bomb: {
    pattern: [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    effect: "health",
    color: "#FE2E2E",
  },
  weapon: {
    pattern: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    effect: "weapon",
    color: "#F7FE2E",
  },
};

const blockSize = 5;

export function powerUp(app, enemy) {

  // Generate the powerup graphic

  const powerUp = new PIXI.Container();
  let powerUpKeys = Object.keys(powerUps);
  let randomIndex = Math.floor(Math.random() * powerUpKeys.length);
  let selectedPowerUpKey = powerUpKeys[randomIndex];
  let selectedPowerUp = powerUps[selectedPowerUpKey];
  let powerUpPattern = selectedPowerUp.pattern;
  for (let i = 0; i < powerUpPattern.length; i++) {
    for (let j = 0; j < powerUpPattern[i].length; j++) {
      if (powerUpPattern[i][j] === 1) {
        const block = new PIXI.Graphics();
        block.beginFill(selectedPowerUp.color);
        block.drawRect(0, 0, blockSize, blockSize);
        block.endFill();
        block.x = j * blockSize;
        block.y = i * blockSize;
        powerUp.addChild(block);
      }
    }
  }
  powerUp.x = enemy.x;
  powerUp.y = enemy.y;
  powerUp.type = selectedPowerUpKey;
  powerUp.color = powerUps[selectedPowerUpKey].color;

  state.currentPowerUps.push(powerUp);
  playSound('uibeep.wav');
  app.stage.addChild(powerUp);

  // Start blinking after 3 seconds
  setTimeout(() => {
    let isBlinking = false;

    const blink = () => {
      if (isBlinking) return;
      isBlinking = true;
      let blinkCount = 0;
      const blinkSpeed = 250;

      const ticker = new PIXI.Ticker();
      ticker.add(() => {
        blinkCount += ticker.elapsedMS;

        if (blinkCount >= blinkSpeed) {
          powerUp.alpha = powerUp.alpha === 1 ? 0.5 : 1;
          blinkCount = 0;
        }
      });
      ticker.start();

      // Stop blinking and remove powerUp after 3 more seconds
      setTimeout(() => {
        ticker.stop();
        app.stage.removeChild(powerUp);
        powerUp.destroy({ children: true });
        state.currentPowerUps = state.currentPowerUps.filter((pu) => pu !== powerUp);
      }, 3000);
    };

    blink();
  }, 3000);
}
