import Player from './player'

class Game {
  constructor() {
    this.player = new Player()
    this.canvas = document.getElementById('canvas')
    this.WIDTH = 800
    this.HEIGHT = 600
    this.canvas.width = this.WIDTH
    this.canvas.height = this.HEIGHT
  }

  run() {

  }
}

export default Game
