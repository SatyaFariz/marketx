const mongoose = require('mongoose')
const { Schema, model } = mongoose

const leadSchema = new Schema({
  id:  {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    expires: 86400, // 1 day
    default: Date.now 
  }
})

leadSchema.index({ id: 1, productId: 1 }, { unique: true })

const Lead = model('Lead', leadSchema)

module.exports = Lead