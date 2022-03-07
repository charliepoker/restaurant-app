const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  createToken,
};
