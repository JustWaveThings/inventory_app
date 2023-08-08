const Material = require("../models/material");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// display list of all materials

exports.material_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: all materials GET");
});

// display detail page for a specific material

exports.material_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material detail GET: " + req.params.id);
});

// display material create form on GET

exports.material_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material create GET");
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
