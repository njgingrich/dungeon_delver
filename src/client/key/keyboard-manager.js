// @flow

import * as Pixi from 'pixi.js'

class KeyboardManager extends Pixi.utils.EventEmitter {
  _pressedKeys: boolean[]
  _releasedKeys: boolean[]
  _downKeys: number[]

  constructor() {
    super()

    this._pressedKeys = []
    this._releasedKeys = []
    this._downKeys = []
    this._enable()
  }

  _enable() {
    window.addEventListener('keydown', this._onKeyDown.bind(this), true)
    window.addEventListener('keyup', this._onKeyUp.bind(this), true)
  }

  _onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode
    if (!this.isDown(key)) {
      this._downKeys.push(key)
      this._pressedKeys[key] = true
      this.emit('pressed', key)
    }
  }

  _onKeyUp(event: KeyboardEvent) {
    const key = event.keyCode
    if (this.isDown(key)) {
      this._pressedKeys[key] = false
      this._releasedKeys[key] = true

      // remove key from downKeys
      const ix = this._downKeys.indexOf(key)
      if (ix !== -1) this._downKeys.splice(ix, 1)
      this.emit('released', key)
    }
  }

  isDown(key: number) {
    return this._downKeys.indexOf(key) !== -1
  }

  isPressed(key: number) {
    return !!this._pressedKeys[key]
  }

  isReleased(key: number) {
    return !!this._releasedKeys[key]
  }

  update() {
    this._downKeys.forEach((key) => {
      this.emit('down', key)
    })
    this._pressedKeys.length = 0
    this._releasedKeys.length = 0
  }
}

export default KeyboardManager
