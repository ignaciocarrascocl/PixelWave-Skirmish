import * as PIXI from "pixi.js";

export function createStartText(app) {
    const startText = new PIXI.Text("Press any key\n \n Use arrow keys\n Z key (bomb) - X key (shoot)", {
      fontFamily: "Bungee",
      fontSize: 24,
      fill: "#FFFFFF",
      align: "center",
    });
  
    startText.x = (app.screen.width - startText.width) / 2;
    startText.y = app.screen.height / 2;
    startText.name = "startText";
    app.stage.addChild(startText);
  
    return startText;
  }