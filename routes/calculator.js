var express = require('express');
var router = express.Router();

var total = 0

function setTotal (amount) {
  total = amount;
}

function doMath (obj) {
  switch (obj.type) {
    case 'add':
      setTotal(Number(obj.x) + Number(obj.y));
      break;
    case 'sub':
      setTotal(Number(obj.x) - Number(obj.y));
      break;
    case 'mult':
      setTotal(Number(obj.x) * Number(obj.y));
      break;
    case 'div':
      setTotal(Number(obj.x) / Number(obj.y));
      break;
  }
};

router.post('/', function(req, res) {
  doMath(req.body);
  res.sendStatus(200);
});

router.get('/', function(req, res) {
  res.send(total.toString());
});

router.post('/reset', function(req, res) {
  setTotal(Number(req.body.total));
  res.sendStatus(200);
});

module.exports = router;
