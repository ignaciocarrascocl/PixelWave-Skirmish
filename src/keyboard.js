import * as PIXI from 'pixi.js'
import { bindKey } from '@rwh/keystrokes'

// Create a custom display object for the keyboard
class VirtualKeyboard extends PIXI.Container {
  constructor() {
    super()

    // Define the layout of the keyboard
    const keys = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['space']
    ]

    // Create the keys as PIXI.Text objects and add them to the keyboard
    keys.forEach((row, i) => {
      const yOffset = i * 40
      row.forEach((key, j) => {
        const xOffset = j * 40
        const keyText = new PIXI.Text(key, { fill: 0xffffff })
        keyText.position.set(xOffset, yOffset)
        this.addChild(keyText)

        // Add event listeners to the keys using Keystrokes
        if (key === 'space') {
          bindKey(key, () => this.emit('keyPress', ' '))
        } else if (key === 'backspace') {
          bindKey(key, () => this.emit('backspace'))
        } else if (key === 'shift') {
          bindKey(key, () => this.emit('shift'))
        } else {
          bindKey(key, () => this.emit('keyPress', key))
        }
      })
    })
  }
}

// Usage:
const keyboard = new VirtualKeyboard()
keyboard.on('keyPress', (key) => console.log(`Pressed: ${key}`))
keyboard.on('backspace', () => console.log('Backspace pressed'))
keyboard.on('shift', () => console.log('Shift pressed'))