export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
    this.missedAttacks = []
    this.receivedAttacks = []
    this.ships = []
  }

  placeShip(ship, x, y, orientation) {
    let endSquare = ship.length
    const boardSize = 10
    const err = new Error("Cannot place ship outside the grid boundaries.")
    const shipAlreadyPlacedErr = new Error("A ship is already placed here.")
    let coordinates

    if (orientation === "vertical") {
      coordinates = Array.from({ length: ship.length }, (_, index) => index + y)
      endSquare += y
      if (endSquare > boardSize) throw err
      for (let i = y; i < endSquare; i++) {
        if (this.board[i][x]) throw shipAlreadyPlacedErr
      }
      for (const y of coordinates) this.board[y][x] = ship
    } else if (orientation === "horizontal") {
      coordinates = Array.from({ length: ship.length }, (_, index) => index + x)
      endSquare += x
      if (endSquare > boardSize) throw err
      for (let i = x; i < endSquare; i++) {
        if (this.board[y][i]) throw shipAlreadyPlacedErr
      }
      for (const x of coordinates) this.board[y][x] = ship
    }

    this.ships.push(ship)
  }

  receiveAttack(x, y) {
    const attackedSquare = this.board[y][x]

    this.receivedAttacks.push([x, y])

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
