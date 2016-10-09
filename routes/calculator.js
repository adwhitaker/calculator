var express = require('express');
var router = express.Router();

var total = null;

mathOpperations = {
  add: function (obj) {
    return Number(obj.x) + Number(obj.y);
  },
  sub: function (obj) {
    return Number(obj.x) - Number(obj.y);

  },
  mult: function (obj) {
    return Number(obj.x) * Number(obj.y);

  },
  div: function (obj) {
    return Number(obj.x) / Number(obj.y);
  },
  reset: function (obj) {
    return Number(obj.total);
  }
};

router.post('/:name', function(req, res) {
  var toCompute = mathOpperations[req.params.name];
  total = toCompute(req.body);
  res.sendStatus(200);
});

router.get('/', function(req, res) {
  res.send(total.toString());
});

module.exports = router;
