// gameOver.js
import { playSound } from "./sounds";
import { state } from "./state";
import * as PIXI from "pixi.js";

export function gameOver(app, player) {
  state.gameOver = true;

  player.x = (app.screen.width - player.width) / 2;
  player.y = app.screen.height - player.height * 2;

  playSound("start.wav");

  const gameOverLines = [
    { text: () => `GAME OVER`, fill: "#2EFEF7" },
    { text: () => `Score: ${state.score}`, fill: "#FE2E2E" },
    { text: () => `Start again\n press any key`, fill: "#F7FE2E" },
  ];

  const textStyle = {
    fontFamily: "Bungee",
    fontSize: 24,
    align: "center",
  };

  gameOverLines.forEach((line, index) => {
    const gameOveText = new PIXI.Text(line.text(), { ...textStyle, fill: line.fill });
    gameOveText.x = (app.screen.width - gameOveText.width) / 2;
    gameOveText.y =
      app.screen.height / 2 -
      (gameOverLines.length * textStyle.fontSize) / 2 +
      index * textStyle.fontSize * 1.2;
    gameOveText.alpha = 0;
    gameOveText.name = "gameOverText";

    if (index === 2) {
      setTimeout(() => {
        fadeInText(gameOveText, app);
      }, 3000);
    } else {
      fadeInText(gameOveText, app);
    }

    app.stage.addChild(gameOveText);
  });
}

function fadeInText(textObject, app) {
  const onFadeIn = delta => {
    if (textObject.alpha < 1) {
      textObject.alpha += 0.01 * delta;
    } else {
      app.ticker.remove(onFadeIn);
    }
  };

  app.ticker.add(onFadeIn);
}
