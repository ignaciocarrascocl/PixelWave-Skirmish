// ui.js

import * as PIXI from "pixi.js";
import { state } from "./state";

// Add 'app' as a parameter
export function createUi(app) {
  const uiTextLines = [
    { text: () => `Health: ${state.playerLife}`, fill: '#2EFEF7' }, // red
    { text: () => `Bombs: ${state.bombs}`, fill: "#FE2E2E" }, // green
    { text: () => `Weapon: ${state.weaponUpgrade}`, fill: "#F7FE2E"}, // blue
  ];

  const textStyle = {
    fontFamily: "Bungee",
    fontSize: 24,
    align: "right",
  };

  uiTextLines.forEach((line, index) => {
    const uiText = new PIXI.Text(line.text(), { ...textStyle, fill: line.fill });
    uiText.anchor.set(1, 0);
    uiText.position.set(app.screen.width * 0.95, app.screen.height * 0.02 + index * 26);
    uiText.name = `uiText-${index}`;
    app.stage.addChild(uiText);
  });

  return uiTextLines;
}

export function updateUiText(uiTextLines, app) {
  uiTextLines.forEach((line, index) => {
    const uiText = app.stage.getChildByName(`uiText-${index}`);
    if (uiText) {
      uiText.text = line.text();
    }
  });
}

