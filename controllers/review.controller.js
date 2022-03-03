const Product = require("../models/product");
const Review = require("../models/review");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const asyncHandler = require("../middlewares/async");

// @desc      Create a review
// @route     POST /api/reviews
// @access    Public

const createReview = asyncHandler(async (req, res, next) => {
  const productId = req.body.product;

  const isValidProduct = await Product.findById({ _id: productId });
  if (!isValidProduct) {
    throw new CustomAPIError.NotFoundError(`No Review with id ${productId}`);
  }
  req.body.user = req.user;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
  // res.status(500).json({ error: error });
});

// @desc      Get all reviews
// @route     GET /api/reviews
// @access    Public

const getAllReview = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews });
});
// @desc      Get a review
// @route     GET /api/reviews
// @access    Public

const getReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById({ _id: reviewId });

  if (!review) {
    throw new CustomAPIError.NotFoundError("Review not foud");
  }

  res.status(StatusCodes.OK).json({ review });
});
// @desc     Update a review
// @route    PATCH /api/reviews/:id
// @access    Public

const updateReview = asyncHandler(async (req, res) => {
  const { id: reviewId } = req.params;
  const { comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
});
// @desc      Delete a review
// @route     DELETE /api/reviews
// @access    Public

const deleteReview = asyncHandler(async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }

  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
});

module.exports = {
  createReview,
  getAllReview,
  getReview,
  updateReview,
  deleteReview,
};
