import { state } from "./state";

export function playerMovement(player, app) {
  if (state.isPlayerMovementInitialized) return;
  state.isPlayerMovementInitialized = true;

  const moveSpeed = 0.2, friction = 0.98;
  const keys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };

  player.vx = player.vy = 0;

  document.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.code)) keys[e.code] = true; });
  document.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.code)) keys[e.code] = false; });

  app.ticker.add(() => {
    if (!state.gameOver) {
      player.vx += (keys.ArrowRight - keys.ArrowLeft) * moveSpeed;
      player.vy += (keys.ArrowDown - keys.ArrowUp) * moveSpeed;
    } else {
      player.vx = player.vy = 0;
    }

    player.x += player.vx;
    player.y += player.vy;
    player.vx *= friction;
    player.vy *= friction;
    if (player) keepPlayerBounds(app, player);
  });
}



function keepPlayerBounds(app, player){

        // Keep player within screen bounds
        if (player.x < 0) {
          player.x = 0;
          player.vx = 0;
        }
        if (player.x > app.screen.width - player.width) {
          player.x = app.screen.width - player.width;
          player.vx = 0;
        }
        if (player.y < 0) {
          player.y = 0;
          player.vy = 0;
        }
        if (player.y > app.screen.height - player.height) {
          player.y = app.screen.height - player.height;
          player.vy = 0;
        }
}