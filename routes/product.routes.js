const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middlewares/auth")

const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.route("/").post(authenticateUser,createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);


  
module.exports = router;
