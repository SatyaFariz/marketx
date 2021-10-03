const mongoose = require('mongoose')
const { Schema, model } = mongoose

const imageSchema = require('../schemas/Image')

const userSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  isAdmin: {
    type: Boolean,
  },
  email:  {
    type: String,
    unique: true,
    trim: true,
    sparse: true
  },
  password: {
    type: String,
    trim: true
  },
  // temporary email
  unverifiedEmail: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: imageSchema
  }
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User