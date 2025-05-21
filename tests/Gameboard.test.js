const Gameboard = require("../classes/Gameboard")
const Ship = require("../classes/Ship")

describe("gameboard", () => {
  const gameboard = new Gameboard()

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
    })

    test("horizontal", () => {
      const destroyer = new Ship(2)

      gameboard.placeShip(destroyer, 0, 0, "horizontal")
      expect(gameboard.board[0][0]).toBe(destroyer)
      expect(gameboard.board[0][1]).toBe(destroyer)
      expect(gameboard.board[0][2]).not.toBe(destroyer)
    })
  })

  describe("receiveAttack function", () => {
    const destroyer = new Ship(2)

    gameboard.placeShip(destroyer, 0, 0, "vertical")

    test("hit", () => {
      gameboard.receiveAttack(0, 1)
      expect(destroyer.hitCount).toBe(1)
    })

    test("miss", () => {
      gameboard.receiveAttack(2, 0)
      expect(gameboard.missedAttacks).toContain([2, 0])
    })
  })
})
