const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const asyncHandler = require("../middlewares/async");

// @desc      Create a Product
// @route     POST /api/products
// @access    Public
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
});

// @desc      Get a Product
// @route     GET /api/products/:id
// @access    Public
const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    res.status(StatusCodes.OK).json({ message: "success", product });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// @desc      Get all Products
// @route     GET /api/products
// @access    Public
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ message: "success", products });
};

// @desc      Update a Product
// @route     PATCH /api/products/:id
// @access    Public
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    res.status(StatusCodes.OK).json({ message: "success", product });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// @desc      Delete a Product
// @route     DELETE /api/products/:id
// @access    Public

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ message: "Success! Product removed" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
