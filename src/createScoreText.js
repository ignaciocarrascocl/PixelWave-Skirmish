// createScoreText.js

import * as PIXI from "pixi.js";
import { state } from "./state";

// Add 'app' as a parameter
export function createScoreText(app) {
  const scoreText = new PIXI.Text(`Score: ${state.score}`, {
    fontFamily: "Bungee",
    fontSize: 24,
    fill: "#ffffff",
    align: "left",
  });
  scoreText.anchor.set(0, 0); // set anchor to the top-right corner
  scoreText.position.set(app.screen.width * 0.05, app.screen.height * 0.02); 
  scoreText.name = "scoreText"; // Add this line
  app.stage.addChild(scoreText);

  return scoreText
}

export function updateScoreText(app, scoreText) { // Add app as a parameter
  if (!scoreText) {
    return;
  }
  scoreText.text = `Score: ${state.score}`;
  if (state.gameOver) {
    scoreText.parent.removeChild(scoreText); // Remove the scoreText when the game is over
  }
}
