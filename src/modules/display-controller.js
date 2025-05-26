import {
  getActivePlayer,
  realPlayer,
  computerPlayer,
  toggleActivePlayer,
  playerAttack,
  computerAttack,
  getWinner,
} from "./game-controller"

const grids = document.querySelectorAll(".board__squares")

const initGrids = () => {
  for (const [index, grid] of grids.entries()) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const gridSquare = document.createElement("div")
        gridSquare.classList.add("board__square")
        if (index === 1) gridSquare.classList.add("board__square--opponent")
        gridSquare.dataset.y = y
        gridSquare.dataset.x = x
        grid.appendChild(gridSquare)
      }
    }
  }
}

const showPlayerShips = () => {
  for (let y = 0; y < realPlayer.board.board.length; y++) {
    for (let x = 0; x < 10; x++) {
      if (realPlayer.board.board[y][x]) {
        grids[0].children[y * 10 + x].classList.add("board__square--ship")
      }
    }
  }
}

const opponentBoard = document.querySelector(".board--opponent")

const renderPlayerAttack = (attack, target) => {
  if (attack) {
    target.classList.add("board__square--attack")
    return true
  }

  target.classList.add("board__square--miss")
  toggleActivePlayer()
}

opponentBoard.addEventListener("click", (e) => {
  const square = e.target
  if (
    !square.classList.contains("board__square") ||
    square.classList.length > 2 ||
    getActivePlayer() === computerPlayer ||
    getWinner()
  )
    return

  const hit = playerAttack(square.dataset.x, square.dataset.y, square)
  if (hit) return

  // Computer turn
  computerAttack()
})

const resultsEl = document.querySelector(".game-results")
const winnerEl = document.querySelector(".winner")
const displayWinner = () => {
  const winner = getWinner()
  if (winner) {
    winnerEl.textContent = winner.type === "real" ? "You win!" : "You lost."
    resultsEl.classList.remove("game-results--hidden")
  }
}

const playerBoard = document.querySelector(".board--player .board__squares")
const renderComputerAttack = (x, y, attack) => {
  const square = playerBoard.children[y * 10 + x]

  if (attack) {
    square.classList.add("board__square--attack")
    computerAttack()
    return
  }

  square.classList.add("board__square--miss")
  toggleActivePlayer()
}

export {
  initGrids,
  showPlayerShips,
  renderComputerAttack,
  renderPlayerAttack,
  displayWinner,
}
