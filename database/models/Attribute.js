const mongoose = require('mongoose')
const imageSchema = require('../schemas/Image')
const { Schema, model } = mongoose

const attributeSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  },
  icons: {
    type: [imageSchema],
    required: true,
    default: []
  }
}, { timestamps: true })

const Attribute = model('Attribute', attributeSchema)

module.exports = Attribute