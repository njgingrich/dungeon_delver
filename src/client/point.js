// @flow

class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Get a coordinate from a set of pixels.
   * @param {number} x The x-coord in pixels.
   * @param {number} y The y-coord in pixels.
   * @return {coord} A coordinate representing a Tile (32x32 pixels)
   */
  static fromPixels(x: number, y: number): Point {
    return new Point(x / 32, y / 32)
  }
}

export default Point
