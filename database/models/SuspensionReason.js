const mongoose = require('mongoose')
const { Schema, model } = mongoose

const suspensionReasonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const SuspensionReason = model('SuspensionReason', suspensionReasonSchema)

module.exports = SuspensionReason