const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide firstName"],
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: [true, "Please provide lastName"],
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      //   select: false,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide phone number"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  // hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



// create an instance to compare password
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
