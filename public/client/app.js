// angular.module('simpleGame', [
//   'simpleGame.factory',
//   'simpleGame.controller'])

var simpleGame = angular.module('simpleGame', ['ngRoute']);

simpleGame.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {templateUrl: 'pages/game.html'});
  $routeProvider.when('/rules', {templateUrl: 'pages/rules.html'});
  $routeProvider.otherwise({redirectTo: '/game'});
}]);

simpleGame.factory('games', function($http) {

  var blankBoard = {board: 
    [
      [{id: 0, occupy: '_  _', coord: [0, 0]}, {id: 1, occupy: '_  _', coord: [0, 1]}, {id: 2, occupy: '_  _', coord: [0, 2]}],
      [{id: 3, occupy: '_  _', coord: [1, 0]}, {id: 4, occupy: '_  _', coord: [1, 1]}, {id: 5, occupy: '_  _', coord: [1, 2]}],
      [{id: 6, occupy: '_  _', coord: [2, 0]}, {id: 7, occupy: '_  _', coord: [2, 1]}, {id: 8, occupy: '_  _', coord: [2, 2]}]
    ]
  };

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
      if(!playerTurn.data[1]) {
        playerTurn.data[1] = 1;
      } else {
        playerTurn.data[1] = 0;
      }
      updateTurn(playerTurn.data[1]).then(function(current) {
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

  var checkWinner = function(player, board) {
    for (var i = 0; i < board.length; i++) {
      if(rowWin(player, i, board)) {
        return true;
      } else if (colWin(player, i, board)) {
        return true;
      }
    }
    if (majorDiagWin(player, board)) {
      return true;
    } else if (minorDiagWin(player, board)) {
      return true;
    }
    return false;
  };

  var rowWin = function(player, row, board) {
    for (var i = 0; i < board.length; i++) {
      if (board[row][i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var colWin = function(player, col, board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][col].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var majorDiagWin = function(player, board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var minorDiagWin = function(player, board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][board.length - 1 - i].occupy !== player) {
        return false;
      }
    }
    return true;
  };

  var determinPlayer = function(player) {
    if (player === '_X_') {
      return 'player1';
    } else {
      return 'player2';
    }
  };

  var clearBoard = function() {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/clearBoard',
      data: JSON.stringify(blankBoard),
    })
  };

  var getPieceAge = function () {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/pieceAge'
    })
  }

  var updatePieceAge = function (data) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/pieceAge',
      data: JSON.stringify(data)
    })
  }

  var getScoreBoard = function() {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/scoreBoard',
    })
  }

  var updateScoreBoard = function(data) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/scoreBoard',
      data: JSON.stringify(data)
    })
  }

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
    clearBoard: clearBoard,
    determinPlayer: determinPlayer,
    getPieceAge: getPieceAge,
    updatePieceAge: updatePieceAge,
    getScoreBoard: getScoreBoard,
    updateScoreBoard: updateScoreBoard
  }
});

simpleGame.controller('gamesController', function($scope, games) {
  $scope.blank = '_  _';
  $scope.winner = '';
  $scope.invalid = '';

  var renderBoard = function() {
    return games.getBoard().then(function(data) {
      $scope.board = data.data;
      $scope.row0 = $scope.board.board[0];
      $scope.row1 = $scope.board.board[1];
      $scope.row2 = $scope.board.board[2];
    });
  };

  var init = function() {
    renderBoard();
    games.getScoreBoard().then(function(data) {
      $scope.playerScore = data.data;
    });
    games.getTurn().then(function(player) {
      $scope.player = player.data;
    });
    games.getPieceAge().then(function(data) {
      $scope.pieceAge = data.data;
    });
  }
  init();

  var newGame = function() {
    games.clearBoard()
    .then(renderBoard())
    .then(function() {
      $scope.pieceAge = [[],[]];
      games.updatePieceAge($scope.pieceAge)
    })
    .then(function() {
      addWinnerScore()
    });
  }

  var addWinnerScore = function() {
    if (games.determinPlayer($scope.player[0]) === 'player1') {
      games.updateScoreBoard([$scope.playerScore[0].name, $scope.playerScore[0].score + 1])
      .then(games.getScoreBoard()
      .then(function(data) {
        $scope.playerScore = data.data;
      }));
    } else {
      games.updateScoreBoard([$scope.playerScore[1].name, $scope.playerScore[1].score + 1])
      .then(games.getScoreBoard()
      .then(function(data) {
        $scope.playerScore = data.data;
      }));
    }
  }

  var pieceAgeCheck = function(player) {
    return $scope.pieceAge[player].length === 3 ? true : false;
  };

  var findPieceAgeCoord = function(player) {
    $scope.emptyOccupy = $scope.pieceAge[player][0]
    $scope.pieceAge[player].splice(0, 1);
  }


  $scope.playerMove = function(input) {
    $scope.winner = '';
    $scope.invalid = '';
    if (input.occupy !== '_  _') {
      $scope.invalid = 'Invalid move, space occupied';
      return;
    } else {
      if (pieceAgeCheck($scope.player[1])) {
        findPieceAgeCoord($scope.player[1]);
        games.occupyBoard($scope.emptyOccupy, $scope.blank).then(renderBoard());
      }
      $scope.pieceAge[$scope.player[1]].push(input.coord);
      games.occupyBoard(input.coord, $scope.player[0]).then(function(data){
        renderBoard().then(function() {        
          if (games.checkWinner($scope.player[0], $scope.board.board)) {
            $scope.winner += 'Player ' + ($scope.player[1] + 1) + ' ';
            $scope.winner += '(' + $scope.player[0] + ')' + ' WINS!';
            newGame();
          }
        });
        games.updatePieceAge($scope.pieceAge).then(function(data) {
          $scope.pieceAge = data.data;
        });
        games.changePlayer(function(player) {
          $scope.player = player;
        })
      });
    }
  }

  // // Hooked up to button to test functions when clicked
  $scope.devFunctions = function() {
    console.log('test not hooked up');

    // console.log('Clearing board');
    // games.clearBoard().then(renderBoard());

    // console.log('testing change player turn');
    // games.changePlayer(function(player) {
    //   $scope.player = player;
    //   console.log($scope.player);
    // })

  };

});