import * as Pixi from 'pixi.js'

import Point from './point'
import Tile from './tile'

const SPRITESHEET_JSON = 'static/spritesheet.json'
const Container = Pixi.Container
const loader = Pixi.loader
const Sprite = Pixi.Sprite

class TileMap {
  tiles: Tile[][]
  WIDTH: number
  HEIGHT: number
  TILE_SIZE: number
  tex: any
  stage: any

  constructor(width: number, height: number, tileSize: number) {
    this.WIDTH = width
    this.HEIGHT = height
    this.TILE_SIZE = tileSize
    this.tiles = this._createTiles()

    this.stage = new Container()
    this.stage.width = this.WIDTH
    this.stage.height = this.HEIGHT
    this._bind()
  }

  _bind() {
    this._setup = this._setup.bind(this)
  }

  _createTiles() {
    const arr = new Array(this.HEIGHT)
    for (let row = 0; row < this.HEIGHT; row++) {
      arr[row] = new Array(this.WIDTH)
    }

    return arr
  }

  async init(callback: Function): res {
    loader
      .add(SPRITESHEET_JSON)
      .load(() => {
        this._setup()
        callback()
      })
  }

  _setup() {
    this.tex = Pixi.loader.resources[SPRITESHEET_JSON].textures

    for (let row = 0; row < this.HEIGHT; row++) {
      for (let col = 0; col < this.WIDTH; col++) {
        this.put(new Tile('ground_1.png', new Point(col, row)))
      }
    }
    this.put(new Tile('king.png', new Point(0, 0)))
    return true
  }

  at(x: number, y: number) {
    return this.tiles[y][x] // [row][col]
  }

  put(val: Tile) {
    const x = val.point.x
    const y = val.point.y

    this.tiles[y][x] = val
    const sprite = new Sprite(this.tex[val.name])
    sprite.x = x * this.TILE_SIZE
    sprite.y = y * this.TILE_SIZE
    this.stage.addChild(sprite)
  }
}

export default TileMap
