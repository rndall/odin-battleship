class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
    this.missedAttacks = []
  }

  placeShip(ship, x, y, orientation) {
    let endSquare = ship.length
    const boardSize = 10
    const err = new Error("Cannot place ship outside the grid boundaries.")

    if (orientation === "vertical") {
      endSquare += y
      if (endSquare > boardSize) throw err
      for (let i = y; i < endSquare; i++) {
        this.board[i][x] = ship
      }
    } else if (orientation === "horizontal") {
      endSquare += x
      if (endSquare > boardSize) throw err
      for (let i = x; i < endSquare; i++) {
        this.board[y][i] = ship
      }
    }
  }

  receiveAttack(x, y) {
    const attackedSquare = this.board[y][x]
    if (attackedSquare) {
      attackedSquare.hit()
    } else {
      this.missedAttacks.push([x, y])
    }
  }
}

module.exports = Gameboard
