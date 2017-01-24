var simpleGame = angular.module('simpleGame', []);

simpleGame.factory('games', function($http) {

  var getScore = function() {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/playerScore'
    });
  }

  var getBoard = function() {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/gameBoard'
    });
  };

  var occupyBoard = function(position, move) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/occupyBoard',
      data: JSON.stringify({position: position, move: move})
    })
  };

  var changePlayer = function(callback) {
    getTurn().then(function(playerTurn) {
      console.log('prev player', playerTurn.data);
      if(!playerTurn.data[1]) {
        playerTurn.data[1] = 1;
      } else {
        playerTurn.data[1] = 0;
      }
      console.log('prev player', playerTurn.data);
      updateTurn(playerTurn.data[1]).then(function(current){
        console.log('current player turn', current.data);
        callback(current.data)
      });
    });
  };

  var getTurn = function() {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/updateTurn'
    });
  };

  var updateTurn = function(turn) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/updateTurn',
      data: JSON.stringify(turn),
    })
  }

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
    getScore: getScore,
    getBoard: getBoard,
    occupyBoard: occupyBoard,
    changePlayer: changePlayer,
    getTurn: getTurn,
    updateTurn: updateTurn,
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

  var renderBoard = function() {
    games.getBoard().then(function(data) {
      $scope.board = data.data;
      $scope.row0 = $scope.board.board[0];
      $scope.row1 = $scope.board.board[1];
      $scope.row2 = $scope.board.board[2];
    });
  };

  var init = function() {
    renderBoard();
    games.getScore().then(function(data) {
        $scope.playerScore = data.data;
    });
    games.getTurn().then(function(player) {
      $scope.player = player.data[0];
      console.log($scope.player);
    });
  }

  init();

  $scope.playerMove = function(input) {
    if (input.occupy !== '_  _') {
      console.log('Invalid move, space occupied');
      return;
    } else {
      games.occupyBoard(input.coord, $scope.player).then(function(data){
        renderBoard();
      // if (games.checkWinner($scope.player)) {
      //   console.log($scope.player + ' WINS!');
      //   games.newGame($scope.player);
      // }
        games.changePlayer(function(player) {
          $scope.player = player;
        })
      });
    }
  }


  // Hooked up to button to test functions when clicked
  $scope.devFunctions = function() {
    // console.log('test not hooked up');
    console.log('testing change player turn');
    games.changePlayer(function(player) {
      $scope.player = player;
    })
  };

});




