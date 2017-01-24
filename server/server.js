var app = require('./route');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/score');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function() {
  console.log('Mongoose connection successful');
}) 

var port = 3000;

app.listen(port, function(){
  console.log('Listening on port', port);
});