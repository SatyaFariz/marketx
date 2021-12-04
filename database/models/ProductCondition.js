const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productConditionSchema = new Schema({
  isBrandNew: {
    type: Boolean,
    required: true
  },
  display: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
}, { timestamps: true })

const ProductCondition = model('ProductCondition', productConditionSchema)

module.exports = ProductCondition