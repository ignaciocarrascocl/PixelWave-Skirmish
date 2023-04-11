// createScoreText.js
import * as PIXI from "pixi.js";
import { state } from "./state";

// Add 'app' as a parameter
export function createScoreText(app) {
  const score = new PIXI.Text(`Score: ${state.score}`, {
    fontFamily: "Bungee",
    fontSize: 24,
    fill: "#ffffff",
    align: "left",
  });
  score.anchor.set(0, 0); // set anchor to the top-right corner
  score.position.set(app.screen.width * 0.05, app.screen.height * 0.02); 
  score.name = "score"; // Add this line
  app.stage.addChild(score);
  
  return score
}

export function updateScoreText(app, score) {

  score.text = `Score: ${state.score}`;
  
}
