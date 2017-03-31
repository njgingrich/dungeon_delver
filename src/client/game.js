// @flow

import TileMap from './tile-map'
import Tile from './tile'
import Player from './player'

class Game {
  player: Player
  tiles: TileMap
  res: any

  constructor() {
    this.player = new Player('hero.png')
    this.tiles = new TileMap(25, 20)
    this._bind()
    this._setup()
  }

  _bind() {
    (this: any)._setup = this._setup.bind(this)
  }

  async _setup() {
    await this.tiles.init(() => {
      this.tiles.put(1, 1, new Tile(this.player.name))
    })
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
