require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Invalid Bearer token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, email: payload.email };
    console.log(req.user);
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Authentication Invalid", error: error.message });
  }
};

module.exports = {
  authenticateUser,
};
