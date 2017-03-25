// @flow

import * as Pixi from 'pixi.js'
import Player from './player'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

const Container = Pixi.Container
const autoDetectRenderer = Pixi.autoDetectRenderer
const loader = Pixi.loader
const resources = Pixi.loader.resources
const Sprite = Pixi.Sprite

class Game {
  player: Player
  renderer: any
  stage: any
  WIDTH: number
  HEIGHT: number

  constructor() {
    this.player = new Player(395, 295)
    this.WIDTH = 800
    this.HEIGHT = 600
    this._bind()
    this.renderer = autoDetectRenderer(800, 600)
    // flow-disable-next-line
    document.querySelector(APP_CONTAINER_SELECTOR).appendChild(this.renderer.view)

    this.stage = new Container()
    this._preload()
  }

  _bind() {
    (this: any)._setup = this._setup.bind(this)
  }

  _preload() {
    loader
      .add('static/spritesheet.png')
      .load(this._setup)
  }

  _setup() {
    const sprite = new Sprite(
      resources['static/spritesheet.png'].texture
    )
    console.log('stage: ', this.stage)
    this.stage.addChild(sprite)
    this.renderer.render(this.stage)
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
