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
  TILE_LAYER: TileLayer
  tex: any
  stage: any

  constructor(width: number, height: number, tileSize: number) {
    this.WIDTH = width
    this.HEIGHT = height
    this.TILE_SIZE = tileSize
    this.layers = []
    this.layers.push(new TileLayer(this))
    this.layers.push(new TileLayer(this))
    this.layers.push(new TileLayer(this))
    this.TILE_LAYER = this.layers[0]
    this.MID_LAYER = this.layers[1]
    this.TOP_LAYER = this.layers[2]

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
    // set the entire map to fill with ground squares on tile layer
    for (let row = 0; row < this.HEIGHT; row++) {
      for (let col = 0; col < this.WIDTH; col++) {
        const p = new Point(col, row)
        this.TILE_LAYER.put(new Tile('ground',
                                     new Sprite(this.tex['ground_1.png'])),
                            p)
      }
    }
    this.MID_LAYER.put(new Tile('Ghast',
                       new Sprite(this.tex['ghast.png'])),
                       new Point(10, 4))
    return true
  }

  drawMap() {
    for (let row = 0; row < this.HEIGHT; row++) {
      for (let col = 0; col < this.WIDTH; col++) {
        this.draw(new Point(col, row))
      }
    }
  }

  draw(pt: Point) {
    this.layers.forEach((layer) => {
      const t = layer.at(pt)
      if (t !== undefined) {
        // const sprite = new Sprite(this.tex[t.spriteName])
        t.sprite.x = pt.x * this.TILE_SIZE
        t.sprite.y = pt.y * this.TILE_SIZE
        this.stage.addChild(t.sprite)
      }
    })
  }
}

export default TileMap
