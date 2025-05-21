class Ship {
  constructor(length) {
    this.length = length
    this.hitCount = 0
    this.sunk = false
  }

  hit() {
    this.hitCount += 1
  }
}

module.exports = Ship
