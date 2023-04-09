import * as PIXI from 'pixi.js';
import { state } from './state';
import { playSound } from '/src/sounds';

export function ui(app){
  // Creating a container to hold both the images and texts
  const container = new PIXI.Container();

  // Creating the first image and text
  const texture1 = PIXI.Texture.from('/assets/svg/rocket.svg');
  const image1 = new PIXI.Sprite(texture1);
  image1.scale.set(0.2);

  const text1 = new PIXI.Text(`${state.bombs}`, {
    fontFamily: 'Bungee',
    fontSize: 28,
    fill: 0xffffff, // white
    align: 'center',
    fontWeight: 'bold',
  });

  // Positioning the first text to the right of the first image
  text1.x = image1.width + 50;

  // Adding the first image and text to the container
  container.addChild(image1);
  container.addChild(text1);

  // Creating the second image and text
  const texture2 = PIXI.Texture.from('/assets/svg/heavy-bullets.svg');
  const image2 = new PIXI.Sprite(texture2);
  image2.scale.set(0.2);
  image2.y = image1.height + 40;

  const text2 = new PIXI.Text(`${state.bombs}`, {
    fontFamily: 'Bungee',
    fontSize: 28,
    fill: 0xffffff, // white
    align: 'center',
    fontWeight: 'bold',
  });

  // Positioning the second text below the second image
  text2.x = image2.width + 50;
  text2.y = image1.height + 40;

  // Adding the second image and text to the container
  container.addChild(image2);
  container.addChild(text2);

  // Setting the position of the container
  container.x = app.renderer.width - container.width - 20;
  container.y = 20;

  // Adding the container to the app's stage
  app.stage.addChild(container);

  return [text1, text2];
}

export function updateUiText(uiTexts) {
    uiTexts[0].text = state.bombs;
    uiTexts[1].text = state.weaponUpgrade;
}
