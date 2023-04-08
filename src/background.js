import * as PIXI from 'pixi.js';
import { BloomFilter } from 'pixi-filters';


function createBackground(app) {
  const background = new PIXI.Container();
  app.stage.addChild(background);

  const starCount = 20;
  const stars = [];

// Add the BloomFilter to the foreground container
const bloomFilter = new BloomFilter({
    threshold: 0.5,
    bloomScale: 1.5,
    brightness: 1,
    blur: 10,
    quality: 10,
});
  app.stage.filters = [bloomFilter];

  const createStar = () => {
    const star = new PIXI.Graphics();
    star.beginFill(0xFFFFFF);
    star.drawCircle(0, 0, Math.random() * 2);
    star.endFill();
    star.x = Math.random() * app.screen.width;
    star.y = Math.random() * app.screen.height;
    star.speed = Math.random() * 2 + 1;
    background.addChild(star);
    return star;
  };

  for (let i = 0; i < starCount; i++) {
    stars.push(createStar());
  }

  app.ticker.add(() => {
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > app.screen.height) {
        star.y = -10;
        star.x = Math.random() * app.screen.width;
        star.speed = Math.random() * 2 + 1;
      }
    });
  });

  return background;
}

export { createBackground };
