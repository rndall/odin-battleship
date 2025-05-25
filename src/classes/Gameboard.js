export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
    this.missedAttacks = []
    this.ships = []
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

    this.ships.push(ship)
  }

  receiveAttack(x, y) {
    const attackedSquare = this.board[y][x]
    if (attackedSquare) {
      attackedSquare.hit()
      return true
    }

    this.missedAttacks.push([x, y])
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }
}
