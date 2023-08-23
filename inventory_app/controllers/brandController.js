const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Roll = require("../models/roll");

// display list of all brands

exports.brand_list = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({}).exec();
  console.log(brands);
  res.render("brand_list", {
    title: "All Brands",
    items: brands,
  });
});

// display detail page for a specific brand

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  res.render("brand_detail", { title: "Brand Detail", item: brand });
});

// display brand create form on GET

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
});

// handle brand create on POST

exports.brand_create_post = [
  // validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand description must be specified."),
  body("websiteUrl")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand website URL must be specified."),
  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        brand: req.body,
        errors: errors.array(),
      });
    } else {
      const brandExists = await Brand.findOne({ name: req.body.name });
      if (brandExists) {
        res.redirect(brandExists.url);
      } else {
        await brand.save();
        res.redirect(brand.url);
      }
    }
  }),
];

// display brand delete form on GET

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const [brand, rollsWithBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Roll.find({ brand: req.params.id })
      .populate("material brand diameter")
      .exec(),
  ]);
  if (brand == null) {
    res.redirect("/catalog/brands");
  }
  res.render("brand_delete", {
    title: "Delete Brand",
    item: brand,
    rolls: rollsWithBrand,
  });
});

// handle brand delete on POST

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const [brand, rollsWithBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Roll.find({ brand: req.params.id })
      .populate("material brand diameter")
      .exec(),
  ]);
  if (rollsWithBrand.length > 0) {
    res.render("brand_delete", {
      title: "Delete Brand",
      item: brand,
      rolls: rollsWithBrand,
    });
    return;
  } else {
    await Brand.findByIdAndRemove(req.body.brand);
    res.redirect("/catalog/brands");
  }
});

// display brand update form on GET

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const [brand, rollsWithBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Roll.find({ brand: req.params.id })
      .populate("material brand diameter")
      .exec(),
  ]);
  if (brand == null) {
    res.redirect("/catalog/brands");
  }
  res.render("brand_form", {
    title: "Update Brand",
    item: brand,
    rolls: rollsWithBrand,
  });
});

// handle brand update on POST

exports.brand_update_post = [
  //validate and sanitize fields
  body("name", "Brand name must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand description must be specified."),
  body("websiteUrl")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand website URL must be specified."),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Update Brand",
        item: brand,
        errors: errors.array(),
      });
      return;
    } else {
      await Brand.findByIdAndUpdate(req.params.id, brand);
      res.redirect(brand.url);
    }
  }),
];
