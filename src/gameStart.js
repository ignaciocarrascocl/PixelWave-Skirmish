import { waves } from './wavesGeneration.js';
import { generatePatterns } from './generatePatterns.js';
import { state } from './state.js';
import { restartPlayer } from './restartPlayer.js';

export function gameStart(app, player) {

  if(state.gameOver){
    for (let i = app.stage.children.length - 1; i >= 0; i--) {
      const child = app.stage.children[i];
      if (child.name == "startText" || child.name == "endGameScore" || child.name === "endGameStartAgain" || child.name === 'gameOverText') {
        app.stage.removeChild(child);
      }
    }
    state.gameOver = false;
    state.playerLife = 1;
    state.blockSize = 10;
    state.currentPowerUps = [];
    state.bombs = 9;
    state.weaponUpgrade = 1;
    state.gameStarted = false;
    state.waiting = false;
    state.waveReady = false;
    state.gameStart = false;
    state.score = 0;
    state.enemyCounter = 0;
    state.enemies = [];
    state.wave = 1;
    state.generatedEnemies = {
      type1: 0,
      type2: 0,
      type3: 0
    };
    state.waves = waves;
    state.colors = [
      ["#FFFF00", "#FFD700", "#FFA500"],
      ["#0000FF", "#00008B", "#4169E1"],
      ["#008000", "#228B22", "#00FF00"],
    ];
    state.patterns = generatePatterns();
  }

  for (let i = app.stage.children.length - 1; i >= 0; i--) {
    const child = app.stage.children[i];
    if (child.name == "startText") {
      app.stage.removeChild(child);
    }
  }

  restartPlayer(player, app)
}