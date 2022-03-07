const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { createToken } = require("../utils/jwt");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

// @desc      Register user
// @route     POST /api/users/register
// @access    Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password, phoneNumber } = req.body;

  // check if all fields are typed
  if (!firstname || !lastname || !email || !password || !phoneNumber) {
    return next(
      new ErrorResponse(
        "Please provide all required fields",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new ErrorResponse("Email already exists", StatusCodes.BAD_REQUEST);
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  user = await User.create({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    role,
  });

  const token = createToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // secure: process.env.NODE === "production",
    // signed: true,
  });

  res.status(StatusCodes.CREATED).json({
    message: "user successfully registered",
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc      Login user
// @route     POST /api/users/login
// @access    Public

const loginUser = asyncHandler(async (req, res, next) => {
  // try {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse(
        "Please provide email and password",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return next(new ErrorResponse("User not found", StatusCodes.NOT_FOUND));
  }

  isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(
      new ErrorResponse("Invalid Credentials", StatusCodes.UNAUTHORIZED)
    );
  }

  const token = createToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE === "production",
    signed: true,
  });

  res.status(StatusCodes.OK).json({
    message: "User successfully logged in",
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
