const mongoose = require('mongoose')
const { Schema, model } = mongoose

const verificationSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  attempts: {
    type: Number
  },
  firstAttemptTimestamp: {
    type: Date
  },
  lastAttemptTimestamp: {
    type: Date
  },
  cooldownExpiry: {
    type: Date
  },
  expiry: {
    type: Date,
    required: true
  }
}, { timestamps: true })

const Verification = model('Verification', verificationSchema)

module.exports = Verification