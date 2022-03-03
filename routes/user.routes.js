const express = require("express");
const router = express.Router();

const { getUser, getUsers } = require("../controllers/user.controller");

router.route("/").get(getUsers);
router.route("/:id").get(getUser);

module.exports = router;
