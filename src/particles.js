import * as PIXI from 'pixi.js';


export function effects(x, y, particles, size, app) {
    // Create a container for particles
    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);

    // Particle attributes
    const particleSize = size;
    const particleColor = 0xFFFFFF;
    const particleSpeed = 5;
    const particleCount = particles;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new PIXI.Graphics();
        particle.beginFill(particleColor);
        particle.drawRect(0, 0, particleSize, particleSize);
        particle.endFill();
        particle.x = x;
        particle.y = y;
        particle.vx = Math.random() * particleSpeed * 2 - particleSpeed;
        particle.vy = Math.random() * particleSpeed * 2 - particleSpeed;
        particleContainer.addChild(particle);
    }

    // Update particles
    app.ticker.add(() => {
        for (let i = particleContainer.children.length - 1; i >= 0; i--) {
          const particle = particleContainer.children[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.alpha *= 0.98;
      
          // Remove and destroy particle when its alpha is less than 0.01
          if (particle.alpha < 0.01) {
            particleContainer.removeChild(particle);
            particle.destroy();
          }
        }
      });
}