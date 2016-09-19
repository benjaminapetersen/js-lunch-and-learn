var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{
    name: {
      first: 'Conroy',
      last: 'Cage'
    },
    age: 30,
    email: 'ccage@redhat.com'
  }, {
    name: {
      first: 'Jethro',
      last: 'Jacobs'
    },
    age: 30,
    email: 'jjacobs@redhat.com'
  }]));
});

module.exports = router;
