// gameOver.js
import { createAnnouncement, animateAnnouncement } from "./createAnnouncement";
import { playSound } from "./sounds";
import { state } from "./state";
import * as PIXI from "pixi.js";

export function gameOver(app, player) {
  state.gameOver = true;

  if (player.parent) {
    player.parent.removeChild(player);
  }
  player.destroy();
  const announcementText = createAnnouncement(app);
  animateAnnouncement(announcementText, app, `Game over`);
  playSound("start.wav");

  const scoreText = new PIXI.Text(`Score: ${state.score}`, {
    fontFamily: 'Bungee',
    fontSize: 28,
    fill: '#FFFF00'    , // white
    align: 'center',
    fontWeight: 'bold',
  });
  scoreText.position.set(app.screen.width / 2, app.screen.height / 2 - 50);
  scoreText.anchor.set(0.5);

  const button = new PIXI.Text("Play Again\n (press any key)", {
    fontFamily: 'Bungee',
    fontSize: 28,
    fill: '#0000FF', // white
    align: 'center',
    fontWeight: 'bold',
     });
  button.position.set(app.screen.width / 2, app.screen.height / 2 + 50);
  button.anchor.set(0.5);

  app.stage.addChild(scoreText, button);

  // show a text, with PIXIJS that says Score: state.score and a button to start again. the button should call "gameStart()"
}