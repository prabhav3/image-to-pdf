var express = require('express');
var router = express.Router();

/* GET home page. */
var path = require('path');
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, ))
});

module.exports = router;
