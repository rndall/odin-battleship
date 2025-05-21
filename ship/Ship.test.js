const Ship = require("./Ship")

describe("ship", () => {
  const ship = new Ship(4)

  test("properties", () => {
    expect(ship.length).toBe(4)
    expect(ship.hitCount).toBe(0)
    expect(ship.sunk).toBe(false)
  })

  test("hit function", () => {
    ship.hit()
    expect(ship.hitCount).toBe(1)

    ship.hit()
    expect(ship.hitCount).toBe(2)
  })

  test("isSunk function", () => {
    ship.isSunk()
    expect(ship.sunk).toBe(false)

    ship.hitCount = 4
    ship.isSunk()
    expect(ship.sunk).toBe(true)
  })
})
