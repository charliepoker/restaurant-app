const Product = require("../models/product");

// Create a product
const createProduct = async (req, res) => {
  res.send(" This is the create product route");
};
// Get a product
const getProduct = async (req, res) => {
  res.send(" This is the get product route");
};
// Get all products
const getProducts = async (req, res) => {
  res.send(" This is the get all products route");
};
// update a product
const updateProduct = async (req, res) => {
  res.send(" This is the update a product route");
};
// Delete a product
const deleteProduct = async (req, res) => {
  res.send(" This is the delete a product route");
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
