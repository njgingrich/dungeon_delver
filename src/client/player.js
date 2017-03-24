class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  drawPlayer(c) {
    c.fillStyle = 'red'
    c.strokeStyle = 'blue'
    c.beginPath()
    c.rect(this.x, this.y, 10, 10)
    c.lineWidth = 1
    c.stroke()
    c.fill()
  }
}

export default Player
