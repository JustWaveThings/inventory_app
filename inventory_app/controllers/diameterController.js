const Diameter = require("../models/diameter");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// display list of all diameters

exports.diameter_list = asyncHandler(async (req, res, next) => {
  // get a list of all diameters
  const diameters = await Diameter.find({}).exec();
  console.log(diameters);
  res.render("diameter_list", {
    title: "All Diameters",
    items: diameters,
  });
});

// display detail page for a specific diameter

exports.diameter_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter detail GET: " + req.params.id);
});

// display diameter create form on GET

exports.diameter_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter create GET");
});

// handle diameter create on POST

exports.diameter_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter create POST");
});

// display diameter delete form on GET

exports.diameter_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter delete GET");
});

// handle diameter delete on POST

exports.diameter_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter delete POST");
});

// display diameter update form on GET

exports.diameter_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter update GET");
});

// handle diameter update on POST

exports.diameter_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: diameter update POST");
});
