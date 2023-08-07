var express = require('express');
var router = express.Router();
const roll_controller = require('../controllers/rollController');

/* GET home page. */
router.get('/', roll_controller.index)

module.exports = router;
