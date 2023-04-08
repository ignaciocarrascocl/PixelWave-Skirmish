// Define a map of file names to their corresponding paths
var soundPaths = {
    'glitch.wav': 'assets/audio/glitch.wav',
    'hit.wav': 'assets/audio/hit.wav',
    'lasergunshot.wav': 'assets/audio/lasergunshot.wav',
    'popup.wav': 'assets/audio/popup.wav',
    'rifle.wav': 'assets/audio/rifle.wav',
    'splatter.wav': 'assets/audio/splatter.wav',
    'target.wav': 'assets/audio/target.wav',
    'ticker.wav': 'assets/audio/ticker.wav',
    'uibeep.wav': 'assets/audio/uibeep.wav',
    'uiglitch.wav': 'assets/audio/uiglitch.wav',
    'deploy.wav': 'assets/audio/deploy.wav',
    'eject.wav': 'assets/audio/eject.wav',
    'explosion.wav': 'assets/audio/explosion.wav'
  };


  const noise2D = createNoise2D();


  // Create a function that plays a sound based on its file name
  function playSound(fileName) {
    // Check if the file name exists in the map
    if (fileName in soundPaths) {
      // Create a new Howl instance for the sound
      var sound = new Howl({
        src: [soundPaths[fileName]],
        html5: true,
        pool: 10
      });
  
      // Play the sound
      sound.play();
    } else {
      console.log('Sound file not found: ' + fileName);
    }
  }


// Create a Pixi Application
const app = new PIXI.Application({
    width: 400,
    height: 400,
    backgroundColor: 0x000000,
});

const enemies = [];

document.body.appendChild(app.view);

// Function to set the background color
function setBackgroundColor(color) {
    app.renderer.background.color = color;
}


// Function to generate the player
function createPlayer() {
    const player = new PIXI.Container();
    const blockSize = 10;

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const block = new PIXI.Graphics();
            block.beginFill(0xFFFFFF);
            block.drawRect(0, 0, blockSize, blockSize);
            block.endFill();
            block.x = i * blockSize;
            block.y = j * blockSize;
            player.addChild(block);
        }
    }

    player.x = (app.screen.width - player.width) / 2;
    player.y = app.screen.height - player.height * 2;
    app.stage.addChild(player);

    return player;
}

// Function for player movement
function setupPlayerMovement(player) {
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


// Function to set up bullet shooting
function setupShooting(player) {
    const bulletSpeed = 10;
    const bullets = [];

    window.addEventListener("keydown", (e) => {
        if (e.code === "ControlLeft" || e.code === "ControlRight") {
            e.preventDefault(); // Prevent the default behavior of the control key
            const bullet = createBullet(player.x + player.width / 2 - 2.5, player.y);
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
  
// Function to detect if the bullet has touched a block in an enemy
function detectBulletCollision(bullet, bullets, enemyObj) {
    const enemy = enemyObj.container;
  
    for (const block of enemy.children.slice()) {
      const bulletGlobal = bullet.getGlobalPosition(new PIXI.Point());
      const blockGlobal = block.getGlobalPosition(new PIXI.Point(), enemy.parent);
  
      if (
        bulletGlobal.x + bullet.width > blockGlobal.x &&
        bulletGlobal.x < blockGlobal.x + block.width &&
        bulletGlobal.y + bullet.height > blockGlobal.y &&
        bulletGlobal.y < blockGlobal.y + block.height
      ) {
        playSound('explosion.wav');
        // Remove the bullet and block
        app.stage.removeChild(bullet);
        bullets.splice(bullets.indexOf(bullet), 1);
        enemy.removeChild(block);
        // Call effects function if enemy has no more blocks
        if (enemy.children.length === 0) {
         enemyCounter--
         effects(blockGlobal.x, blockGlobal.y, 20, 3);
          app.stage.removeChild(enemy);
          enemies.splice(enemies.indexOf(enemyObj), 1);
          playSound('splatter.wav');
          
        } else {
            effects(blockGlobal.x, blockGlobal.y, 10, 3);

        }
  
        return true;
      }
    }
    return false;
  }
  

  function effects(x, y, particles, size) {
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
        for (const particle of particleContainer.children) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.alpha *= 0.98;

            // Remove particle when its alpha is less than 0.01
            if (particle.alpha < 0.01) {
                particleContainer.removeChild(particle);
            }
        }
    });
}

let colors = [['#FFFF00', '#FFD700', '#FFA500'],['#0000FF', '#00008B', '#4169E1'],['#008000', '#228B22', '#00FF00']];

function createEnemy(pattern, x, y) {
    const enemy = new PIXI.Container();
    const blockSize = 10;
    let randomIndex = Math.floor(Math.random() * 3);
    let randomArray = colors[randomIndex];
    pattern.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const block = new PIXI.Graphics();
                const randomColor = colors[randomIndex][Math.floor(Math.random() * colors.length)]; // Choose a random color
                block.beginFill(randomColor); // Set the block color to the random color
                block.drawRect(0, 0, blockSize, blockSize);

                block.endFill();
                block.x = j * blockSize;
                block.y = i * blockSize;
                enemy.addChild(block);
            }
        });
    });

    enemy.x = x;
    enemy.y = y;
    enemy.vx = 0.5;
    enemy.vy = 0.5;
    enemy.oscillationFrequency = 1;
    enemy.oscillationOffset = 1;
    app.stage.addChild(enemy);

    const update = () => {
        enemyMovement(enemy);
    };

    return { container: enemy, update };
}

function enemyMovement(enemy) {
    // Choose a random movement type for the enemy
    const movementTypes = ['straight', 'noisy', 'oscillating'];
    if (!enemy.movementType) {
        enemy.movementType = movementTypes[Math.floor(Math.random() * movementTypes.length)];
    }

    const amplitudeX = app.screen.width * 0.2;

    switch (enemy.movementType) {
        case 'straight':
            // Move the enemy from top to bottom
            enemy.y += enemy.vy;
            break;
        case 'noisy':
            // Move the enemy from top to bottom with some noise
            enemy.y += enemy.vy + (randomizeValue(0.5));
            break;
            case 'oscillating':
                // Move the enemy left to right with oscillation
                enemy.oscillationOffset += 0.01; // Adjust this value for the desired oscillation speed
                enemy.x = enemy.x + amplitudeX * Math.sin(enemy.oscillationOffset);
            
                // Keep the enemy within the screen bounds
                if (enemy.x < 10) {
                    enemy.x = 10;
                } else if (enemy.x > app.screen.width - enemy.width - 10) {
                    enemy.x = app.screen.width - enemy.width - 10;
                }
            
                // Move the enemy from top to bottom
                enemy.y += enemy.vy;
                break;
            
            
    }

    // Loop through the bottom to the top of the screen
    if (enemy.y > app.screen.height) {
        enemy.y = -enemy.height;
    }
}



function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}



  
  function randomizeValue(value) {
    const randomFactor = 0.5 + Math.random() * 0.5;
    return value * randomFactor;
  }

  
// Tetromino T-shaped pattern
const patterns = [
    [
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 1],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
      ],
  ];
  
  function spawnEnemy() {
    if (enemyCounter < maxEnemies) {
        console.log('creating enemy' + enemyCounter)
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      const margin = app.screen.width * 0.1;
      const x = Math.random() * (app.screen.width - margin * 2) + margin;
      const y = -30;
      const enemy = createEnemy(pattern, x, y);
      enemies.push(enemy);
      enemyCounter++;
    }
  }
  

  let enemyCounter = 0;
  let maxEnemies = 10;
  let firstRun = true;
  

// Modify the init function to include checkBulletCollisions
function init() {
    setBackgroundColor(0x000000);
    const player = createPlayer();
    setupPlayerMovement(player);
    const bullets = setupShooting(player);
    const spawnInterval = setInterval(spawnEnemy, 1000);

    app.ticker.add(() => {
        
        enemies.forEach((enemyObj) => {
            enemyObj.update();
        });
        if(firstRun == false ){
            console.log('all generated.' + enemyCounter)
        }
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            let collision = false;
            for (const enemy of enemies) {
                collision = detectBulletCollision(bullet, bullets, enemy);
                if (collision) {
                    break;
                }
            }
        }
    });
    
}

init();
