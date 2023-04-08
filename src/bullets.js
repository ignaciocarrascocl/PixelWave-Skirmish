import * as PIXI from 'pixi.js';
import { playSound } from '/src/sounds';

export function setupShooting(player, app) {
    const bulletSpeed = 10;
    const bullets = [];

    window.addEventListener("keydown", (e) => {
        if (e.code === "ControlLeft" || e.code === "ControlRight") {
            e.preventDefault(); // Prevent the default behavior of the control key

            // Calculate the current middle position of the player based on the remaining blocks
            const remainingBlocks = player.children.filter(child => child.visible);
            const middle = remainingBlocks.reduce((total, block) => total + block.getBounds().x + block.getBounds().width / 2, 0) / remainingBlocks.length;

            const bullet = createBullet(middle, player.y + player.height);
            bullets.push(bullet);
            app.stage.addChild(bullet);
            // Usage example: play the 'lasergunshot.wav' sound
            playSound('lasergunshot.wav');
        }
    });

    app.ticker.add(() => {
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            bullet.y -= bulletSpeed;

            if (bullet.y < -bullet.height) {
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);
            }
        }
    });

    return bullets;
}

// Function to create a bullet
function createBullet(x, y) {
    const bullet = new PIXI.Graphics();
    bullet.beginFill(0xFFFFFF);
    bullet.drawRect(-2.5, -2.5, 5, 5);
    bullet.endFill();
    bullet.x = x;
    bullet.y = y;
    return bullet;
}

