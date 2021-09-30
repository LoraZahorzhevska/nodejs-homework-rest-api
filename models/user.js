const { Schema, model } = require('mongoose');
const Joi = require('joi');
// const { v4 } = require('uuid');
// const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlenght: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    avatarURL: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.createVerifyToken = function () {
//   this.verifyToken = v4();
// };

const joiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  token: Joi.string(),

  avatarURL: Joi.string(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema,
};
