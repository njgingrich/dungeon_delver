// @flow

import * as Pixi from 'pixi.js'

import Player from './player'
import Point from './point'
import Tile from './tile'
import TileMap from './tile-map'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

class Game {
  HUD_WIDTH: number
  player: Player
  tiles: TileMap
  res: any
  renderer: any

  constructor() {
    this.HUD_WIDTH = 120
    this.tiles = new TileMap(25, 20, 32)
    this.renderer = Pixi.autoDetectRenderer(this.tiles.WIDTH * this.tiles.TILE_SIZE,
                                            this.tiles.HEIGHT * this.tiles.TILE_SIZE)

    // flow-disable-next-line
    document.querySelector(APP_CONTAINER_SELECTOR).appendChild(this.renderer.view)
    this._bind()
    this._setup(() => {
      this.animate()
    })
  }

  _bind() {
    (this: any)._setup = this._setup.bind(this);
    (this: any).animate = this.animate.bind(this)
  }

  _getWidth(): number {
    return (this.tiles.WIDTH * this.tiles.TILE_SIZE) + this.HUD_WIDTH
  }

  async _setup(callback: Function) {
    await this.tiles.init(() => {
      this.player = new Player('Hero',
                             new Pixi.Sprite(this.tiles.tex['hero.png']))
      this.tiles.put(1, 1, this.player.sprite)
      callback()
    })
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.tiles.stage)
  }

  /*
  _drawHud() {
    this.c.fillStyle = 'rgb(61, 38, 24)'
    this.c.fillRect(0, 0, 176, this.HEIGHT)

    // draw inventory squares
    const squarePos = []
    for (let i = 1; i <= 3; i++) {
      squarePos.push({
        x: 16,
        y: this.HEIGHT - ((16 + 64) * i)
      })
      squarePos.push({
        x: 96,
        y: this.HEIGHT - ((16 + 64) * i)
      })
    }
    squarePos.forEach((sq) => {
      this._drawInventorySquare(sq.x, sq.y)
    })
  }

  _drawInventorySquare(x: number, y: number) {
    this.c.fillStyle = 'rgb(35, 22, 14)'
    this.c.fillRect(x, y, 64, 64)
  }
  */
}

export default Game
