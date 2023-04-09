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
import { ui, updateUiText } from "./src/ui";
import { pickUpPowerUp } from "./src/pickUpPowerUp";
import { gameOver } from "./src/gameOver";

// Create the game app
const app = createApp();

// Set up the game elements
createBackground(app);
const player = createPlayer(app);
const bullets = setupShooting(player, app);

playerMovement(player, app);

// Create the text elements
const scoreText = createScoreText(app, 20, 20);
const uiText = ui(app);

// Spawn enemies at a regular interval
setInterval(function () {
  spawnEnemy(app, player);
}, 300);

// Main game loop
app.ticker.add(() => {

  for (const powerUp of state.currentPowerUps) {
    pickUpPowerUp(app, player, powerUp);
  }
  // Check for player collisions with enemies
  for (const enemy of state.enemies) {
    detectPlayerCollision(player, enemy, app);
  }

  // Execute the game logic
  gameLogic(app);

  updateScoreText(scoreText);
  updateUiText(uiText);

  // Update enemy positions
  state.enemies.forEach((enemyObj) => {
    enemyObj.update();
  });

  // Check for bullet collisions with enemies
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
});
