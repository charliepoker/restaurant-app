const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.route("/").get(getUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
