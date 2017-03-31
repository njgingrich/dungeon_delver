// @flow

import Tile from './tile'
import TileMap from './tile-map'

/**
 * A TileLayer is a collection of Tiles, which are themselves
 * just a holder of a Pixi.Sprite.
 */
class TileLayer {
  tiles: Tile[][]
  map: TileMap

  constructor(map: TileMap) {
    this.map = map
    this.tiles = this._createTiles()
  }

  _createTiles() {
    const arr = new Array(this.map.HEIGHT)
    for (let row = 0; row < this.map.HEIGHT; row++) {
      arr[row] = new Array(this.map.WIDTH)
    }

    return arr
  }
}

export default TileLayer
