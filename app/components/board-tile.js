import Component from '@glimmer/component';
import {action} from '@ember/object'
import {tracked} from "@glimmer/tracking";
import {chunk} from "lodash-es";

const winningStates = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 7], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [6, 5, 2],
]

export default class BoardTileComponent extends Component {
  @tracked playerTurn = true;
  @tracked winner = "";

  checkVictory(boardState) {
    if (this.winner === "player" || this.winner === "enemy") {
      this.setWinner();
    }

    const board = chunk(boardState, 3);
    board.forEach(row => {
      let rowSum = 0;
      row.forEach(box => {
        rowSum = rowSum + box;
      })

      if (rowSum === 3) {
        this.winner = "player"
        this.setWinner();
      } else if (rowSum === -3) {
        this.winner = "enemy"
        this.setWinner();
      }
    })
  }

  /**
   * Upon reaching a victory or draw state, create an overlay over the game board with the outcome on it
   */
  createOverlay() {
    const board = document.querySelector(".game-area");
    const status = document.querySelector(".status");
    const button = document.createElement("button");

    board.classList.remove("grid");
    board.classList.add("flex");
    button.innerHTML = "Play Again";
    button.onclick = this.resetGame;

    if (this.winner === "player") {
      board.style.background = "#7CFFC4";
      board.innerHTML = "You won!"
    } else if ( this.winner === "enemy") {
      board.style.background = "#FF837C"
      board.innerHTML = "You lost!"
    }

    console.log(status.parentNode);
    status.parentNode.replaceChild(button, status)
  }

  setWinner() {
    const tiles = document.querySelectorAll(".grid-item");

    tiles.forEach(tile => {
      if (this.winner === "player") {
        tile.parentNode.removeChild(tile)
      } else if (this.winner === "enemy") {
        tile.classList.add("enemy-victory");
      }
      tile.classList.remove("player-turn");
    })

    this.createOverlay()
  }

  /**
   * Check the game board and populate the boardArray
   * - If a tile contains an X, push 1
   * - If a tile contains an O, push -1
   * - If a tile is empty, push 0
   */
  checkGameState() {
    const board = document.querySelectorAll(".grid-item");
    const boardArray = [];

    board.forEach((row) => {
      let textContent = row.innerHTML;
      if (textContent === "X") {
        boardArray.push(1)
      } else if (textContent === "O") {
        boardArray.push(-1)
      } else {
        boardArray.push(0)
      }
    });
    // window.localStorage.setItem("game-in-progress", boardArray);
    this.checkVictory(boardArray);
  }

  /**
   * Checks whether playerTurn is true or false.<br>
   * - If true, add the .player-turn class to each row
   * - If false, remove the class to disable the squares from being clicked
   */
  toggleUserClick() {
    const fullBoard = document.querySelectorAll(".grid-item");
    fullBoard.forEach(row => {
      if (this.playerTurn && !row.classList.contains("player-turn")) {
        row.classList.add("player-turn")
      } else {
        row.classList.remove("player-turn")
      }
    })
    this.setStatus();
  }

  /**
   * Get AI to place an O on a random empty spot on the board <br>
   */
  computerRound() {
    this.playerTurn = false;
    this.setStatus();
    this.toggleUserClick();
    const fullBoard = document.querySelectorAll(".grid-item");
    let emptyRows = [];

    // Find all empty rows and push them into emptyRows array
    fullBoard.forEach(row => {
      let textContent = row.innerHTML;
      if (textContent === "X" || textContent === "O") {
        return
      } else {
        emptyRows.push(row)
      }
    })

    // Pick a random empty box and place an "O" there
    const randomPlacement = emptyRows[Math.floor(Math.random() * emptyRows.length)];
    setTimeout(() => {
      if (!randomPlacement) {
        alert("There's no more moves possible!");
        return;
      }
      randomPlacement.innerHTML = "O";
      this.playerTurn = true;
      this.checkGameState();
      this.toggleUserClick();
    }, Math.random() * (800 - 500) + 500) // Simulate thinking with a small timeout
  }

  /**
   * Modify div.status text based on whether it's currently the player's turn or not
   */
  setStatus() {
    const textBox = document.querySelector(".status");

    if (this.playerTurn) {
      textBox.innerHTML = "Your turn";
      textBox.classList.remove("enemy");
      textBox.classList.add("player");
    } else {
      textBox.innerHTML = "Enemy turn";
      textBox.classList.remove("player");
      textBox.classList.add("enemy");
    }
  }

  /**
   * Gets the clicked box, and changes its innerHTML content to be an X if it's not occupied already <br>
   * It then calls thecheckGameState() and computerRound() methods
   * @param event
   */
  @action playerRound(event) {
    const tile = document.getElementById(event.target.id)

    if (tile.classList.contains("player-turn")) {
      if (tile.innerHTML === "X" || tile.innerHTML === "O") {
        alert("This tile is already occupied");
      } else {
        tile.innerHTML = "X";
      }

      this.checkGameState();
      if (this.winner === "") {
        this.computerRound();
      }
    } else if (this.winner === "player" || this.winner === "enemy"){
      return
    } else alert("It's not your turn!");
  }

  resetGame() {
    debugger;
    console.log("reset");
    window.location.href = "/"
  }
}
