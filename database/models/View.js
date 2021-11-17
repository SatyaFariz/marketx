const mongoose = require('mongoose')
const { Schema, model } = mongoose

const viewSchema = new Schema({
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

viewSchema.index({ id: 1, productId: 1 }, { unique: true })

const View = model('View', viewSchema)

module.exports = View