const Product = require("../models/product");
const Order = require("../models/order");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const asyncHandler = require("../middlewares/async");

// @desc      Create a order
// @route     POST /api/orders
// @access    Public

const createOrder = asyncHandler(async (req, res, next) => {
  const productId = req.body.product;

  const isValidProduct = await Product.findById({ _id: productId });
  if (!isValidProduct) {
    throw new CustomAPIError.NotFoundError(`No Review with id ${productId}`);
  }
  req.body.user = req.user;
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
});

// @desc      Get all orders
// @route     GET /api/orders
// @access    Public

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
});
// @desc      Get an order
// @route     GET /api/orders
// @access    Public

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.find({ _id: orderId });
  if (!order) {
    throw new CustomAPIError.NotFoundError("Review not foud");
  }
  res.status(StatusCodes.OK).json({ order });
};


module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
};
