// src/score.js
import * as PIXI from 'pixi.js';
import { state } from './state';

export function createScoreText(app, x, y) {
  const text = new PIXI.Text('Score: 0', {
    fontFamily: 'Arial',
    fontSize: 36,
    fill: 0xffffff, // white
    align: 'center',
    fontWeight: 'bold',
  });

  text.x = x;
  text.y = y;

  app.stage.addChild(text);

  return text;
}

export function updateScoreText(scoreText) {
  scoreText.text = `Score: ${state.score}`;
}
