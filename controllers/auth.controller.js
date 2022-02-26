const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, phoneNumber } =
      req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    user = await User.create({ ...req.body });

    const token = createToken(user._id, user.email);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE === "production",
      signed: true,
    });

    res.status(200).json({
      message: "user successfully registered",
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "provide email and password" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(406).json({ message: "Incorrect password, Try again" });
    }

   

    const token = createToken(user._id, user.email);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE === "production",
      signed: true,
    });

    res.status(200).json({
      message: "User successfully logged in",
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
