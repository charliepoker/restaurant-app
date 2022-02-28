const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, "secret", {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

module.exports = {
  createToken,
};
