// src/state.js
export const state = {
    score: 0,
    maxEnemies: 10,
    enemyCounter: 0,
    enemies: [],
    level: 1,
    generatedEnemies: {
      type1: 0,
      type2: 0,
      type3: 0
    },
    levels: {
      1: {
      type1: 2,
      type2: 4,
      type3: 6
      },
      2: {
      type1: 4,
      type2: 6,
      typ3: 8,
      }
      },
    colors: [
      ["#FFFF00", "#FFD700", "#FFA500"],
      ["#0000FF", "#00008B", "#4169E1"],
      ["#008000", "#228B22", "#00FF00"],
    ],
    // Tetromino T-shaped pattern
    patterns:  [
      [
        [0, 1, 0],
        [1, 1, 1],
        [1, 0, 1],
      ],
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 1],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
      ],
    ]
  };