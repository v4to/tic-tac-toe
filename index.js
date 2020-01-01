/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let playerX\nlet playerO\n\nconst GameBoard = (() => {\n  let board = [[], [], []]\n  let winnerName\n\n  const resetGame = () => {\n    board = [[], [], []]\n    render()\n  }\n\n  const getWinnerName = () => winnerName\n\n  const updateBoard= (row, cell, mark) => {\n    board[row][cell] = mark\n  }\n\n  const checkForWin = () => {\n    for (let i = 0; i < board.length; i++) {\n\n      for (let j = 0; j < board.length; j++) {\n\n        if (board[i][j]) {\n\n          if (j === 0) {\n            if ((board[i][j] === board[i][j + 1]) && (board[i][j] === board[i][j + 2])) {\n              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()\n\n              return true\n            }\n          }\n\n          if (i === 0) {\n            if ((board[i][j] === board[i + 1][j]) && (board[i][j] === board[i + 2][j])) {\n              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()\n              return true\n            }\n          }\n\n          if (i === 0 && j === 0) {\n            if ((board[i][j] === board[i + 1][j + 1]) && (board[i][j] === board[i + 2][j + 2])) {\n              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()\n              return true\n            }\n          }\n\n          if (i === 0 && j === 2) {\n            if ((board[i][j] === board[i + 1][j - 1]) && (board[i][j] === board[i + 2][j - 2])) {\n              winnerName = board[i][j] === playerX.getMark() ? playerX.getName() : playerO.getName()\n              return true\n            }\n          }\n        }\n      }\n    }\n\n    return false\n  }\n\n  return {\n    board,\n    checkForWin,\n    resetGame,\n    getWinnerName,\n    updateBoard\n  }\n\n})()\n\nconst Player = (mark, name) => {\n  const getName = () => name\n  const getMark = () => mark\n\n  const addMark = (row, cell) => {\n    // debugger\n    GameBoard.updateBoard(row, cell, getMark())\n    // GameBoard.board[row][cell] = getMark()\n  }\n\n  return {\n    getMark,\n    addMark,\n    getName\n  }\n}\n\n// const playerX = Player('X')\n// const playerO = Player('O')\n\nconst GameSettings = (() => {\n  let currentPlayer = playerX\n\n  const getCurrentPlayer = () => currentPlayer\n  const changeCurrentPlayer = () => {\n    currentPlayer = currentPlayer === playerX ? playerO : playerX\n  }\n\n  return {\n    getCurrentPlayer,\n    changeCurrentPlayer\n  }\n\n})()\n\nconst DOMGame = (() => {\n  const boardDOM = document.querySelector('.board')\n  const newGameButton = document.querySelector('.new-game')\n\n\n  return {\n    boardDOM,\n    newGameButton\n  }\n})()\n\n\n\nfunction render() {\n  const {boardDOM} = DOMGame\n  const {board} = GameBoard\n\n  if (board.length) {\n\n    for (let i = 0; i < board.length; i++) {\n\n      for (let j = 0; j < board.length; j++) {\n        boardDOM.rows[i].cells[j].textContent = board[i][j]\n      }\n    }\n\n  }\n}\n\nfunction resetBoard() {\n  const {board} = GameBoard\n  const {boardDOM} = DOMGame\n\n  for (let i = 0; i < board.length; i++) {\n\n    for (let j = 0; j < board.length; j++) {\n\n      const cell = boardDOM.rows[i].cells[j]\n\n      if (cell.firstChild) {\n        cell.firstChild.remove()\n      }\n    }\n\n  }\n\n  GameBoard.resetGame()\n}\n\n\nconst {newGameButton} = DOMGame\nnewGameButton.addEventListener('click', () => {\n  const winnerButton = document.querySelector('.winner')\n\n  if (winnerButton) {\n    winnerButton.remove()\n  }\n\n  if (DOMGame.boardDOM.style.display === '') {\n    DOMGame.boardDOM.style.display = 'table'\n  }\n\n  const newGameForm = document.querySelector('.new-game-form')\n  const {player1, player2} = newGameForm\n\n  playerX = Player('X', player1.value)\n  playerO = Player('O', player2.value)\n\n  GameSettings.changeCurrentPlayer()\n  newGameForm.style.display = 'none'\n\n  document.body.insertBefore(newGameButton, DOMGame.boardDOM)\n\n  resetBoard()\n})\n\nfunction renderWinner() {\n  const winnerDiv = document.createElement('div')\n  winnerDiv.classList.add('winner')\n  winnerDiv.textContent = `${GameBoard.getWinnerName()} wins!`\n\n  document.body.insertBefore(winnerDiv, DOMGame.boardDOM)\n}\n\nconst {boardDOM} = DOMGame\nboardDOM.addEventListener('click', (event) => {\n  const target = event.target\n\n  if (target.tagName !== 'TD' ) {\n    return\n  }\n\n  if (target.textContent) {\n    console.log('already taken')\n    return\n  }\n\n  const {cellIndex} = target\n  const {rowIndex} = target.parentElement\n  const player = GameSettings.getCurrentPlayer()\n\n  target.textContent = player.getMark()\n\n  player.addMark(cellIndex, rowIndex)\n\n  if (GameBoard.checkForWin()) {\n    renderWinner()\n\n    return\n  }\n\n  GameSettings.changeCurrentPlayer()\n})\n\nrender()\n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });