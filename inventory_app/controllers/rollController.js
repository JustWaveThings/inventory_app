const Roll = require("../models/roll");
const Brand = require("../models/brand");
const Material = require("../models/material");
const Diameter = require("../models/diameter");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numBrands, numMaterials, numRolls, numDiameters] = await Promise.all([
    Brand.countDocuments({}).exec(),
    Material.countDocuments({}).exec(),
    Roll.countDocuments({}).exec(),
    Diameter.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Inventory Home",
    brand_count: numBrands,
    material_count: numMaterials,
    roll_count: numRolls,
    diameter_count: numDiameters,
  });
});
// display list of all rolls

// display detail page for a specific roll

// display roll create form on GET

// handle roll create on POST

// display roll delete form on GET

// handle roll delete on POST

// display roll update form on GET

// handle roll update on POST
