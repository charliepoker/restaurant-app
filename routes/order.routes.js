const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getOrder,
} = require("../controllers/order.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/auth");

router.route("/").post(authenticateUser, createOrder).get(getAllOrder);
router.route("/:id").get(getOrder);

module.exports = router;
