const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { createToken } = require("../utils/jwt");
const CustomAPIError = require("../errors");


const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, phoneNumber } =
      req.body;

    // check if email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomAPIError.BadRequestError("Email already exists");
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
      phoneNumber,
      role,
    });

    const token = createToken(user._id, user.email, user.role);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE === "production",
      signed: true,
    });

    res.status(StatusCodes.CREATED).json({
      message: "user successfully registered",
      user: {
        userId: user._id,
        email: user.email,
        role: user.role,
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
      // return res.status(404).json({ message: "User not found" });
      throw new CustomAPIError.UnauthenticatedError("Invalid Credentials");
    }

    isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // return res.status(406).json({ message: "Incorrect password, Try again" });
      throw new CustomAPIError.UnauthenticatedError("Invalid Credentials");
    }

    const token = creatvToken(user._id, user.email);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE === "production",
      signed: true,
    });

    res.status(StatusCodes.OK).json({
      message: "User successfully logged in",
      token,
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
