const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const asyncHandler = require("../middlewares/async");

// @desc      Create a order
// @route     POST /api/orders
// @access    Public

const createOrder = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    if (!user) {
      throw new CustomAPIError.BadRequestError("Provide correct credentials");
    }

    const order = await Order.create({
      user: req.userId,
      product: req.body.product,
      address: req.body.address,
    });
    res.status(StatusCodes.OK).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

// @desc      Get all orders
// @route     GET /api/orders
// @access    Public

const getAllOrder = async (req, res) => {
  res.send(" This is the get all order route");
};
// @desc      Get an order
// @route     GET /api/orders
// @access    Public

const getOrder = async (req, res) => {
  res.send(" This is the get order route");
};
// @desc     Update an order
// @route    PATCH /api/orders/:id
// @access    Public

const updateOrder = async (req, res) => {
  res.send(" This is the update order route");
};
// @desc      Delete a order
// @route     DELETE /api/orders
// @access    Public

const deleteOrder = async (req, res) => {
  res.send(" This is the delete order route");
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
