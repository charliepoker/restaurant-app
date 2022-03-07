const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
    algorithm: "HS256",
  });
  return token;
};

module.exports = {
  createToken,
};
