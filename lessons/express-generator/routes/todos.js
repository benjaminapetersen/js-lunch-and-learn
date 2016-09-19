var express = require('express');
var router = express.Router();

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([
    {
      metadata: {
        date: Date.now(),
        due: Date.now() + 10000
      },
      title: 'The thing to do',
      description: 'Something I really need to do'
    }
  ]));
});

module.exports = router;
