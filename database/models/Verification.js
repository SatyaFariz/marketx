const mongoose = require('mongoose')
const { Schema, model } = mongoose

const verificationSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  /*
    "id" can be email or mobile number upon registration because it's guaranteed to be unique,
    or can be user id on whatsapp number verification.

    why array of strings? because we want to treat both "082322343005" and "6282322343005" as the same number
    and store both of them,
    so that both numbers log in to the same account.
  */
  id: {
    type: [String],
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