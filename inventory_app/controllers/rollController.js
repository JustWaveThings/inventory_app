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
    brands,
    materials,
    diameters,
  });
});

// handle roll create on POST

exports.roll_create_post = [
  //validate and sanitize fields
  body("brand.*").escape(),
  body("material.*").escape(),
  body("diameter.*").escape(),
  body("weightInGrams", "Weight must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("color", "Color must be specified").trim().isLength({ min: 1 }).escape(),
  body("priceInCents", "Price must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantityOf", "Quantity must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("SKU", "SKU must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const roll = new Roll({
      brand: req.body.brand,
      material: req.body.material,
      diameter: req.body.diameter,
      weightInGrams: req.body.weightInGrams,
      color: req.body.color,
      priceInCents: req.body.priceInCents,
      quantityOf: req.body.quantityOf,
      SKU: req.body.SKU,
      description: req.body.description,
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
        roll,
        errors: errors.array(),
      });
      return;
    } else {
      await roll.save();
      res.redirect(roll.url);
    }
  }),
];

// display roll delete form on GET

exports.roll_delete_get = asyncHandler(async (req, res, next) => {
  const roll = await Roll.findById(req.params.id)
    .populate("material brand diameter")
    .exec();
  res.render("roll_delete", { title: "Delete Roll", item: roll });
  if (roll == null) {
    res.redirect("/catalog/rolls");
  }
  res.render("roll_delete", { title: "Delete Roll", item: roll });
});

// handle roll delete on POST

exports.roll_delete_post = asyncHandler(async (req, res, next) => {
  const roll = await Roll.findById(req.params.id)
    .populate("material brand diameter")
    .exec();

  if (roll == null) {
    res.redirect("/catalog/rolls");
    return;
  } else {
    await Roll.findByIdAndRemove(req.body.id);
    res.redirect("/catalog/rolls");
  }
});

// display roll update form on GET

exports.roll_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll update GET");
});

// handle roll update on POST

exports.roll_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: roll update POST");
});
