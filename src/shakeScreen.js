let isShaking = false;
let updateFunction;
let shouldStopShaking = false;

export async function shakeScreen(app, magnitude, duration) {
  if (isShaking) {
    await stopShaking(app, updateFunction);
  }

  const stage = app.stage;
  const initialX = stage.position.x;
  const initialY = stage.position.y;
  const speed = 0.05; // The speed of the shake

  let elapsed = 0;

  const shake = () => {
    if (shouldStopShaking) {
      stage.position.set(initialX, initialY);
      return;
    }
    const x = Math.random() * magnitude - magnitude / 2;
    const y = Math.random() * magnitude - magnitude / 2;
    stage.position.set(initialX + x, initialY + y);
  };

  const update = function(delta) {
    elapsed += delta;
    if (elapsed < duration) {
      shake();
    } else {
      stopShaking(app, update);
    }
  };

  isShaking = true;
  shouldStopShaking = false;
  updateFunction = update;
  app.ticker.add(update);
}

function stopShaking(app, updateFunction) {
  return new Promise((resolve) => {
    if (!isShaking) {
      resolve();
      return;
    }

    shouldStopShaking = true;
    const stage = app.stage;
    const initialX = stage.position.x;
    const initialY = stage.position.y;

    stage.position.set(initialX, initialY);
    app.ticker.remove(updateFunction);
    isShaking = false;
    resolve();
  });
}
