const jwt = require("jsonwebtoken");

const createToken = ({ id, email }) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyToken = (token) => {
  jwt.verify(token, process.env.JWT_SECRETs);
};

module.exports = {
  createToken,
  verifyToken,
};
