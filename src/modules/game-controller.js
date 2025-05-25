import Player from "../classes/Player"
import Ship from "../classes/Ship"

const realPlayer = new Player("real")
const computerPlayer = new Player("computer")

const activePlayer = realPlayer

const placeShips = (player) => {
  const shipLengths = [2, 3, 3, 4, 5]
  const coordinates = [
    { x: 0, y: 0, orientation: "horizontal" },
    { x: 0, y: 1, orientation: "horizontal" },
    { x: 0, y: 2, orientation: "horizontal" },
    { x: 0, y: 3, orientation: "horizontal" },
    { x: 0, y: 4, orientation: "horizontal" },
  ]

  for (let i = 0; i < 5; i++) {
    const { x, y, orientation } = coordinates[i]

    const ship = new Ship(shipLengths[i])
    player.board.placeShip(ship, x, y, orientation)
  }
}

const populateBoards = () => {
  placeShips(realPlayer)
  placeShips(computerPlayer)
}

export { realPlayer, computerPlayer, activePlayer, populateBoards }
