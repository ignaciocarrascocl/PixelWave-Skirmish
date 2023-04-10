// main.js

// Import dependencies
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

// Create the game app
let uiCreated = false;
let scoreText;
let uiText;
let currentPlayer;

function updatePlayer() {
  return currentPlayer;
}

const app = createApp();
createBackground(app);
let stateStore = state;

function createStage() {
  const player = createPlayer(app);
  currentPlayer = player;
  const bullets = setupShooting(player, app, updatePlayer);
  playSoundtrack()
  playerMovement(player, app);

  if (!uiCreated) {
    scoreText = createScoreText(app, 10, 10);
    uiText = createUi(app);
    uiCreated = true;
  }

  setInterval(function () {
    spawnEnemy(app, player);
  }, 300);
  // Main game loop

  app.ticker.add(() => {
    if (!state.gameOver) {
      checkForPowerUps(app, player);
      gameLogic(app);
      updateScoreText(app, scoreText); // Pass 'scoreText' as an argument
      updateUiText(uiText, app);
      checkCollisions(bullets, app, player);
      state.enemies.forEach((enemy) => {
        enemy.update();
        detectPlayerCollision(player, enemy, app); // Add this line here
      });
    } else {
      state.enemies.forEach((enemy) => {
        app.stage.removeChild(enemy.container);
      });
    }
  });
  stateStore = state;
}

window.addEventListener("keydown", (e) => {
  if (e.code && state.gameOver) {
    console.log('hello!');
    gameStart(app);
    createStage();
  }
});

function checkForPowerUps(app, player) {
  for (const powerUp of state.currentPowerUps) {
    pickUpPowerUp(app, player, powerUp);
  }
}

function checkCollisions(bullets, app, player) {
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

createStage();
