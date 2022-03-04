const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

// @desc      Create a Product
// @route     POST /api/products
// @access    Public
const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price } = req.body;
  if (!title || !description) {
    return next(
      new ErrorResponse("provide required feilds", StatusCodes.BAD_REQUEST)
    );
  }
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
});

// @desc      Get a Product
// @route     GET /api/products/:id
// @access    Public
const getProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;

  const product = await Product.findById({ _id: productId });
  if (!product) {
    return next(new ErrorResponse());
  }
  res.status(StatusCodes.OK).json({ message: "success", product });
});

// @desc      Get all Products
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ message: "success", products });
});

// @desc      Update a Product
// @route     PATCH /api/products/:id
// @access    Public
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new ErrorResponse());
  }
  res.status(StatusCodes.OK).json({ message: "success", product });
});

// @desc      Delete a Product
// @route     DELETE /api/products/:id
// @access    Public

const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return next(new ErrorResponse());
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ message: "Success! Product removed" });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
