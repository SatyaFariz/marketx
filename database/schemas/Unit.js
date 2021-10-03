const mongoose = require('mongoose')
const { Schema } = mongoose

const unitSchema = new Schema({
  name: String,
  value: Number
})

module.exports = unitSchema


