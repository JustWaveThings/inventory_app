const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// display list of all brands

exports.brand_list = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({}).exec();
  console.log(brands);
  res.render("brand_list", {
    title: "All Brands",
    store_title: "Filament Online - Ready GetSet Extrude!",
    items: brands,
  });
});

// display detail page for a specific brand

exports.brand_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand detail GET: " + req.params.id);
});

// display brand create form on GET

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand create GET");
});

// handle brand create on POST

exports.brand_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand create POST");
});

// display brand delete form on GET

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand delete GET");
});

// handle brand delete on POST

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand delete POST");
});

// display brand update form on GET

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand update GET");
});

// handle brand update on POST

exports.brand_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: brand update POST");
});
