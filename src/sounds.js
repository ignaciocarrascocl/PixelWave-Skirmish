import {Howl, Howler} from 'howler';

// Define a map of file names to their corresponding paths
var soundPaths = {
    'glitch.wav': '/assets/audio/glitch.wav',
    'hit.wav': '/assets/audio/hit.wav',
    'lasergunshot.wav': '/assets/audio/lasergunshot.wav',
    'popup.wav': '/assets/audio/popup.wav',
    'rifle.wav': '/assets/audio/rifle.wav',
    'splatter.wav': '/assets/audio/splatter.wav',
    'target.wav': '/assets/audio/target.wav',
    'ticker.wav': '/assets/audio/ticker.wav',
    'uibeep.wav': '/assets/audio/uibeep.wav',
    'uiglitch.wav': '/assets/audio/uiglitch.wav',
    'deploy.wav': '/assets/audio/deploy.wav',
    'eject.wav': '/assets/audio/eject.wav',
    'explosion.wav': '/assets/audio/explosion.wav'
  }


    // Create a function that plays a sound based on its file name
    export function playSound(fileName) {
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