const Material = require("../models/material");
const Roll = require("../models/roll");
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
  res.render("material_form", { title: "Create Material", item: null });
});

// handle material create on POST

exports.material_create_post = [
  //validate and sanitize fields
  body("name", "Material name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Material description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const material = new Material({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("material_form", {
        title: "Create Material",
        material,
        errors: errors.array(),
      });
      return;
    } else {
      const existing_material = await Material.findOne({
        name: req.body.name,
      });

      if (existing_material) {
        res.send("Material already exists, update the material instead");
      } else {
        await material.save(material);
        res.redirect(material.url);
      }
    }
  }),
];

// display material delete form on GET

exports.material_delete_get = asyncHandler(async (req, res, next) => {
  const [material, rollsUsingMaterial] = await Promise.all([
    Material.findById(req.params.id),
    Roll.find({ material: req.params.id })
      .populate("material brand diameter")
      .exec(),
  ]);
  if (material == null) {
    res.redirect("/catalog/materials");
  }
  res.render("material_delete", {
    title: "Delete Material",
    item: material,
    rolls: rollsUsingMaterial,
  });
});

// handle material delete on POST

exports.material_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: material delete POST");
});

// display material update form on GET

exports.material_update_get = asyncHandler(async (req, res, next) => {
  const [material, rollsUsingMaterial] = await Promise.all([
    Material.findById(req.params.id),
    Roll.find({ material: req.params.id })
      .populate("material brand diameter")
      .exec(),
  ]);
  if (material == null) {
    res.redirect("/catalog/materials");
  }
  res.render("material_form", {
    title: "Update Material",
    item: material,
    roll: rollsUsingMaterial,
  });
});

// handle material update on POST

exports.material_update_post = [
  //validate and sanitize fields
  body("name", "Material name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Material description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const material = new Material({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("material_form", {
        title: "Update Material",
        material,
        errors: errors.array(),
      });
      return;
    } else {
      const existing_material = await Material.findOne({
        name: req.body.name,
      });

      if (existing_material) {
      } else {
        await Material.findByIdAndUpdate(req.params.id, material);
        res.redirect(material.url);
      }
    }
  }),
];
