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
    brand_count: numBrands,
    material_count: numMaterials,
    roll_count: numRolls,
    diameter_count: numDiameters,
  });
});
// display list of all rolls

exports.roll_list = asyncHandler(async (req, res, next) => {
  const rolls = await Roll.find({}).populate("material brand diameter").exec();

  res.render("roll_list", {
    title: "All filament rolls",
    items: rolls,
  });
});

// display detail page for a specific roll

exports.roll_detail = asyncHandler(async (req, res, next) => {
  const roll = await Roll.findById(req.params.id)
    .populate("material brand diameter")
    .exec();
  res.render("roll_detail", { title: "Roll Detail", item: roll });
});
// display roll create form on GET

exports.roll_create_get = asyncHandler(async (req, res, next) => {
  const [brands, materials, diameters] = await Promise.all([
    Brand.find({}).exec(),
    Material.find({}).exec(),
    Diameter.find({}).exec(),
  ]);
  res.render("roll_form", {
    title: "Create Roll",
    brands: brands,
    materials: materials,
    diameters: diameters,
  });
});

// handle roll create on POST

exports.roll_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Roll create POST");
});

/* exports.roll_create_post = [
  // handle iterating through brand, material and diameter arrays
  (req, res, next) => {
    if (!(req.body.brand instanceof Array)) {
      if (typeof req.body.brand === "undefined") req.body.brand = [];
      else req.body.brand = new Array(req.body.brand);
    }
    if (!(req.body.material instanceof Array)) {
      if (typeof req.body.material === "undefined") req.body.material = [];
      else req.body.material = new Array(req.body.material);
    }
    if (!(req.body.diameter instanceof Array)) {
      if (typeof req.body.diameter === "undefined") req.body.diameter = [];
      else req.body.diameter = new Array(req.body.diameter);
    }
  },

  // validate and sanitize fields
  body("brand.*").escape(),
  body("material.*").escape(),
  body("diameter.*").escape(),
  body("weight", "Weight must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("color", "Color must be specified").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must be specified").trim().isLength({ min: 1 }).escape(),
  body("quantity", "Quantity must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("SKU", "SKU must be specified").trim().isLength({ min: 1 }).escape(),
  body("Description", "Description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const roll = new Roll({
      brand: req.body.brand,
      material: req.body.material,
      diameter: req.body.diameter,
      weight: req.body.weight,
      color: req.body.color,
      price: req.body.price,
      quantity: req.body.quantity,
      SKU: req.body.SKU,
      Description: req.body.Description,
    });

    if (!errors.isEmpty()) {
      const [brands, materials, diameters] = await Promise.all([
        Brand.find({}).exec(),
        Material.find({}).exec(),
        Diameter.find({}).exec(),
      ]);
      res.render("roll_form", {
        title: "Create Roll",
        brands,
        materials,
        diameters,
        roll: roll,
        errors: errors.array(),
      });
    } else {
      console.log("roll: " + roll._id);
      await roll.save();
    }
  }),
];
 */
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
