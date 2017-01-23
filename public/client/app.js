var simpleGame = angular.module('simpleGame', []);

simpleGame.factory('games', function($http) {
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
  }

  return {
    gameBoard: gameBoard,
    playerSpace: playerSpace,
    playerTurn: playerTurn,
    getBoard: getBoard,
    occupyBoard: occupyBoard,
    changePlayer: changePlayer
  }
});

simpleGame.controller('gamesController', function($scope, games) {
  $scope.blank = '_  _';
  // $scope.player1 = ' X ';
  // $scope.player1 = ' O ';
  // $scope.playerTurn = 'p1';
  $scope.playerSpace = ['_X_', '_O_'];
  $scope.playerTurn = 0;

  var init = function() {
    $scope.board = games.getBoard();
    $scope.row0 = $scope.board.board[0];
    $scope.row1 = $scope.board.board[1];
    $scope.row2 = $scope.board.board[2];
    $scope.player = games.changePlayer();
  }

  $scope.playerMove = function(input) {
    if (input.occupy !== '_  _') {
      console.log('invalid move, space occupied');
      return;
    } else {
      games.occupyBoard(input.coord, $scope.player);
      $scope.board = games.getBoard();
      $scope.player = games.changePlayer();
    }
  }

  init();

});