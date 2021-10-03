const mongoose = require('mongoose')
const { Schema, model } = mongoose

const otpCodeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  attempts: {
    type: Number,
    required: true,
    default: 1
  },
  firstAttemptTimestamp: {
    type: Date,
    required: true
  },
  lastAttemptTimestamp: {
    type: Date,
    required: true
  },
  cooldownExpiry: {
    type: Date,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
}, { timestamps: true })

const OtpCode = model('Otpcode', otpCodeSchema)

module.exports = OtpCode