// Function for player movement
export function playerMovement(player, app) {
    const moveSpeed = 0.2;
    const friction = 0.98;
    const keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
    };

    // Initialize player velocity
    player.vx = 0;
    player.vy = 0;

    document.addEventListener("keydown", (e) => {
        if (keys.hasOwnProperty(e.code)) {
            keys[e.code] = true;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (keys.hasOwnProperty(e.code)) {
            keys[e.code] = false;
        }
    });

    app.ticker.add(() => {
        
        // Apply acceleration
        if (keys.ArrowLeft) {
            player.vx -= moveSpeed;
        }
        if (keys.ArrowRight) {
            player.vx += moveSpeed;
        }
        if (keys.ArrowUp) {
            player.vy -= moveSpeed;
        }
        if (keys.ArrowDown) {
            player.vy += moveSpeed;
        }

        // Apply friction
        player.vx *= friction;
        player.vy *= friction;

        // Update player position
        player.x += player.vx;
        player.y += player.vy;

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
    });
}