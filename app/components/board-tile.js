import Component from '@glimmer/component';
import { action } from '@ember/object';

const winningStates = [
  [0,1,2], // Horizontal
  [3,4,5],
  [6,7,8],
  [0,3,7], // Vertical
  [1,4,7],
  [2,5,8],
  [0,4,8], // Diagonal
  [6,5,2],
]

export default class BoardTileComponent extends Component {
  /**
   * Check all the .grid-item boxes and get their innerHTML. If it's an X, push 1 to the array, if it's a O push -1 and otherwise push 0
   * @returns { Array }
   */
  checkGameState() {
    if (window.localStorage.getItem("game-in-progress")) {
      this.checkVictory();
    } else {
      const board = document.querySelectorAll(".grid-item");
      const boardArray = [];

      board.forEach((row, index) => {
        let textContent = row.innerHTML;
        if (textContent === "X") {
          boardArray.push(1)
        } else if (textContent === "O") {
          boardArray.push(-1)
        } else { boardArray.push(0) }
      });
      window.localStorage.setItem("game-in-progress", boardArray);
      this.checkVictory(boardArray);
    }
  }

  checkVictory() {

  }

  @action playerRound(event) {
    const tile = document.getElementById(event.target.id)

    if (tile.innerHTML === "X" || tile.innerHTML === "O") {
      alert("This tile is already occupied");
    } else {
      tile.innerHTML = "X";
    }
    this.checkGameState()
  }
}
