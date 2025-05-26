import Gameboard from "../classes/Gameboard"
import Player from "../classes/Player"
import Ship from "../classes/Ship"
import {
  renderComputerAttack,
  renderPlayerAttack,
  displayWinner,
  initGrids,
  showPlayerShips,
  hideRandomizeBtn,
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

const getRandomShipPlacement = () => {
  const [x, y] = getRandomCoordinates()
  const orientation =
    Math.floor(Math.random() * 2) === 1 ? "vertical" : "horizontal"

  return { x, y, orientation }
}

const placeShipsRandomly = (player) => {
  const shipLengths = [2, 3, 3, 4, 5]

  for (const shipLength of shipLengths) {
    const ship = new Ship(shipLength)
    while (true) {
      try {
        const { x, y, orientation } = getRandomShipPlacement()
        player.board.placeShip(ship, x, y, orientation)
        break
      } catch (err) {
        console.error(err)
      }
    }
  }
}

const populateBoards = () => {
  placeShipsRandomly(realPlayer)
  placeShipsRandomly(computerPlayer)
}

const playerAttack = (x, y, target) => {
  hideRandomizeBtn()
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
  }, 500)
}

const getWinner = () => {
  if (playerToBeAttacked.board.areAllShipsSunk()) return activePlayer
}

const startGame = () => {
  activePlayer = realPlayer
  playerToBeAttacked = computerPlayer

  activePlayer.board = new Gameboard()
  playerToBeAttacked.board = new Gameboard()

  populateBoards()
  initGrids()
  showPlayerShips()
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
  startGame,
}
