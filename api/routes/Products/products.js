const express = require("express");
const router = express.Router();
const {
  importCSV,
  getProducts,
  updateProduct,
  aggregateProducts,
  getProduct,
} = require("../../controllers/product-ctrl");

router.get("/import", importCSV);

router.get("/fetchdata", getProducts);

router.get("/aggregate", aggregateProducts);

router.get("/:id", getProduct);

router.put("/:query/update", updateProduct);

module.exports = router;
