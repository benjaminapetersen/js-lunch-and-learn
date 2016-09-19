// lets make the index route(s)
var express = require('express');
var router = express.Router();

var todos = require('../mock_data/todos');

var html =  '<html>' +
              '<body>' +
                '<h1>Hello World</h1>' +
                // TODO 1:
                // - use the todos to make a list of links to click in index route
                // - can also create a todos html file & list them...
                // TODO 2:
                // create 'api/users' as a list, in /mock_data/users
                // and create routes that you can go to to see all users, and individual users.
                // preferrably by ID or name, not by the array index.
                // NEXT WEEK:
                // - get a template engine, use the /views directory we made
                // - perhaps use mongoDB to store the todos, instead of a file
                //   in the mock_data folder.
              '</body>' +
            '</html>';


// add an HTTP GET method
router.get('/', function(request, response) {
  response.send(html);
});


router.get('/about', function(req, res) {
  res.send('About?');
});


module.exports = router;
