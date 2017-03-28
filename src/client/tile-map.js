import * as Pixi from 'pixi.js'

import Tile from './tile'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

const SPRITESHEET_JSON = 'static/spritesheet.json'
const Container = Pixi.Container
const autoDetectRenderer = Pixi.autoDetectRenderer
const loader = Pixi.loader
const Sprite = Pixi.Sprite

class TileMap {
  tiles: Tile[][]
  WIDTH: number
  HEIGHT: number
  res: Resource
  renderer: any
  stage: any

  constructor(width: number, height: number) {
    this.WIDTH = width
    this.HEIGHT = height
    this.tiles = this._createTiles()

    this.renderer = autoDetectRenderer(this.WIDTH * 32, this.HEIGHT * 32)
    // flow-disable-next-line
    document.querySelector(APP_CONTAINER_SELECTOR).appendChild(this.renderer.view)

    this.stage = new Container()
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

  init() {
    loader
      .add(SPRITESHEET_JSON)
      .load(this._setup)
    this.res = Pixi.loader.resources[SPRITESHEET_JSON]
  }

  _setup() {
    this.put(0, 0, new Tile('king.png'))
  }

  at(x: number, y: number) {
    return this.tiles[y][x] // [row][col]
  }

  put(x: number, y: number, val: Tile) {
    this.tiles[y][x] = val
    console.log('putting sprite', val.sprite, 'at', x, y)

    const sprite = new Sprite(this.res.textures[val.sprite])
    this.stage.addChild(sprite)
    this.renderer.render(this.stage)
  }

  /**
   * Get a coordinate from a set of pixels.
   * @param {number} x The x-coord in pixels.
   * @param {number} y The y-coord in pixels.
   * @return {coord} A coordinate representing a Tile (32x32 pixels)
   */
  static from(x: number, y: number): Object {
    return { x: x / 32, y: y / 32 }
  }
}

export default TileMap
