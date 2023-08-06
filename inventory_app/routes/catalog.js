const express = require("express");
const catalog = express.Router();

/* GET home page. */
catalog.get("/", function (req, res, next) {
  res.render("index", {
    title: "F.O.R.G.E. - Filament Outlet: Ready, GetSet, Extrude!",
  });
});

module.exports = catalog;
