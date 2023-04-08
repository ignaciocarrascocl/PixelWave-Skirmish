export function shakeScreen(app, magnitude, duration) {
    const stage = app.stage;
    const initialX = stage.position.x;
    const initialY = stage.position.y;
    const speed = 0.05; // The speed of the shake
    
    let elapsed = 0;
  
    const shake = () => {
      const x = Math.random() * magnitude - magnitude / 2;
      const y = Math.random() * magnitude - magnitude / 2;
      stage.position.set(initialX + x, initialY + y);
    };
  
    const update = (delta) => {
      elapsed += delta;
      if (elapsed < duration) {
        shake();
      } else {
        stage.position.set(initialX, initialY);
        app.ticker.remove(update);
      }
    };
  
    app.ticker.add(update);
  }
  