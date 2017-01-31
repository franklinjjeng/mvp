var express = require('express');
var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
  name: String,
  score: Number
})

var scoreBoard = mongoose.model('scoreBoard', scoreSchema);

var player1 = new scoreBoard({
  name: 'player1',
  score: 0
})

var player2 = new scoreBoard({
  name: 'player2',
  score: 0
})

scoreBoard.find({name : /^player1/}, function (err, docs) {
  if (!docs.length){
    player1.save(function(err) {
      if (err) throw err;
      console.log('player1 saved to db');
    });
  } else{                
    console.log('user exists: ', player1);
  }
});

scoreBoard.find({name : /^player2/}, function (err, docs) {
  if (!docs.length){
    player2.save(function(err) {
      if (err) throw err;
      console.log('player2 saved to db');
    });
  } else{                
    console.log('user exists: ', player2);
  }
});


app = express();

var gameBoard = {board: 
  [
    [{id: 0, occupy: '_  _', coord: [0, 0]}, {id: 1, occupy: '_  _', coord: [0, 1]}, {id: 2, occupy: '_  _', coord: [0, 2]}],
    [{id: 3, occupy: '_  _', coord: [1, 0]}, {id: 4, occupy: '_  _', coord: [1, 1]}, {id: 5, occupy: '_  _', coord: [1, 2]}],
    [{id: 6, occupy: '_  _', coord: [2, 0]}, {id: 7, occupy: '_  _', coord: [2, 1]}, {id: 8, occupy: '_  _', coord: [2, 2]}]
  ]
};

var pieceAge = [[],[]];

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

app.get('/pieceAge', function(req, res) {
  console.log('GET request recieved on /pieceAge');
  res.send(pieceAge);
});

app.post('/pieceAge', function(req, res) {
  console.log('POST request recieved on /pieceAge');
  req.on('data', function(chunk) {
    var data = JSON.parse(chunk.toString());
    pieceAge = data;
    res.send(pieceAge);
  });
});

app.get('/scoreBoard', function(req, res) {
  console.log('GET request recieved on /scoreBoard');
  mongoose.model('scoreBoard').find({}, function(err, data) {
    if (err) {
      console.log('err', err);
      return;
    }
    res.send(data);
  });
});

app.post('/scoreBoard', function(req, res) {
  console.log('POST request recieved on /scoreBoard');
  req.on('data', function(chunk) {
    var data = JSON.parse(chunk.toString());
    if (data[0] === 'player1') {
      scoreBoard.update({name: /^player1/}, {$set: {score: data[1]}}, function() {
        console.log('updating player1 score with', data[1]);
        res.send('');
      });
    } else if (data[0] === 'player2') {
      scoreBoard.update({name: /^player2/}, {$set: {score: data[1]}}, function() {
        console.log('updating player2 score to', data[1]);
        res.send('');
      });
    }
  })
});


module.exports = app;