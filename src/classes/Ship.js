export default class Ship {
  constructor(length) {
    this.length = length
    this.hitCount = 0
    this.sunk = false
  }

  hit() {
    this.hitCount += 1
    this.isSunk()
    console.log(",ot")
  }

  isSunk() {
    if (this.hitCount >= this.length) this.sunk = true
    return this.sunk
  }
}
