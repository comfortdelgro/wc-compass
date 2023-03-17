export class Position {
  constructor(x = 0, y = 0) {}
}

export class Pointer {
  startPoint = new Position()
  lastPoint = new Position()
  currentPoint = new Position()

  didMoving = false

  start(position) {
    this.startPoint = position
  }

  update(position) {
    this.currentPoint = position
  }

  end(position) {
    this.lastPoint = position
    this.currentPoint = position
  }

  get distance() {
    return {
      x: this.currentPoint.x - this.startPoint.x,
      y: this.currentPoint.y - this.startPoint.y,
    }
  }
}
