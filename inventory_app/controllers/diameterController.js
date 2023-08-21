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
  const diameter = await Diameter.findById(req.params.id);
  res.render("diameter_detail", { title: "Diameter Detail", item: diameter });
});

// display diameter create form on GET

exports.diameter_create_get = asyncHandler(async (req, res, next) => {
  res.render("diameter_form", { title: "Create Diameter" });
});

// handle diameter create on POST

exports.diameter_create_post = [
  // validate and sanitize the name field
  body("size", "Diameter size required").trim().isLength({ min: 1 }).escape(),
  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const diameter = new Diameter({ size: req.body.size });
    if (!errors.isEmpty()) {
      const diameter = await Diameter.find({}).exec();
      res.render("diameter_form", {
        title: "Create Diameter",
        diameter,
        errors: errors.array(),
      });
      return;
    } else {
      await diameter.save();
      res.redirect(diameter.url);
    }
  }),
];

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
