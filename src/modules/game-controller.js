import Player from "../classes/Player"
import Ship from "../classes/Ship"
import {
  renderComputerAttack,
  renderPlayerAttack,
  displayWinner,
} from "./display-controller"

const realPlayer = new Player("real")
const computerPlayer = new Player("computer")

let activePlayer = realPlayer
const getActivePlayer = () => activePlayer
const toggleActivePlayer = () => {
  activePlayer === realPlayer
    ? (activePlayer = computerPlayer)
    : (activePlayer = realPlayer)

  playerToBeAttacked === realPlayer
    ? (playerToBeAttacked = computerPlayer)
    : (playerToBeAttacked = realPlayer)
}

let playerToBeAttacked = computerPlayer

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
  displayWinner()
  return renderPlayerAttack(playerAttack, target)
}

const getRandomCoordinates = () => {
  const x = Math.floor(Math.random() * 10)
  const y = Math.floor(Math.random() * 10)

  return [x, y]
}

const computerAttack = () => {
  setTimeout(() => {
    let coordinates
    if (getWinner()) {
      displayWinner()
      return
    }

    do {
      coordinates = getRandomCoordinates()
    } while (
      realPlayer.board.receivedAttacks.some(
        (innerArr) => JSON.stringify(innerArr) === JSON.stringify(coordinates)
      )
    )

    const [x, y] = coordinates
    const computerAttack = realPlayer.board.receiveAttack(x, y)
    renderComputerAttack(x, y, computerAttack)
  }, 200)
}

const getWinner = () => {
  if (playerToBeAttacked.board.areAllShipsSunk()) return activePlayer
}

export {
  realPlayer,
  computerPlayer,
  getActivePlayer,
  toggleActivePlayer,
  populateBoards,
  playerAttack,
  computerAttack,
  getWinner,
}
