const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    minlength: 11,
    maxlength: 11,
    required: true,
    unique: true,
  },
  entries: {
    type: Number,
    min: 0,
    default: 1,
  },
});

const User = mongoose.model("User", userSchema);

const validateSignupReqBody = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(25).required().messages({
      "string.base": "First name should be text",
      "string.empty": "First name must be 2+ characters long",
      "string.min": "First name must be 2+ characters long",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().trim().min(2).max(25).required().messages({
      "string.base": "Last name should be text",
      "string.empty": "Last name must be 2+ characters long",
      "string.min": "Last name must be 2+ characters long",
      "any.required": "Last name is required",
    }),
    email: Joi.string()
      .trim()
      .min(5)
      .max(250)
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.min": "Email should be 5+ characters long",
        "string.max": "Email shouldn't be more than 250 characters",
        "string.email": "A valid email is required",
        "any.required": "Email is required",
      }),
    phone: Joi.string()
      .trim()
      .min(11)
      .max(11)
      .pattern(new RegExp("^[0-9]*$"))
      .required()
      .messages({
        "string.min": "Phone number should be 11 digits",
        "string.max": "Phone number should be 11 digits",
        "string.pattern.base": "Phone number is invalid",
        "any.required": "Phone number is required",
      }),
  });

  return schema.validate(data);
};

const validateLoginReqBody = (data) => {
  return Joi.object({
    email: Joi.string()
      .trim()
      .min(5)
      .max(250)
      .lowercase()
      .email({ minDomainSegments: 2 })
      .messages({
        "string.min": "Email should be 5+ characters long",
        "string.max": "Email shouldn't be more than 250 characters",
        "string.email": "A valid email is required",
      }),
    phone: Joi.string()
      .trim()
      .min(11)
      .max(11)
      .pattern(new RegExp("^[0-9]*$"))
      .messages({
        "string.min": "Phone number should be 11 digits",
        "string.max": "Phone number should be 11 digits",
        "string.pattern.base": "Phone number is invalid",
      }),
  }).validate(data);
};

const validateGetEntriesReqParam = (data) => {
  return Joi.object({
    userId: Joi.string()
      .trim()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .messages({
        "string.pattern.base": "User ID is invalid",
      }),
  }).validate(data);
};

exports.User = User;
exports.validateSignupReqBody = validateSignupReqBody;
exports.validateLoginReqBody = validateLoginReqBody;
exports.validateGetEntriesReqBody = validateGetEntriesReqParam;
