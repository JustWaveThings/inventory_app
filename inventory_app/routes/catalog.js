const express = require("express");
const router = express.Router();

// require controller modules

const brand_controller = require("../controllers/brandController");
const diameter_controller = require("../controllers/diameterController");
const material_controller = require("../controllers/materialController");
const roll_controller = require("../controllers/rollController");

// Roll Routes
// GET request for creating a roll. must come before routes that display roll (uses id)

router.get("/roll/create", roll_controller.roll_create_get);

/* GET catalog home page. */
router.get("/", roll_controller.index);

// GET request for list of all rolls  - done

router.get("/rolls", roll_controller.roll_list);

// POST request for creating roll

router.post("/roll/create", roll_controller.roll_create_post);

// GET request to delete roll

router.get("/roll/:id/delete", roll_controller.roll_delete_get);

// POST request to delete roll

router.post("/roll/:id/delete", roll_controller.roll_delete_post);

// GET request to update roll

router.get("/roll/:id/update", roll_controller.roll_update_get);

// POST request to update roll

router.post("/roll/:id/update", roll_controller.roll_update_post);

// GET request for one roll - roll detail - done

router.get("/roll/:id", roll_controller.roll_detail);

// Brand Routes

// GET request for creating a brand. must come before routes that display brand (uses id)

router.get("/brand/create", brand_controller.brand_create_get);

// get request for list of all brands

router.get("/brands", brand_controller.brand_list);

// POST request for creating brand

router.post("/brand/create", brand_controller.brand_create_post);

// GET request for one brand

router.get("/brand/:id", brand_controller.brand_detail);

// GET request to delete brand

router.get("/brand/:id/delete", brand_controller.brand_delete_get);

// POST request to delete brand

router.post("/brand/:id/delete", brand_controller.brand_delete_post);

// GET request to update brand

router.get("/brand/:id/update", brand_controller.brand_update_get);

// post request to update brand

router.post("/brand/:id/update", brand_controller.brand_update_post);

// Diameter Routes
// GET request for creating a diameter. must come before routes that display diameter (uses id)

router.get("/diameter/create", diameter_controller.diameter_create_get);

// POST request for creating diameter

router.post("/diameter/create", diameter_controller.diameter_create_post);

// GET request to delete diameter

router.get("/diameter/:id/delete", diameter_controller.diameter_delete_get);

// POST request to delete diameter

router.post("/diameter/:id/delete", diameter_controller.diameter_delete_post);

// GET request to update diameter

router.get("/diameter/:id/update", diameter_controller.diameter_update_get);

// POST request to update diameter

router.post("/diameter/:id/update", diameter_controller.diameter_update_post);

// GET request for one diameter

router.get("/diameter/:id", diameter_controller.diameter_detail);

// GET request for list of all diameters

router.get("/diameters", diameter_controller.diameter_list);

// Material Routes
// GET request for creating a material. must come before routes that display material (uses id)

router.get("/material/create", material_controller.material_create_get);

// POST request for creating material

router.post("/material/create", material_controller.material_create_post);

// GET request to delete material

router.get("/material/:id/delete", material_controller.material_delete_get);

// POST request to delete material

router.post("/material/:id/delete", material_controller.material_delete_post);

// GET request to update material

router.get("/material/:id/update", material_controller.material_update_get);

// POST request to update material

router.post("/material/:id/update", material_controller.material_update_post);

// GET request for one material

router.get("/material/:id", material_controller.material_detail);

// GET request for list of all materials

router.get("/materials", material_controller.material_list);

module.exports = router;
