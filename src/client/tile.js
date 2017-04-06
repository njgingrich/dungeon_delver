// @flow

import * as Pixi from 'pixi.js'

class Tile {
  name: string
  sprite: Pixi.Sprite

  constructor(name: string, sprite: Pixi.Sprite) {
    this.name = name
    this.sprite = sprite
  }
}

export default Tile
