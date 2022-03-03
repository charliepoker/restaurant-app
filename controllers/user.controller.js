const User = require("../models/user");
const { BadRequestError, NotFoundError } = require("../errors");
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Get a user
const getUser = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findById({ _id: userId }).select("-password");
    if (!user) {
      throw new CustomAPIError.NotFoundError(`No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

// Get Users
const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ users });
};

const updateUser = async (req, res) => {
  res.send(" This is the update user route");
};
const deleteUser = async (req, res) => {
  res.send(" This is the delete user route");
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
