class Ship {
  constructor(length) {
    this.length = length
    this.hitCount = 0
    this.sunk = false
  }

  hit() {
    this.hitCount += 1
  }

  isSunk() {
    if (this.hitCount >= this.length) this.sunk = true
    return this.sunk
  }
}

module.exports = Ship
