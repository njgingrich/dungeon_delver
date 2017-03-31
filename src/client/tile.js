// @flow

import Point from './point'

class Tile {
  name: string
  point: Point

  constructor(name: string, point: Point) {
    this.name = name
    this.point = point
  }
}

export default Tile
