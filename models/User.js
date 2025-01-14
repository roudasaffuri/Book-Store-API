const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

// Password complexity options
const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2, // Minimum number of rules to meet
};

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" } // Add token expiration time
  );
};

// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().min(5).max(200),
    username: Joi.string().required().trim().min(2).max(200),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().min(5).max(200),
    password: Joi.string().required().trim().min(8),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(5).max(200),
    username: Joi.string().trim().min(2).max(200),
    password: passwordComplexity(complexityOptions), // Optional password validation
  });
  return schema.validate(obj);
}

// Validate Change Password
function validateChangePassword(obj) {
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateChangePassword,
};
