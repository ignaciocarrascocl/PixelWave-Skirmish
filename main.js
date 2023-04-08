// main.js
import './style.css'
import { createApp } from './src/app'
import { createPlayer } from './src/createPlayer'
import { playerMovement } from './src/playerMovement'
import { setupShooting } from './src/bullets'
import { spawnEnemy } from './src/spawnEnemy'
import { createScoreText, updateScoreText } from './src/score'
import { detectBulletCollision } from './src/detectBulletCollision'
import { state } from './src/state'
import { createBackground } from './src/background';
import { detectPlayerCollision } from './src/detectPlayerCollision';


const app = createApp();
createBackground(app);
const player = createPlayer(app)
const bullets = setupShooting(player, app);
playerMovement(player, app)
//createButtonCanvas(200, 100)
const scoreText = createScoreText(app, 20, 20);

setInterval(function() {
  spawnEnemy(app, player, 3, 2, 5);
}, 1000);


app.ticker.add(() => {
  for (const enemy of state.enemies) {
    detectPlayerCollision(player, enemy, app)
  }
  updateScoreText(scoreText);
  state.enemies.forEach((enemyObj) => {
      enemyObj.update();
  });
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
