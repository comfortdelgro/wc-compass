export class Position {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

export class Pointer {
  startPoint = new Position()
  lastPoint = new Position()
  currentPoint = new Position()

  down = false
  right = false

  isMoved = false

  start(position) {
    this.startPoint = position
  }

  update(position) {
    this.right = position.x > this.currentPoint.x
    this.down = position.y > this.currentPoint.y
    this.currentPoint = position
    this.isMoved = true
  }

  end(position) {
    this.lastPoint = position
    this.currentPoint = position
  }

  get distance() {
    if (!this.isMoved) {
      return new Position()
    }
    return {
      x: this.currentPoint.x - this.startPoint.x,
      y: this.currentPoint.y - this.startPoint.y,
    }
  }
}
