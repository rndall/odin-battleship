import { activePlayer, realPlayer, computerPlayer } from "./game-controller"

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

opponentBoard.addEventListener("click", (e) => {
  const square = e.target
  if (!square.classList.contains("board__square")) return
  if (activePlayer === computerPlayer) return

  const attack = computerPlayer.board.receiveAttack(
    square.dataset.x,
    square.dataset.y
  )

  if (attack) {
    square.classList.add("board__square--attack")
    return
  }

  square.classList.add("board__square--miss")
})

export { initGrids, showPlayerShips }
