class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  }

  placeShip(ship, start, orientation) {
    const [y, x] = start
    const endSquare = y + ship.length

    if (orientation === "vertical") {
      for (let i = y; i < endSquare; i++) {
        this.board[i][x] = ship
      }
    } else if (orientation === "horizontal") {
      for (let i = x; i < endSquare; i++) {
        this.board[y][i] = ship
      }
    }
  }
}

module.exports = Gameboard
