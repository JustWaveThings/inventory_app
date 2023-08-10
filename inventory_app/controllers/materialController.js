const Material = require("../models/material");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// display list of all materials

exports.material_list = asyncHandler(async (req, res, next) => {
  const material_list = await Material.find();
  res.render("material_list", {
    title: "Material List",
    items: material_list,
  });
});

// display detail page for a specific material

exports.material_detail = asyncHandler(async (req, res, next) => {
  const material = await Material.findById(req.params.id);
  res.render("material_detail", { title: "Material Detail", item: material });
});

// display material create form on GET

exports.material_create_get = asyncHandler(async (req, res, next) => {
  res.render("material_form", { title: "Create Material" });
});

// handle material create on POST

exports.material_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material create POST");
});

// display material delete form on GET

exports.material_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material delete GET");
});

// handle material delete on POST

exports.material_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material delete POST");
});

// display material update form on GET

exports.material_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material update GET");
});

// handle material update on POST

exports.material_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material update POST");
});
