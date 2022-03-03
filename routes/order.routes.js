const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/auth");

router.route("/").post(authenticateUser, createOrder).get(getAllOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
