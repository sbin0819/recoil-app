var express = require('express');
var router = express.Router();
var todos = require('../mock/todos.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('todos');
});

module.exports = router;
