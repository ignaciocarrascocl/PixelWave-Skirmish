// src/wavesGeneration.js
let maxNumberEnemies = 3;
let maxWaves = 100;
let generatedWavesArray = [];
let waves = {};

function generateRandomNumbers(maxNumber) {
  // Generate two random numbers between 0 and maxNumber
  let num1 = Math.floor(Math.random() * (maxNumber/2 + 1));
  let num2 = Math.floor(Math.random() * (maxNumber/2 + 1));

  // Calculate the third number as the difference between maxNumber and the sum of the first two numbers
  let num3 = maxNumber - num1 - num2;

  // If any of the numbers is negative, generate new random numbers
  while (num1 < 0 || num2 < 0 || num3 < 0) {
    num1 = Math.floor(Math.random() * (maxNumber/3 + 1));
    num2 = Math.floor(Math.random() * (maxNumber/3 + 1));
    num3 = maxNumber - num1 - num2;
  }

  // Return the numbers as an array
  return [num1, num2, num3];
}

for (let i = 0; i < maxWaves; i++) {
  generatedWavesArray.push(generateRandomNumbers(maxNumberEnemies));
  maxNumberEnemies++
}

// src/state.js

function convertArrayToObject(arr) {
  return arr.reduce((obj, wave, index) => {
    obj[index+1] = {
      type1: wave[0],
      type2: wave[1],
      type3: wave[2]
    };
    return obj;
  }, {});
}

waves = convertArrayToObject(generatedWavesArray)

// Export the waves array
export { waves };