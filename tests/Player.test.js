const Player = require("../classes/Player")

describe("player", () => {
  test("board", () => {
    const player = new Player("real")
    const computer = new Player("computer")

    expect(player.board).toBeDefined()
    expect(computer.board).toBeDefined()
  })
})
