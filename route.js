var express = require('express');
app = express();

var gameBoard = {board: 
  [
    [{id: 0, occupy: '_  _', coord: [0, 0]}, {id: 1, occupy: '_  _', coord: [0, 1]}, {id: 2, occupy: '_  _', coord: [0, 2]}],
    [{id: 3, occupy: '_  _', coord: [1, 0]}, {id: 4, occupy: '_  _', coord: [1, 1]}, {id: 5, occupy: '_  _', coord: [1, 2]}],
    [{id: 6, occupy: '_  _', coord: [2, 0]}, {id: 7, occupy: '_  _', coord: [2, 1]}, {id: 8, occupy: '_  _', coord: [2, 2]}]
  ]
};

var playerScore = {scores:
  {
    player1: 0,
    player2: 0
  }
}

var playerSpace = ['_X_', '_O_'];

var playerTurn = 0;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index.html')
})

app.get('/gameBoard', function(req, res) {
  console.log('GET request recieved on /gameBoard');
  res.send(gameBoard);
});

app.get('/playerScore', function(req, res) {
  console.log('GET request recieved on /playerScore');
  res.send(playerScore);
});

app.get('/updateTurn', function(req, res, callback) {
  console.log('GET request recieved on /updateTurn');
  res.send([playerSpace[playerTurn], playerTurn]);
});

app.post('/updateTurn', function(req, res) {
  console.log('POST request recieved on /updateTurn');
  req.on('data', function(chunk) {
    playerTurn = JSON.parse(chunk.toString());
    res.send([playerSpace[playerTurn], playerTurn]);
  });
});

app.post('/occupyBoard', function(req, res) {
  console.log('POST request recieved on /occupyBoard');
  req.on('data', function(chunk) {
    var occupy = JSON.parse(chunk.toString());
    gameBoard.board[occupy.position[0]][occupy.position[1]].occupy = occupy.move;
    res.send(gameBoard);
  });
});

app.post('/clearBoard', function(req, res) {
  console.log('POST request recieved on /clearBoard');
  req.on('data', function(chunk) {
    gameBoard = JSON.parse(chunk.toString());
    res.send(gameBoard);
  });
});

app.post('/updateScore', function(req, res) {
  console.log('POST request recieved on /updateScore');
  req.on('data', function(chunk) {
    playerScore.scores[JSON.parse(chunk.toString())]++;
    console.log(playerScore);
    res.send(playerScore);
  });
});

module.exports = app;