const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// Get a user
const getUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findById({ _id: userId }).select("-password");
  if (!user) {
    return next(new ErrorResponse());
  }
  res.status(StatusCodes.OK).json({ user });
});

// Get Users
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ users });
});
module.exports = {
  getUser,
  getUsers,
};
