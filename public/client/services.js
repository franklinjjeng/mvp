// angular.module('simpleGame.games', [])

// .factory('games', function($http) {

//   var blankBoard = {board: 
//     [
//       [{id: 0, occupy: '_  _', coord: [0, 0]}, {id: 1, occupy: '_  _', coord: [0, 1]}, {id: 2, occupy: '_  _', coord: [0, 2]}],
//       [{id: 3, occupy: '_  _', coord: [1, 0]}, {id: 4, occupy: '_  _', coord: [1, 1]}, {id: 5, occupy: '_  _', coord: [1, 2]}],
//       [{id: 6, occupy: '_  _', coord: [2, 0]}, {id: 7, occupy: '_  _', coord: [2, 1]}, {id: 8, occupy: '_  _', coord: [2, 2]}]
//     ]
//   };

//   var getScore = function() {
//     return $http({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/playerScore'
//     });
//   }

//   var getBoard = function() {
//     return $http({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/gameBoard'
//     });
//   };

//   var occupyBoard = function(position, move) {
//     return $http({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/occupyBoard',
//       data: JSON.stringify({position: position, move: move})
//     })
//   };

//   var changePlayer = function(callback) {
//     getTurn().then(function(playerTurn) {
//       if(!playerTurn.data[1]) {
//         playerTurn.data[1] = 1;
//       } else {
//         playerTurn.data[1] = 0;
//       }
//       updateTurn(playerTurn.data[1]).then(function(current) {
//         callback(current.data)
//       });
//     });
//   };

//   var getTurn = function() {
//     return $http({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/updateTurn'
//     });
//   };

//   var updateTurn = function(turn) {
//     return $http({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/updateTurn',
//       data: JSON.stringify(turn),
//     })
//   }

//   var checkWinner = function(player, board) {
//     for (var i = 0; i < board.length; i++) {
//       if(rowWin(player, i, board)) {
//         return true;
//       } else if (colWin(player, i, board)) {
//         return true;
//       }
//     }
//     if (majorDiagWin(player, board)) {
//       return true;
//     } else if (minorDiagWin(player, board)) {
//       return true;
//     }
//     return false;
//   };

//   var rowWin = function(player, row, board) {
//     for (var i = 0; i < board.length; i++) {
//       if (board[row][i].occupy !== player) {
//         return false;
//       }
//     }
//     return true;
//   };

//   var colWin = function(player, col, board) {
//     for (var i = 0; i < board.length; i++) {
//       if (board[i][col].occupy !== player) {
//         return false;
//       }
//     }
//     return true;
//   };

//   var majorDiagWin = function(player, board) {
//     for (var i = 0; i < board.length; i++) {
//       if (board[i][i].occupy !== player) {
//         return false;
//       }
//     }
//     return true;
//   };

//   var minorDiagWin = function(player, board) {
//     for (var i = 0; i < board.length; i++) {
//       if (board[i][board.length - 1 - i].occupy !== player) {
//         return false;
//       }
//     }
//     return true;
//   };

//   var determinPlayer = function(player) {
//     if (player === '_X_') {
//       return 'player1';
//     } else {
//       return 'player2';
//     }
//   };

//   // deprecated
//   // var updateScore = function(player) {
//   //   return $http({
//   //     method: 'POST',
//   //     url: 'http://127.0.0.1:3000/updateScore',
//   //     data: JSON.stringify(player),
//   //   })
//   // }

//   var clearBoard = function() {
//     return $http({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/clearBoard',
//       data: JSON.stringify(blankBoard),
//     })
//   };

//   var getPieceAge = function () {
//     return $http({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/pieceAge'
//     })
//   }

//   var updatePieceAge = function (data) {
//     return $http({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/pieceAge',
//       data: JSON.stringify(data)
//     })
//   }

//   var getScoreBoard = function() {
//     return $http({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/scoreBoard',
//     })
//   }

//   var updateScoreBoard = function(data) {
//     return $http({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/scoreBoard',
//       data: JSON.stringify(data)
//     })
//   }

//   return {
//     getScore: getScore,
//     getBoard: getBoard,
//     occupyBoard: occupyBoard,
//     changePlayer: changePlayer,
//     getTurn: getTurn,
//     updateTurn: updateTurn,
//     checkWinner: checkWinner,
//     rowWin: rowWin,
//     colWin: colWin,
//     majorDiagWin: majorDiagWin,
//     minorDiagWin: minorDiagWin,
//     // updateScore: updateScore,
//     clearBoard: clearBoard,
//     determinPlayer: determinPlayer,
//     getPieceAge: getPieceAge,
//     updatePieceAge: updatePieceAge,
//     getScoreBoard: getScoreBoard,
//     updateScoreBoard: updateScoreBoard
//   }
// });