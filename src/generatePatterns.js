import { Noise } from 'noisejs';

export function generatePatterns() {
    const patterns = [];
  
    for (let i = 0; i < 10; i++) {
      let pattern;
      let sum;
      const patternSize = Math.floor(Math.random() * 3) + 3;
  
      do {
        sum = 0;
        const noise = new Noise(Math.random());
        pattern = [];
  
        for (let x = 0; x < patternSize; x++) {
          const row = [];
  
          for (let y = 0; y < patternSize; y++) {
            const noiseValue = noise.perlin2(x / patternSize, y / patternSize);
            const cellValue = noiseValue > 0 ? 1 : 0;
  
            row.push(cellValue);
            sum += cellValue;
          }
  
          pattern.push(row);
        }
      } while (sum < (patternSize * patternSize) / 2);
  
      patterns.push(pattern);
    }
  
    return patterns;
  }
  
  
  