require("dotenv").config();
const User = require("../models/user");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  // check header
  let token = req.headers["x-access-token"];

  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    console.log(decoded);
    next();
  });
};

module.exports = { authenticateUser };
