import { activePlayer } from "./game-controller"

const grids = document.querySelectorAll(".board__squares")

const initGrids = () => {
  for (const grid of grids) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const gridSquare = document.createElement("div")
        gridSquare.classList.add("board__square")
        gridSquare.dataset.y = y
        gridSquare.dataset.x = x
        grid.appendChild(gridSquare)
      }
    }
  }
}

const showPlayerShips = () => {
  for (let y = 0; y < activePlayer.board.board.length; y++) {
    for (let x = 0; x < 10; x++) {
      if (activePlayer.board.board[y][x]) {
        grids[0].children[y * 10 + x].classList.add("board__square--ship")
      }
    }
  }
}

// const opponentBoard = document.querySelector(".board--opponent")

// opponentBoard.addEventListener("click", (e) => {
//   if (e.target.className === "board__square") {
//     console.log(e.target)
//   }
// })

export { initGrids, showPlayerShips }
