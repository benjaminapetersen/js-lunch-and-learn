var express = require('express');
var router = express.Router();
var mock_todos = require('../../mock_data/todos');

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(mock_todos));
});

module.exports = router;
