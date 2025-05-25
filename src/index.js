import "./css/reset.css"
import "./css/style.css"
import { initGrids, showPlayerShips } from "./modules/display-controller"
import { populateBoards } from "./modules/game-controller"

populateBoards()
initGrids()
showPlayerShips()
