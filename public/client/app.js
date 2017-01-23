var simpleGame = angular.module('simpleGame', []);

simpleGame.factory('games', function($http) {

  var playerScore = {scores:
    {
      player1: 0,
      player2: 0
    }
  }

  var getScore = function() {
    return playerScore;
  }

  var gameBoard = {board: 
    [
      [{id: 0, occupy: '_  _', coord: [0, 0]}, {id: 1, occupy: '_  _', coord: [0, 1]}, {id: 2, occupy: '_  _', coord: [0, 2]}],
      [{id: 3, occupy: '_  _', coord: [1, 0]}, {id: 4, occupy: '_  _', coord: [1, 1]}, {id: 5, occupy: '_  _', coord: [1, 2]}],
      [{id: 6, occupy: '_  _', coord: [2, 0]}, {id: 7, occupy: '_  _', coord: [2, 1]}, {id: 8, occupy: '_  _', coord: [2, 2]}]
    ]
  };

  var playerSpace = ['_O_', '_X_'];
  
  var playerTurn = 0;

  var getBoard = function() {
    return gameBoard;
  };

  var occupyBoard = function(position, move) {
    gameBoard.board[position[0]][position[1]].occupy = move;
  };

  var changePlayer = function() {
    if(!playerTurn) {
      playerTurn = 1;
    } else {
      playerTurn = 0;
    }
    return playerSpace[playerTurn];
  };

  var checkWinner = function(player) {
    for (var i = 0; i < gameBoard.board.length; i++) {
      if(rowWin(player, i)) {
        return true;
      } else if (colWin(player, i)) {
        return true;
      }
    }
    if (majorDiagWin(player)) {
      return true;
    } else if (minorDiagWin(player)) {
      return true;
    }
    return false;
  };

  var rowWin = function(player, row) {
    for (var i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[row][i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var colWin = function(player, col) {
    for (var i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i][col].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var majorDiagWin = function(player) {
    for (var i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i][i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var minorDiagWin = function(player) {
    for (var i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i][gameBoard.board.length - 1 - i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var updateScore = function(player) {
    if (player === '_X_') {
      playerScore.scores.player1++;
      return playerScore.scores.player1;
    } else {
      playerScore.scores.player2++;
      return playerScore.scores.player2;
    }
  };

  var clearBoard = function() {
    for (var i = 0; i < gameBoard.board.length; i++) {
      for (var j = 0; j < gameBoard.board.length; j++) {
        gameBoard.board[i][j].occupy = '_  _';
      }
    }
  };

  var newGame = function(player) {
    updateScore(player);
    getScore();
    clearBoard();
    getBoard();
  };

  return {
    playerScore: playerScore,
    getScore: getScore,
    gameBoard: gameBoard,
    playerSpace: playerSpace,
    playerTurn: playerTurn,
    getBoard: getBoard,
    occupyBoard: occupyBoard,
    changePlayer: changePlayer,
    checkWinner: checkWinner,
    rowWin: rowWin,
    colWin: colWin,
    majorDiagWin: majorDiagWin,
    minorDiagWin: minorDiagWin,
    updateScore: updateScore,
    clearBoard: clearBoard,
    newGame: newGame,
  }
});

simpleGame.controller('gamesController', function($scope, games) {
  $scope.blank = '_  _';

  var init = function() {
    $scope.board = games.getBoard();
    $scope.row0 = $scope.board.board[0];
    $scope.row1 = $scope.board.board[1];
    $scope.row2 = $scope.board.board[2];
    $scope.player = games.changePlayer();
    $scope.playerScore = games.getScore();
  }

  $scope.playerMove = function(input) {
    if (input.occupy !== '_  _') {
      console.log('Invalid move, space occupied');
      return;
    } else {
      games.occupyBoard(input.coord, $scope.player);
      $scope.board = games.getBoard();
      if (games.checkWinner($scope.player)) {
        console.log($scope.player + ' wins!');
        games.newGame($scope.player);
      }
      $scope.player = games.changePlayer();
    }
  }

  // Hooked up to button to test functions when clicked
  $scope.devFunctions = function() {
    console.log('test not hooked up');
    // console.log($scope.playerScore);
  };

  init();

});