import * as PIXI from "pixi.js";
import { state } from "./state";

export function spawnEnemy(app, player) {

    let currentLevel = state.level;
    
    let maxType1 = state.levels[currentLevel].type1;
    let maxType2 = state.levels[currentLevel].type2;
    let maxType3 = state.levels[currentLevel].type3;

    console.log(maxType1 + " - " + state.generatedEnemies.type1)
    if(maxType1 > state.generatedEnemies.type1){
      let x = Math.random() * (app.screen.width - (app.screen.width * 0.1) * 2) + app.screen.width * 0.1;
      const enemy = createEnemy(x, app, player, 'type1');
      state.enemies.push(enemy);
      state.enemyCounter++;
      state.generatedEnemies.type1++
    } else if(maxType2 > state.generatedEnemies.type2){
      let x = Math.random() * (app.screen.width - (app.screen.width * 0.1) * 2) + app.screen.width * 0.1;
      const enemy = createEnemy(x, app, player,'type2');
      state.enemies.push(enemy);
      state.enemyCounter++;
      state.generatedEnemies.type2++
    } else if(maxType3 > state.generatedEnemies.type3){
      let x = Math.random() * (app.screen.width - (app.screen.width * 0.1) * 2) + app.screen.width * 0.1;
      const enemy = createEnemy(x, app, player, 'type3' );
      state.enemies.push(enemy);
      state.enemyCounter++;
      state.generatedEnemies.type3++
    }



}

function createEnemy(x, app, player, type) {
  console.log(type)
  const pattern = state.patterns[Math.floor(Math.random() * state.patterns.length)];
  const enemy = new PIXI.Container();
  const blockSize = 10;
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      let randomColor = "";
      if (cell) {
        const block = new PIXI.Graphics();
        let y = -30;
        if (type === 'type1') {
          randomColor = state.colors[0][Math.floor(Math.random() * state.colors[0].length)];
          enemy.move = targetMovement(enemy, app, player).update;
          enemy.position.set(x, y);

        } else if (type === 'type2') {
          randomColor = state.colors[1][Math.floor(Math.random() * state.colors[0].length)];
          enemy.move = randomMovement(enemy, app).update;
          enemy.position.set(x, y);
        }
         else {
          randomColor = state.colors[2][Math.floor(Math.random() * state.colors[0].length)];
          enemy.move = randomMovement(enemy, app).update;
          enemy.position.set(x, y);
        }
        // Choose a random color
        block.beginFill(randomColor); // Set the block color to the random color
        block.drawRect(0, 0, blockSize, blockSize);
        block.endFill();
        block.x = j * blockSize;
        block.y = i * blockSize;
        enemy.addChild(block);
      }
    });
  });

  app.stage.addChild(enemy);

  return { container: enemy, update: enemy.move };
}

function randomMovement(enemy, app) {
  let distance = app.screen.height * 0.2; // move 20% of the screen height
  let timeCounter = 0;
  let moveDirection = 1; // 1: move down, -1: move up
  enemy.x = Math.random() * (app.screen.width - 20) + 10; // set random starting X position
  enemy.y = -enemy.height; // set starting Y position just above the top edge of the screen
  const update = () => {
    timeCounter++;
    if (timeCounter >= 120) { // move every 2 seconds (120 frames at 60fps)
      distance = Math.random() * (app.screen.height * 0.2);
      timeCounter = 0;
      if (moveDirection === 1 && enemy.y > app.screen.height * 0.7) {
        moveDirection = -1;
      } else if (moveDirection === -1 && enemy.y < app.screen.height * 0.1) {
        moveDirection = 1;
      }
    }
    enemy.y += (distance / 120) * moveDirection; // move enemy up or down
    // check if enemy reached bottom edge
    if (enemy.y > app.screen.height) {
      app.stage.removeChild(enemy);
      state.enemies = state.enemies.filter((e) => e.container !== enemy);
      state.enemyCounter--;
    }
  };
  return { update };
}


function targetMovement(enemy, app, player) {
  let distance = 0;
  let timeCounter = 0;
  let moveDirection = 1; // 1: move down, -1: move up
  enemy.x = Math.random() * (app.screen.width - 20) + 10; // set random starting X position
  enemy.y = -enemy.height; // set starting Y position just above the top edge of the screen

  const update = () => {
    timeCounter++;

    if (timeCounter >= 120) { // move every 2 seconds (120 frames at 60fps)
      distance = player.x - enemy.x;
      timeCounter = 0;

      if (moveDirection === 1 && enemy.y > app.screen.height * 0.7) {
        moveDirection = -1;
      } else if (moveDirection === -1 && enemy.y < app.screen.height * 0.1) {
        moveDirection = 1;
      }
    }

    const yMovement = app.screen.height * 0.002;

    if (moveDirection === 1) { // enemy is moving down
      if (enemy.y < app.screen.height * 0.7) { // if the enemy is above the 70% of the screen move down
        enemy.y += yMovement * moveDirection;
      } else {
        enemy.y += yMovement;
      }
    } else { // enemy is moving up
      if (enemy.y > app.screen.height * 0.1) { // if the enemy is below the 70% of the screen move up until reaching the 10% of the top of the screen;
        enemy.y += yMovement * moveDirection;
      } else {
        enemy.y += yMovement;
        moveDirection = 1; // reset moveDirection to 1 when the enemy reaches the top
      }
    }

    enemy.x += distance / 120; // move enemy towards player's x position

    // check if enemy reached bottom edge
    if (enemy.y > app.screen.height) {
      app.stage.removeChild(enemy);
      state.enemies = state.enemies.filter((e) => e.container !== enemy);
      state.enemyCounter--;
    }
  };
  return { update };
}

function zigzagMovement(enemy, app) {
  let distance = app.screen.height * 0.2; // move 20% of the screen height
  let timeCounter = 0;
  enemy.x = Math.random() * (app.screen.width - 20) + 10; // set random starting X position
  enemy.y = -enemy.height; // set starting Y position just above the top edge of the screen
  const update = () => {
    timeCounter++;
    if (timeCounter >= 120) { // move every 2 seconds (120 frames at 60fps)
      distance = Math.random() * (app.screen.height * 0.2);
      timeCounter = 0;
    }
    enemy.y += distance / 120; // move enemy down
    // check if enemy reached bottom edge
    if (enemy.y > app.screen.height) {
      app.stage.removeChild(enemy);
      state.enemies = state.enemies.filter((e) => e.container !== enemy);
      state.enemyCounter--;
    }
  };
  return { update };
}