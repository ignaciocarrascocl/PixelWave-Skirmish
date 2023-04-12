// main.js
import "./style.css";
import { createApp } from "./src/createApp";
import { createPlayer } from "./src/createPlayer";
import { playerMovement } from "./src/playerMovement";
import { setupShooting } from "./src/setupShooting";
import { spawnEnemy } from "./src/spawnEnemy";
import { createScoreText, updateScoreText } from "./src/createScoreText";
import { detectBulletCollision } from "./src/detectBulletCollision";
import { state } from "./src/state";
import { createBackground } from "./src/background";
import { detectPlayerCollision } from "./src/detectPlayerCollision";
import { gameLogic } from "./src/gameLogic";
import { createUi, updateUiText } from "./src/ui";
import { pickUpPowerUp } from "./src/pickUpPowerUp";
import { gameStart } from "./src/gameStart";
import { playSoundtrack } from "./src/sounds";
import { createStartText } from "./src/createStartText";

// Initialize variables
let uiCreated = false;
let scoreText;
let uiText;
let updateFunction;
let shotTimer = 0;
let hasGameStartedOnce = false;
let gameOverTimestamp = null;

// Create the application and the player
const app = createApp();

createBackground(app);
const player = createPlayer(app);
if (!uiCreated) {
  scoreText = createScoreText(app);
  uiText = createUi(app);
  uiCreated = true;
}
createStartText(app);

// Spawn enemies every 300ms
setInterval(function () {
  spawnEnemy(app, player);
}, 300);

// Create the game stage
function createStage() {
  shotTimer = 0;
  if (state.gameOver) {
    return;
  }

  playerMovement(player, app);

  // Set up shooting and play soundtrack
  const bullets = setupShooting(player, app);
  playSoundtrack();

  if (updateFunction) {
    app.ticker.remove(updateFunction);
  }
  app.ticker.add(() => {
    if (!state.gameOver && player) {
      checkForPowerUps(app, player);
      gameLogic(app);
      updateScoreText(app, scoreText);
      updateUiText(uiText, app);
      checkCollisions(bullets, app, player);
      state.enemies.forEach((enemy) => {
        enemy.update();
        detectPlayerCollision(player, enemy, app);
      });
    } else {
      state.enemies.forEach((enemy) => {
        app.stage.removeChild(enemy.container);
      });
    }
  });
}

window.addEventListener("keydown", (e) => {
  if (e.code) {
    const startText = app.stage.getChildByName("startText");
    if (startText) {
      startText.visible = false;
    }
    if (hasGameStartedOnce === false) {
      hasGameStartedOnce = true;
      state.gameOver = false;
      gameStart(app, player);
      createStage();
    } else if (hasGameStartedOnce && state.gameOver) {
      const currentTime = Date.now();
      if (!gameOverTimestamp) {
        gameOverTimestamp = currentTime;
      }

      if (currentTime - gameOverTimestamp >= 3000) {
        gameStart(app, player);
        createStage();
        gameOverTimestamp = null;
      }
    }
  }
});

function checkForPowerUps(app, player) {
  for (const powerUp of state.currentPowerUps) {
    pickUpPowerUp(app, player, powerUp);
  }
}

function checkCollisions(bullets, app) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    let collision = false;
    for (const enemy of state.enemies) {
      collision = detectBulletCollision(bullet, bullets, enemy, app);
      if (collision) {
        break;
      }
    }
  }
}

createStartText(app);

createStage();
