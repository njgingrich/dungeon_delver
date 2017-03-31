// @flow

import * as Pixi from 'pixi.js'
import Point from './point'

class Tile {
  name: string
  sprite: Pixi.Sprite
  point: Point

  constructor(name: string, point: Point) {
    this.name = name
    this.point = point
  }
}

export default Tile
