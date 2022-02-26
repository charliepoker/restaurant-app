const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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

module.exports = mongoose.model("Order", schema);
