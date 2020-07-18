import Component from '@glimmer/component';
import {action} from '@ember/object'
import {tracked} from "@glimmer/tracking";

const winningStates = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6],
]

export default class BoardTileComponent extends Component {
  @tracked playerTurn = true;
  @tracked winner = "";

  isVictory(boardState, player) {
    return winningStates.some(indices => {
      return boardState[indices[0]] === player && boardState[indices[1]] === player && boardState[indices[2]] === player
    })
  }

  /**
   * Check each combination of winningStates and compare boardState indices to them. If any of the indices match up with
   * winningStates, that's a win
   * @param {Array<number>} boardState the current state of the game represented as a 9-bit array with 1 for X, -1 for O and 0 for empty
   * @param {( 1 | -1 )} player numerical representation of the players. X is 1 and O is -1
   */
  checkVictory(boardState, player) {
    if (this.isVictory(boardState, player)) {
      if (player === 1) {
        this.winner = "player";
      } else if (player === -1) {
        this.winner = "enemy";
      }
      this.setWinner();
    } else if (!this.isVictory(boardState, player) && !boardState.includes(0)) {
      this.winner = "draw";
      this.setWinner();
    }
  }

  setWinner() {
    const board = document.querySelector(".game-area");
    const status = document.querySelector(".status");
    const button = document.createElement("button");

    board.style.background = "#FB9032";

    board.classList.remove("grid");
    board.classList.add("flex");
    button.innerHTML = "Play Again";
    button.onclick = (() => {
      window.location.href = "/"
    });
    status.parentNode.replaceChild(button, status)

    if (this.winner === "player") {
      board.style.background = "#7CFFC4";
      board.innerHTML = "You won!"
    } else if (this.winner === "enemy") {
      board.style.background = "#FF837C"
      board.innerHTML = "You lost!"
    } else if (this.winner === "draw") {
      board.innerHTML = "It's a draw!"
    }

    this.localStorageScore();
  }

  localStorageScore() {
    switch (this.winner) {
      case "player":
        window.localStorage.setItem("wins",)
      case "enemy":

      case "draw":
    }
  }

  /**
   * Check the game board and populate the boardArray
   * - If a tile contains an X, push 1
   * - If a tile contains an O, push -1
   * - If a tile is empty, push 0
   */
  checkGameState(player) {
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

    this.checkVictory(boardArray, player);
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
        this.checkVictory();
        return;
      }
      randomPlacement.innerHTML = "O";
      this.playerTurn = true;
      this.checkGameState(-1);
      this.toggleUserClick();
    }, Math.random() * (400 - 200) + 200) // Simulate thinking with a small timeout
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
        return // Don't play computerRound if user clicks on occupied block
      } else {
        tile.innerHTML = "X";
      }

      this.checkGameState(1);
      if (this.winner === "") {
        this.computerRound();
      }
    } else if (this.winner === "player" || this.winner === "enemy") {
      return
    } else alert("It's not your turn!");
  }
}
