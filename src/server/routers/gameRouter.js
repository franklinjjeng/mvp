var express = require('express');
var router = express.Router();
var app = express();

router.route('/move').get(function(req, res, next) {
  res.send('TEST MOVE API');
});

router.route('/move').post(function(req, res, next) {
  res.send('TEST POST for move API');
});

module.exports = router;