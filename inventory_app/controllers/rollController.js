const Roll = require("../models/roll");
const Brand = require("../models/brand");
const Material = require("../models/material");
const Diameter = require("../models/diameter");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const material = require("../models/material");

exports.index = asyncHandler(async (req, res, next) => {
  const [numBrands, numMaterials, numRolls, numDiameters] = await Promise.all([
    Brand.countDocuments({}).exec(),
    Material.countDocuments({}).exec(),
    Roll.countDocuments({}).exec(),
    Diameter.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Filament Online - Ready GetSet Extrude!",
    brand_count: numBrands,
    material_count: numMaterials,
    roll_count: numRolls,
    diameter_count: numDiameters,
  });
});
// display list of all rolls

exports.roll_list = asyncHandler(async (req, res, next) => {
  const rolls = await Roll.find({}).populate("material brand diameter").exec();

  rolls.forEach((roll) => console.log(roll.name));

  res.render("roll_list", {
    title: "All filament rolls",
    store_title: "Filament Online - Ready GetSet Extrude!",
    items: rolls,
  });
});

// display detail page for a specific roll

exports.roll_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll detail: " + req.params.id);
});
// display roll create form on GET

exports.roll_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll create GET");
});

// handle roll create on POST

exports.roll_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll create POST");
});

// display roll delete form on GET

exports.roll_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll delete GET");
});

// handle roll delete on POST

exports.roll_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll delete POST");
});

// display roll update form on GET

exports.roll_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll update GET");
});

// handle roll update on POST

exports.roll_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll update POST");
});
