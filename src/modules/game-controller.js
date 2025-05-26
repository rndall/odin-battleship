import Player from "../classes/Player"
import Ship from "../classes/Ship"
import { renderComputerAttack, renderPlayerAttack } from "./display-controller"

const realPlayer = new Player("real")
const computerPlayer = new Player("computer")

let activePlayer = realPlayer
const toggleActivePlayer = () =>
  activePlayer === realPlayer
    ? (activePlayer = computerPlayer)
    : (activePlayer = realPlayer)

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

const playerAttack = (x, y, target) => {
  const playerAttack = computerPlayer.board.receiveAttack(x, y)
  return renderPlayerAttack(playerAttack, target)
}

const getRandomCoordinates = () => {
  const x = Math.floor(Math.random() * 9)
  const y = Math.floor(Math.random() * 9)

  return [x, y]
}

const getComputerTurn = () => {
  const coordinates = getRandomCoordinates()

  if (!computerPlayer.board.missedAttacks.includes(coordinates))
    return coordinates
}

const computerAttack = () => {
  const [x, y] = getComputerTurn()
  const computerAttack = realPlayer.board.receiveAttack(x, y)
  renderComputerAttack(x, y, computerAttack)
}

export {
  realPlayer,
  computerPlayer,
  activePlayer,
  toggleActivePlayer,
  populateBoards,
  playerAttack,
  computerAttack,
}
