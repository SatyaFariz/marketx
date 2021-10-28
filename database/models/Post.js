const mongoose = require('mongoose')
const { Schema, model } = mongoose

const postSchema = new Schema({
  title:  {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  },
  lastUpdatedBy: {
    type: Schema.ObjectId,
    required: true
  },
}, { timestamps: true })

const Post = model('Post', postSchema)

module.exports = Post