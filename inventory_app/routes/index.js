const express = require("express");
const router = express.Router();
const roll_controller = require("../controllers/rollController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/catalog");
});

module.exports = router;
