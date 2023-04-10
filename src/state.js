// src/state.js

import { waves } from './wavesGeneration.js';
import { generatePatterns } from './generatePatterns.js';

export const state = {
    gameOver: false,
    playerLife: 1,
    blockSize: 10,
    currentPowerUps: [],
    bombs: 9,
    weaponUpgrade: 1,
    gameStart: false,
    gameStarted: false,
    waiting: false,
    waveReady: false,
    score: 0,
    maxEnemies: 10,
    enemyCounter: 0,
    enemies: [],
    wave: 1,
    generatedEnemies: {
      type1: 0,
      type2: 0,
      type3: 0
    },
    waves: waves,
    colors: [
      ["#FFFF00", "#FFD700", "#FFA500"],
      ["#0000FF", "#00008B", "#4169E1"],
      ["#008000", "#228B22", "#00FF00"],
    ],
    // Tetromino T-shaped pattern
    patterns:  generatePatterns()
  };