var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'F.O.R.G.E. - Filament Outlet: Ready, GetSet, Extrude!' });
});

module.exports = router;
