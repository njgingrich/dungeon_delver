import * as Pixi from 'pixi.js'

import Point from './point'
import Tile from './tile'
import TileLayer from './tile-layer'

const SPRITESHEET_JSON = 'static/spritesheet.json'
const Container = Pixi.Container
const loader = Pixi.loader
const Sprite = Pixi.Sprite

class TileMap {
  layers: TileLayer[]
  WIDTH: number
  HEIGHT: number
  TILE_SIZE: number
  tex: any
  stage: any

  constructor(width: number, height: number, tileSize: number) {
    this.WIDTH = width
    this.HEIGHT = height
    this.TILE_SIZE = tileSize
    this.layers = []
    this.layers.push(new TileLayer(this))

    this.stage = new Container()
    this.stage.width = this.WIDTH
    this.stage.height = this.HEIGHT
    this._bind()
  }

  _bind() {
    this._setup = this._setup.bind(this)
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
        this.putTile(new Tile('ground_1.png', new Point(col, row)))
        // this.put(col, row, new Sprite(this.tex['ground_1.png']))
      }
    }
    this.putTile(new Tile('ghast.png', new Point(10, 4)))
    // this.put(10, 4, new Sprite(this.tex['ghast.png']))
    return true
  }

  at(x: number, y: number) {
    return this.tiles[y][x] // [row][col]
  }

  putTile(val: Tile) {
    const x = val.point.x
    const y = val.point.y

    const TILES = this.layers[0]
    TILES[y][x] = val
    const sprite = new Sprite(this.tex[val.name])
    sprite.x = x * this.TILE_SIZE
    sprite.y = y * this.TILE_SIZE
    this.stage.addChild(sprite)
  }

  put(x: number, y: number, s: Sprite) {
    s.x = x * this.TILE_SIZE
    s.y = y * this.TILE_SIZE
    this.stage.addChild(s)
  }
}

export default TileMap
