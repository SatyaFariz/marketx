const mongoose = require('mongoose')
const { Schema, model } = mongoose

const tokenSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
}, { timestamps: true })

const Token = model('Token', tokenSchema)

module.exports = Token