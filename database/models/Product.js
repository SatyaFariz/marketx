const mongoose = require('mongoose')
const imageSchema = require('../schemas/Image')
const { Schema, model } = mongoose

const productSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true
  },
  images: {
    type: [imageSchema],
    required: true,
    default: []
  },
  categoryId: {
    type: Schema.ObjectId
  },
  path: {
    type: String
  },
  category: {
    type: [Schema.ObjectId] // [categoryId, subcategoryId]
  },
  storeId: {
    type: Schema.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['for_sale', 'for_rent', 'service']
  },
  administrativeAreaIds: {
    type: [Number], // [provinceId, cityId, districtId]
    required: true
  },
  merchantId: {
    type: Schema.ObjectId,
    required: true
  },
  rentalDurationId: {
    type: Schema.ObjectId,
  },
  productConditionId: {
    type: Schema.ObjectId,
  },
  listingType: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true
  },
  isFeatured: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true
  },
  isSuspended: {
    type: Boolean
  },
  suspensionReasonId: {
    type: Schema.ObjectId
  },
  stock: {
    type: Number,
    default: 1,
    required: true
  },
  specs: {
    type: [new Schema({
      attributeId: {
        type: String,
        required: true
      },
      value: {
        type: String
      },
      isMulti: {
        type: Boolean
      }
    })],
    required: true,
    default: []
  },
  lastUpdatedBy: {
    type: Schema.ObjectId,
    required: true
  },
}, { timestamps: true })

const Product = model('Product', productSchema)

module.exports = Product