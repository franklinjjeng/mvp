// angular.module('simpleGame.gamesController', [])

// .controller('gamesController', function($scope, games) {
//   $scope.blank = '_  _';
//   $scope.winner = '';
//   $scope.invalid = '';

//   var renderBoard = function() {
//     return games.getBoard().then(function(data) {
//       $scope.board = data.data;
//       $scope.row0 = $scope.board.board[0];
//       $scope.row1 = $scope.board.board[1];
//       $scope.row2 = $scope.board.board[2];
//     });
//   };

//   var init = function() {
//     renderBoard();
//     games.getScoreBoard().then(function(data) {
//       $scope.playerScore = data.data;
//     });
//     games.getTurn().then(function(player) {
//       $scope.player = player.data;
//     });
//     games.getPieceAge().then(function(data) {
//       $scope.pieceAge = data.data;
//     });
//   }
//   init();

//   var newGame = function() {
//     games.clearBoard()
//     .then(renderBoard())
//     .then(function() {
//       addWinnerScore()
//     });
//   }

//   var addWinnerScore = function() {
//     if (games.determinPlayer($scope.player[0]) === 'player1') {
//       games.updateScoreBoard([$scope.playerScore[0].name, $scope.playerScore[0].score + 1])
//       .then(games.getScoreBoard()
//       .then(function(data) {
//         $scope.playerScore = data.data;
//       }));
//     } else {
//       games.updateScoreBoard([$scope.playerScore[1].name, $scope.playerScore[1].score + 1])
//       .then(games.getScoreBoard()
//       .then(function(data) {
//         $scope.playerScore = data.data;
//       }));
//     }
//   }

//   var pieceAgeCheck = function(player) {
//     return $scope.pieceAge[player].length === 3 ? true : false;
//   };

//   var findPieceAgeCoord = function(player) {
//     $scope.emptyOccupy = $scope.pieceAge[player][0]
//     $scope.pieceAge[player].splice(0, 1);
//   }


//   $scope.playerMove = function(input) {
//     $scope.winner = '';
//     $scope.invalid = '';
//     if (input.occupy !== '_  _') {
//       $scope.invalid = 'Invalid move, space occupied';
//       return;
//     } else {
//       if (pieceAgeCheck($scope.player[1])) {
//         findPieceAgeCoord($scope.player[1]);
//         games.occupyBoard($scope.emptyOccupy, $scope.blank).then(renderBoard());
//       }
//       $scope.pieceAge[$scope.player[1]].push(input.coord);
//       games.occupyBoard(input.coord, $scope.player[0]).then(function(data){
//         renderBoard().then(function() {        
//           if (games.checkWinner($scope.player[0], $scope.board.board)) {
//             $scope.winner += 'Player ' + ($scope.player[1] + 1) + ' ';
//             $scope.winner += '(' + $scope.player[0] + ')' + ' WINS!';
//             newGame();
//           }
//         });
//         games.updatePieceAge($scope.pieceAge).then(function(data) {
//           $scope.pieceAge = data.data;
//         });
//         games.changePlayer(function(player) {
//           $scope.player = player;
//         })
//       });
//     }
//   }


//   // Hooked up to button to test functions when clicked
//   $scope.devFunctions = function() {
//     console.log('test not hooked up');

//     // console.log('Clearing board');
//     // games.clearBoard().then(renderBoard());

//     // console.log('testing change player turn');
//     // games.changePlayer(function(player) {
//     //   $scope.player = player;
//     //   console.log($scope.player);
//     // })

//   };

// });

