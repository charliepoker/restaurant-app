const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "PENDING", //PENDING, CANCELED, PROCESSING, SHIPPED, COMPLETE
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
