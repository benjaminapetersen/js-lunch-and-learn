var express = require('express');
var router = express.Router();

// get the mock data
var todos = require('../mock_data/todos');

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // gotta return a string to the browser
  // (html is a string, json is strigified)
  res.send(JSON.stringify(todos));
});


// NOTE: an ID of some for would be better
// so you can be certain that the url will ALWAYS
// return the same object.  indexes in arrays can
// easily change...
router.get('/:todoIndex', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // get the index from the params
  var index = req.params.todoIndex;
  // get the todo item from the list
  var todo = todos[index];
  // stringinfy it!
  var string = JSON.stringify(todo);
  // send that item to the browser
  res.send(string);
});


module.exports = router;
