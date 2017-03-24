// @flow

import Player from './player'

class Game {
  player: Player
  canvas: ?HTMLElement
  c: ?CanvasRenderingContext2D
  WIDTH: number
  HEIGHT: number

  constructor() {
    this.player = new Player(395, 295)
    this.WIDTH = 800
    this.HEIGHT = 600

    this.canvas = document.getElementById('canvas')
    if (this.canvas != null && this.canvas instanceof HTMLCanvasElement) {
      this.c = this.canvas.getContext('2d')
    }

    if (this.canvas == null) {
      this.canvas = new HTMLCanvasElement()
    }
    if (this.canvas instanceof HTMLCanvasElement) {
      this.canvas.width = this.WIDTH
      this.canvas.height = this.HEIGHT
    }

    (this: any).loop = this.loop.bind(this)
    setInterval(this.loop, 20)
  }

  loop() {
    if (this.c != null) {
      this.c.clearRect(0, 0, this.WIDTH, this.HEIGHT)
    }

    this.player.drawPlayer(this.c)
  }

  run() {
    this.WIDTH = 800
  }
}

export default Game
