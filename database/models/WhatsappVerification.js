const mongoose = require('mongoose')
const { Schema, model } = mongoose

const whatsappVerificationSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  /*
    why array of strings? because we want to treat both "082322343005" and "6282322343005" as the same number
    and store both of them,
    so that both numbers log in to the same account.
  */
  whatsappNumber: {
    type: [String],
    required: true
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

const WhatsappVerification = model('WhatsappVerification', whatsappVerificationSchema)

// just in case we want to add multiple whatsapp numbers functionality
whatsappVerificationSchema.index({ userId: 1, whatsappNumber: 1 }, { unique: true })

module.exports = WhatsappVerification