const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
  _id:  String,
  url: String,
  width: Number,
  height: Number,
  bytes: Number,
  format: String,
  display: Number // can be 0 or 1, 1 for main image
})

module.exports = imageSchema


