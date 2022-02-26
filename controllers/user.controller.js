const User = require("../models/user");

const getUser = async (req, res) => {
  res.send(" This is the  get user route");
};
const getUsers = async (req, res) => {
  res.send(" This is the get users route");
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
