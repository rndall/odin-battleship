const Ship = require("./Ship")

describe("ship", () => {
  const ship = new Ship(4)

  test("properties", () => {
    expect(ship.length).toBe(4)
    expect(ship.hitCount).toBe(0)
    expect(ship.sunk).toBe(false)
  })
})
