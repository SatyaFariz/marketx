const mongoose = require('mongoose')
const { Schema, model } = mongoose

const addressSchema = require('../schemas/Address')
const imageSchema = require('../schemas/Image')

const storeSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  },
  whatsappNumber: {
    type: String,
    required: true,
    trim: true,
  },
  merchantId: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  },
  address: {
    type: addressSchema
  },
  profilePicture: {
    type: imageSchema
  },
  banner: {
    type: imageSchema
  },
  isVerified: {
    type: Boolean
  }
}, { timestamps: true })

const Store = model('Store', storeSchema)

module.exports = Store