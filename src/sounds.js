import {Howl, Howler} from 'howler';

// Define the base URL
var baseUrl = '/assets/audio/';

// Define a map of file names to their corresponding paths
var soundPaths = {
'glitch.wav': baseUrl + 'glitch.wav',
'hit.wav': baseUrl + 'hit.wav',
'lasergunshot.wav': baseUrl + 'lasergunshot.wav',
'popup.wav': baseUrl + 'popup.wav',
'rifle.wav': baseUrl + 'rifle.wav',
'splatter.wav': baseUrl + 'splatter.wav',
'target.wav': baseUrl + 'target.wav',
'ticker.wav': baseUrl + 'ticker.wav',
'uibeep.wav': baseUrl + 'uibeep.wav',
'uiglitch.wav': baseUrl + 'uiglitch.wav',
'deploy.wav': baseUrl + 'deploy.wav',
'eject.wav': baseUrl + 'eject.wav',
'explosion.wav': baseUrl + 'explosion.wav',
'start.wav': baseUrl + 'start.wav',
'button.wav': baseUrl + 'button.wav',
'activate.wav': baseUrl + 'activate.wav',
'ping.wav': baseUrl + 'ping.wav',
'target.wav': baseUrl + 'target.wav',
'interaction.wav': baseUrl + 'interaction.wav',
'ok.wav': baseUrl + 'ok.wav',
'uiglitch.wav': baseUrl + 'uiglitch.wav'
};

export const MAX_ACTIVE_SOUNDS = 5;
let activeSounds = [];

export function playSound(fileName, volume = 0.5, pitch = 1) {
  // Check if the file name exists in the map
  if (fileName in soundPaths) {
    // Check if the maximum number of active sounds has been reached
    if (activeSounds.length >= MAX_ACTIVE_SOUNDS) {
      return;
    }
    
    // Create a new Howl instance for the sound
    var sound = new Howl({
      src: [soundPaths[fileName]],
      html5: false,
      pool: 20,
      volume: volume,
      rate: pitch

    });
    
    // Add the sound to the list of active sounds
    activeSounds.push(sound);
    
    // Play the sound
    sound.play();
    
    // Remove the sound from the list of active sounds when it finishes playing
    sound.on('end', function() {
      activeSounds.splice(activeSounds.indexOf(sound), 1);
    });
  } else {
    console.log('Sound file not found: ' + fileName);
  }
}

let sound = new Howl({
  src: '/assets/audio/soundtrack.webm',
  html5: false,
  pool: 20
});

export function playSoundtrack() {
  // Stop the sound if it's currently playing
  sound.stop();

  // Play the sound
  sound.play();
}