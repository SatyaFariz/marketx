const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productConditionSchema = new Schema({
  display: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const ProductCondition = model('ProductCondition', productConditionSchema)

module.exports = ProductCondition