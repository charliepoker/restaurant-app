require("dotenv").config();
const User = require("../models/user");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  // check header
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.user = decoded.id;

    next();
  });
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
