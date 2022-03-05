const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/auth");

router.route("/").post(authenticateUser, createReview).get(getAllReview);
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
