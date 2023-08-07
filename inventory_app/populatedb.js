#! /usr/bin/env node
require("dotenv").config();

console.log(
  'This script populates some info in to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Roll = require("./models/roll");
const Brand = require("./models/brand");
const Material = require("./models/material");
const Diameter = require("./models/diameter");

const roll = [];
const brand = [];
const material = [];
const diameter = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dmc0his.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await  createRolls()
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

// create functions

async function diameterCreate(index, size) {
  const diameter = new Diameter({ size });
  await diameter.save();
  diameter[index] = diameter;
  console.log(`Added diameter: ${size}`);
}

async function brandCreate(index, name, description, websiteUrl) {
    const brand = new Brand({ name, description, websiteUrl });
    await brand.save();
    brand[index] = brand;
    console.log(`Added brand: ${name}`);
}

async function rollCreate({index, material, diameter, brand, priceInCents, quantityOf, description, SKU, color, weightInGrams}) {

    const roll = new Roll({material, diameter, brand, priceInCents, quantityOf, description, SKU, color, weightInGrams});

    await roll.save();
   
}

async function materialCreate( {name, description}) {
    const material = new Material({ name, description })
    await material.save();
}

// populate functions

async function createDiameters() {
  console.log("Adding diameters");
  await Promise.all([
    diameterCreate(0, 1.75),
    diameterCreate(1, 3),
  ]);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Hatchbox", "Hatchbox offers a wide range of high-quality filaments suitable for both beginners and experienced 3D printing enthusiasts. Their reliable and consistent filament options make them a popular choice in the 3D printing community.", "https://www.hatchbox3d.com/"),
    brandCreate(1, "eSun", "eSun is known for producing cost-effective and reliable 3D printing filaments. With a focus on quality and affordability, eSun's filaments are well-regarded for delivering consistent results across various printing projects.", "https://www.esun3d.net/"),
    brandCreate(2, "SainSmart", "SainSmart provides a diverse range of filaments catering to different creative needs. Their filaments are known for their vibrant colors and ease of use, making them a popular choice for both hobbyists and professionals.", "https://www.sainsmart.com/"),
    brandCreate(3, "Overture", "Overture offers a comprehensive selection of filaments that are designed to deliver reliable and high-quality prints. Their commitment to customer satisfaction and product innovation has earned them a solid reputation in the 3D printing community.", "https://www.overture3d.com/"),
    brandCreate(4, "Proto-Pasta", "Proto-Pasta is renowned for its dedication to pushing the boundaries of filament technology. With a focus on unique formulations like carbon fiber and metal-infused filaments, Proto-Pasta appeals to makers seeking exceptional and distinctive prints.", "https://www.proto-pasta.com/"),
    brandCreate(5, "MatterHackers", "MatterHackers is a trusted brand that offers a wide array of filaments, tools, and resources for 3D printing enthusiasts. Their commitment to education and support makes them a valuable resource for both beginners and experts.", "https://www.matterhackers.com/"),
    brandCreate(6, "ColorFabb", "ColorFabb is a premium brand known for its high-quality filaments, including standard PLA and exotic wood and metal composites. Their meticulous attention to quality control ensures that every print meets the highest standards of performance and aesthetics.", "https://colorfabb.com/")
    ]);
}


// helper arrays for createRolls

const brandNames = [
    "Hatchbox",
    "eSun",
    "SainSmart",
    "Overture",
    "Proto-Pasta",
    "MatterHackers",
    "ColorFabb"
    ];

const filament_types = [
    "PLA (Polylactic Acid)",
    "ABS (Acrylonitrile Butadiene Styrene)",
    "PETG (Polyethylene Terephthalate Glycol-Modified)",
    "TPU (Thermoplastic Polyurethane)",
    "Nylon (Polyamide)",
    "HIPS (High Impact Polystyrene)",
    "PVA (Polyvinyl Alcohol)",
    "PC (Polycarbonate)",
    "ASA (Acrylonitrile Styrene Acrylate)",
    "PP (Polypropylene)",
    "Wood-Infused Filament",
    "Metal-Infused Filament",
    "Carbon Fiber-Infused Filament",
    "Flexible Filament (e.g., TPE)",
    "Conductive Filament",
    ];


const pricesInCents = [
    1021,
    1150,
    1356,
    1432,
    1725,
    1899,
    2134,
    2305,
    2550,
    2799,
    2950,
    3125,
    3310,
    3550,
    3999
];

const diameterSizes = [1.75, 3];

const qtyValues = [11, 59, 218, 107, 0, 314, 44, 280, 286, 131, 0, 193, 112, 219, 138, 132, 0, 39, 295, 247, 101, 10, 314, 1, 86, 61, 107, 0, 111, 207, 316, 359, 87, 65, 110, 241, 117, 134, 0, 121, 178, 236, 152, 16, 298, 50, 205, 231, 9, 215];

const skuValues = [
  "sku-7642",
  "sku-7192",
  "sku-4214",
  "sku-0526",
  "sku-4494",
  "sku-6541",
  "sku-5521",
  "sku-9725",
  "sku-8549",
  "sku-8830",
  "sku-1302",
  "sku-3512",
  "sku-3004",
  "sku-2139",
  "sku-1641",
  "sku-9383",
  "sku-4548",
  "sku-8670",
  "sku-3199",
  "sku-9681",
  "sku-2100",
  "sku-8094",
  "sku-8412",
  "sku-9411",
  "sku-3925",
  "sku-8116",
  "sku-1277",
  "sku-6508",
  "sku-7504",
  "sku-2148",
  "sku-9973",
  "sku-2610",
  "sku-9905",
  "sku-0175",
  "sku-7050",
  "sku-9226",
  "sku-5481",
  "sku-0706",
  "sku-2028",
  "sku-7180",
  "sku-9486",
  "sku-5738",
  "sku-5194",
  "sku-7604",
  "sku-4982",
  "sku-8195",
  "sku-0278",
  "sku-8770",
  "sku-1894",
  "sku-3651",
  "sku-7753",
  "sku-5534",
  "sku-4479",
  "sku-2267",
  "sku-0121",
  "sku-3992",
  "sku-1441",
  "sku-2404",
  "sku-8560",
  "sku-9002",
  "sku-1783",
  "sku-8838",
  "sku-4923",
  "sku-9859",
  "sku-3837",
  "sku-7743",
  "sku-2513",
  "sku-7402",
  "sku-4123",
  "sku-9403",
  "sku-7988",
  "sku-2806",
  "sku-2214",
  "sku-6967",
  "sku-8038",
  "sku-1848",
  "sku-5151",
  "sku-4058",
  "sku-7973",
  "sku-2397",
  "sku-5796",
  "sku-5907",
  "sku-5542",
  "sku-3878",
  "sku-6651",
  "sku-4365",
  "sku-4178",
  "sku-1419",
  "sku-6044",
  "sku-4900",
  "sku-7056",
  "sku-2810",
  "sku-4475",
  "sku-0170",
  "sku-8533",
  "sku-3075",
  "sku-6690",
  "sku-0434",
  "sku-2760",
  "sku-8384",
  "sku-5104",
  "sku-0092",
  "sku-1674",
  "sku-6910",
  "sku-3873",
  "sku-8359",
  "sku-2054",
  "sku-7038",
  "sku-8331",
  "sku-9923",
  "sku-6347",
  "sku-7935",
  "sku-5473",
  "sku-4173",
  "sku-5862",
  "sku-0340",
  "sku-7571",
  "sku-5229",
  "sku-4369",
  "sku-1215",
  "sku-6166",
  "sku-1563",
  "sku-2885",
  "sku-7858",
  "sku-0081",
  "sku-0537",
  "sku-9049",
  "sku-0943",
  "sku-3070",
  "sku-5818",
  "sku-8816",
  "sku-6271",
  "sku-1258",
  "sku-0189",
  "sku-8552",
  "sku-0134",
  "sku-0283",
  "sku-7822",
  "sku-9445",
  "sku-0786",
  "sku-4738",
  "sku-2425",
  "sku-3551",
  "sku-7782",
  "sku-3601",
  "sku-3509",
  "sku-3753",
  "sku-7039",
  "sku-1251",
  "sku-9538",
  "sku-4964",
  "sku-7010",
  "sku-2025",
  "sku-9740",
  "sku-9389",
  "sku-7690",
  "sku-0392",
  "sku-9285",
  "sku-8072",
  "sku-9720",
  "sku-4727",
  "sku-5163",
  "sku-0349",
  "sku-4794",
  "sku-3166",
  "sku-9349",
  "sku-8534",
  "sku-6976",
  "sku-0140",
  "sku-6339",
  "sku-5997",
  "sku-7720",
  "sku-4205",
  "sku-6388",
  "sku-4419",
  "sku-0330",
  "sku-8807",
  "sku-4134",
  "sku-8679",
  "sku-9926",
  "sku-0107",
  "sku-9293",
  "sku-1695",
  "sku-7208",
  "sku-1620",
  "sku-2195",
  "sku-3103",
  "sku-7545",
  "sku-4759",
  "sku-3038",
  "sku-7195",
  "sku-4818",
  "sku-4928",
  "sku-9664",
  "sku-1729",
  "sku-3504",
  "sku-8970",
  "sku-9157",
  "sku-8909",
  "sku-7253",
  "sku-5313",
  "sku-0314",
  "sku-4096",
  "sku-8274",
  "sku-5758",
  "sku-9841",
  "sku-7992",
  "sku-0648",
  "sku-6209",
  "sku-4086",
  "sku-4001",
  "sku-1925",
  "sku-0183",
  "sku-6521",
  "sku-5589",
  "sku-9519",
  "sku-9198",
  "sku-2489",
  "sku-4235",
  "sku-4155",
  "sku-7132",
  "sku-4017",
  "sku-0565",
  "sku-9921",
  "sku-6823",
  "sku-5114",
  "sku-3446",
  "sku-9073",
  "sku-5462",
  "sku-0712",
  "sku-0209",
  "sku-2223",
  "sku-9020",
  "sku-0887",
  "sku-2741",
  "sku-4125",
  "sku-7587",
  "sku-3129",
  "sku-0503",
  "sku-7834",
  "sku-7954",
  "sku-5522",
  "sku-6180",
  "sku-1981",
  "sku-0896",
  "sku-0647",
  "sku-4091",
  "sku-6007",
  "sku-0033",
  "sku-2244",
  "sku-7286",
  "sku-1234",
  "sku-9893",
  "sku-9766",
  "sku-3714",
  "sku-7861",
  "sku-1955",
  "sku-5302",
  "sku-9106",
  "sku-6903",
  "sku-0894",
  "sku-9757",
  "sku-8878",
  "sku-5271",
  "sku-1545",
  "sku-4983",
  "sku-4007",
  "sku-1851",
  "sku-0046",
  "sku-0422",
  "sku-9339",
  "sku-6088",
  "sku-2586",
  "sku-8028",
  "sku-2803",
  "sku-4171",
  "sku-8131",
  "sku-9512",
  "sku-6772",
  "sku-8644",
  "sku-5256",
  "sku-1160",
  "sku-8936",
  "sku-3931",
  "sku-3796",
  "sku-3713",
  "sku-3134",
  "sku-6984",
  "sku-4909",
  "sku-6091",
  "sku-8089",
  "sku-1359",
  "sku-2915",
  "sku-3426",
  "sku-0818",
  "sku-3630",
  "sku-8556",
  "sku-4957",
  "sku-5470",
  "sku-2259"
]


const topColorsForFilament = [
    "Black",
    "White",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Translucent"
];

RollWeightInGrams = [500, 1000]

async function createRolls() {
    for (let i = 0; i < 300; i++) {
        console.log(`roll ${i} created`)
        const randomMaterial = await Material.findOne();
        const randomDiameter = await Diameter.findOne();
        const randomBrand = await Brand.findOne();

        await rollCreate({
            color: topColorsForFilament[Math.floor(Math.random() * topColorsForFilament.length)],
            material: randomMaterial._id,
            price: pricesInCents[Math.floor(Math.random() * pricesInCents.length)],
            diameter: randomDiameter._id,
            quantityOf: qtyValues[Math.floor(Math.random() * qtyValues.length)],
            SKU: skuValues[i],
            weightInGrams: RollWeightInGrams[Math.floor(Math.random() * RollWeightInGrams.length)],
            brand: randomBrand._id,
            priceInCents: pricesInCents[Math.floor(Math.random() * pricesInCents.length)],
            description: "Placeholder for roll description",
        });
    }
}


const filamentDescriptions = [
    "PLA (Polylactic Acid) is a popular choice due to its ease of use, low warping, and biodegradability.",
    "ABS (Acrylonitrile Butadiene Styrene) is known for its durability, heat resistance, and post-print processing versatility.",
    "PETG (Polyethylene Terephthalate Glycol-Modified) offers a balance of strength, flexibility, and impact resistance.",
    "TPU (Thermoplastic Polyurethane) is highly flexible and elastic, making it suitable for producing flexible and stretchable parts.",
    "Nylon (Polyamide) is known for its strength, durability, and resistance to wear, making it ideal for functional parts.",
    "HIPS (High Impact Polystyrene) is often used as a support material due to its ability to dissolve in limonene.",
    "PVA (Polyvinyl Alcohol) is a water-soluble material used for supports in dual-extrusion prints and complex geometries.",
    "PC (Polycarbonate) offers excellent strength, heat resistance, and optical clarity, making it suitable for engineering applications.",
    "ASA (Acrylonitrile Styrene Acrylate) combines the benefits of ABS with weather resistance, making it suitable for outdoor use.",
    "PP (Polypropylene) is known for its chemical resistance, low density, and flexibility, making it suitable for living hinges and containers.",
    "Wood-Infused Filament adds a natural wood-like appearance and texture to printed objects.",
    "Metal-Infused Filament contains metal particles for a metallic finish and weight in printed objects.",
    "Carbon Fiber-Infused Filament adds strength and stiffness to printed parts, making them suitable for high-performance applications.",
    "Flexible Filament (e.g., TPE) produces rubber-like parts with elasticity and flexibility, ideal for gaskets and soft components.",
    "Conductive Filament contains conductive materials, allowing for printed objects with electrical conductivity or EMI shielding."
];

async function createMaterials() {
    console.log("Adding materials");
    for (let i = 0; i < filament_types.length; i++) {
      await materialCreate({
        name: filament_types[i],
        description: filamentDescriptions[i],
      });
    }
}