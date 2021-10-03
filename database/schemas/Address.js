const mongoose = require('mongoose')
const { Schema } = mongoose

const addressSchema = new Schema({
  fullAddress: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  provinceId: {
    type: Number,
    required: true
  },
  cityId: {
    type: Number,
    required: true
  },
  districtId: {
    type: Number
  }
})

module.exports = addressSchema


