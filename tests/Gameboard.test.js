const Gameboard = require("../classes/Gameboard")
const Ship = require("../classes/Ship")

describe("gameboard", () => {
  let gameboard = new Gameboard()

  beforeEach(() => (gameboard = new Gameboard()))

  test("board", () =>
    expect(gameboard.board).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]))

  describe("placeShip function", () => {
    test("vertical", () => {
      const destroyer = new Ship(2)

      gameboard.placeShip(destroyer, 0, 0, "vertical")
      expect(gameboard.board[0][0]).toBe(destroyer)
      expect(gameboard.board[1][0]).toBe(destroyer)
      expect(gameboard.board[2][0]).not.toBe(destroyer)
      expect(gameboard.ships).toContain(destroyer)
    })

    test("horizontal", () => {
      const destroyer = new Ship(2)

      gameboard.placeShip(destroyer, 0, 0, "horizontal")
      expect(gameboard.board[0][0]).toBe(destroyer)
      expect(gameboard.board[0][1]).toBe(destroyer)
      expect(gameboard.board[0][2]).not.toBe(destroyer)
      expect(gameboard.ships).toContain(destroyer)
    })
  })

  describe("receiveAttack function", () => {
    let destroyer

    beforeEach(() => {
      gameboard = new Gameboard()
      destroyer = new Ship(2)
      gameboard.placeShip(destroyer, 0, 0, "vertical")
    })

    test("hit", () => {
      gameboard.receiveAttack(0, 1)
      expect(destroyer.hitCount).toBe(1)
    })

    test("miss", () => {
      gameboard.receiveAttack(2, 0)
      expect(gameboard.missedAttacks[0]).toEqual([2, 0])
    })
  })

  describe("areAllShipsSunk function", () => {
    let ship1, ship2

    beforeEach(() => {
      gameboard = new Gameboard()
      ship1 = new Ship(1)
      ship2 = new Ship(1)
      gameboard.placeShip(ship1, 0, 0, "horizontal")
      gameboard.placeShip(ship2, 1, 0, "horizontal")
    })

    test("return false if not all ships are sunk", () => {
      gameboard.receiveAttack(0, 0)
      expect(ship1.isSunk()).toBe(true)
      expect(ship2.isSunk()).toBe(false)
      expect(gameboard.areAllShipsSunk()).toBe(false)
    })
  })
})
