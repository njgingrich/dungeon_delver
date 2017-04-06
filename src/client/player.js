// @flow

import * as Pixi from 'pixi.js'

class Player {
  name: string
  sprite: Pixi.Sprite
  x: number
  y: number

  constructor(name: string, sprite: Pixi.Sprite) {
    this.name = name
    this.sprite = sprite
  }

  moveLeft(delta: number) {
    this.x -= delta
  }
}

export default Player
