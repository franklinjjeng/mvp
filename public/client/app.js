var simpleGame = angular.module('simpleGame', []);

simpleGame.factory('games', function($http) {
  var gameBoard = {board: [[00, 01, 02], [10, 11, 12], [20, 21, 22]]};

  var getBoard = function() {
    return gameBoard;
  }

  var testClick = function() {
    console.log('I clicked');
  }

  return {
    gameBoard: gameBoard,
    getBoard: getBoard,
    testClick: testClick,
  }
});

simpleGame.controller('gamesController', function($scope, games) {
  $scope.test = 'teasdfasdfst';

});