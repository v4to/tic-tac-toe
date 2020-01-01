let playerX
let playerO

const GameBoard = (() => {
  let board = [[], [], []]
  let winnerName

  const resetGame = () => {
    board = [[], [], []]
    render()
  }

  const getWinnerName = () => winnerName

  const updateBoard= (row, cell, mark) => {
    board[row][cell] = mark
  }

  const checkForWin = () => {
    for (let i = 0; i < board.length; i++) {

      for (let j = 0; j < board.length; j++) {

        if (board[i][j]) {

          if (j === 0) {
            if ((board[i][j] === board[i][j + 1]) && (board[i][j] === board[i][j + 2])) {
              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()

              return true
            }
          }

          if (i === 0) {
            if ((board[i][j] === board[i + 1][j]) && (board[i][j] === board[i + 2][j])) {
              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()
              return true
            }
          }

          if (i === 0 && j === 0) {
            if ((board[i][j] === board[i + 1][j + 1]) && (board[i][j] === board[i + 2][j + 2])) {
              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()
              return true
            }
          }

          if (i === 0 && j === 2) {
            if ((board[i][j] === board[i + 1][j - 1]) && (board[i][j] === board[i + 2][j - 2])) {
              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()
              return true
            }
          }
        }
      }
    }

    return false
  }

  return {
    board,
    checkForWin,
    resetGame,
    getWinnerName,
    updateBoard
  }

})()

const Player = (mark, name) => {
  const getName = () => name
  const getMark = () => mark

  const addMark = (row, cell) => {
    // debugger
    GameBoard.updateBoard(row, cell, getMark())
    // GameBoard.board[row][cell] = getMark()
  }

  return {
    getMark,
    addMark,
    getName
  }
}

// const playerX = Player('X')
// const playerO = Player('O')

const GameSettings = (() => {
  let currentPlayer = playerX

  const getCurrentPlayer = () => currentPlayer
  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX
  }

  return {
    getCurrentPlayer,
    changeCurrentPlayer
  }

})()

const DOMGame = (() => {
  const boardDOM = document.querySelector('.board')
  const newGameButton = document.querySelector('.new-game')


  return {
    boardDOM,
    newGameButton
  }
})()



function render() {
  const {boardDOM} = DOMGame
  const {board} = GameBoard

  if (board.length) {

    for (let i = 0; i < board.length; i++) {

      for (let j = 0; j < board.length; j++) {
        boardDOM.rows[i].cells[j].textContent = board[i][j]
      }
    }

  }
}

function resetBoard() {
  const {board} = GameBoard
  const {boardDOM} = DOMGame

  for (let i = 0; i < board.length; i++) {

    for (let j = 0; j < board.length; j++) {

      const cell = boardDOM.rows[i].cells[j]

      if (cell.firstChild) {
        cell.firstChild.remove()
      }
    }

  }

  GameBoard.resetGame()
}


const {newGameButton} = DOMGame
newGameButton.addEventListener('click', () => {
  const winnerButton = document.querySelector('.winner')

  if (winnerButton) {
    winnerButton.remove()
  }

  if (DOMGame.boardDOM.style.display === '') {
    DOMGame.boardDOM.style.display = 'table'
  }

  const newGameForm = document.querySelector('.new-game-form')
  const {player1, player2} = newGameForm

  playerX = Player('X', player1.value)
  playerO = Player('O', player2.value)

  GameSettings.changeCurrentPlayer()
  newGameForm.style.display = 'none'

  document.body.insertBefore(newGameButton, DOMGame.boardDOM)

  resetBoard()
})

function renderWinner() {
  const winnerDiv = document.createElement('div')
  winnerDiv.classList.add('winner')
  winnerDiv.textContent = `${GameBoard.getWinnerName()} wins!`

  document.body.insertBefore(winnerDiv, DOMGame.boardDOM)
}

const {boardDOM} = DOMGame
boardDOM.addEventListener('click', (event) => {
  const target = event.target

  if (target.tagName !== 'TD' ) {
    return
  }

  if (target.textContent) {
    console.log('already taken')
    return
  }

  const {cellIndex} = target
  const {rowIndex} = target.parentElement
  const player = GameSettings.getCurrentPlayer()

  target.textContent = player.getMark()

  player.addMark(cellIndex, rowIndex)

  if (GameBoard.checkForWin()) {
    renderWinner()

    return
  }

  GameSettings.changeCurrentPlayer()
})

render()

