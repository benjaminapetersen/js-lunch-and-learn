// we need express to make an express app
var express = require('express');


// lets put routes here
var index = require('./routes/index');
var todos = require('./routes/todos');


// then, we can make our app
// calling the express() function will return an
// object that has methods. these methods are what
// we use to setup our express application.
var myApp = express();

// tell your app to use the routes we create above
// give it a base path here, even though inside the
// route file, you can add a bunch more paths.
myApp.use('/', index);
//myApp.use('/todos', todos);
// /api = json, otherwise our routes return html.
myApp.use('/api/todos', todos);

// then, we need to tell our app how to pay attention
// "listen" for requests (where to listen) so it can
// respond and give us back html, data, etc
var port = 3000;
myApp.listen(port, function() {
  console.log('myApp is running on port ' + port);
});
