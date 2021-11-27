const mongoose = require('mongoose')
const { Schema, model } = mongoose

const imageSchema = require('../schemas/Image')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    // enum: [1, 2],
    default: 1
  },
  path: {
    type: String,
    required: true
  },
  ancestorIds: {
    type: [Schema.ObjectId],
    required: true,
    default: []
  },
  parentId: {
    type: Schema.ObjectId,
  },
  code: {
    type: String,
    unique: true,
    sparse: true
  },
  listingType: {
    type: String,
    enum: ['default', 'service', 'rental_product'],
    default: 'default'
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  },
  icons: {
    type: [imageSchema],
    required: true,
    default: []
  },
  rentalDurationIds: {
    type: [Schema.ObjectId],
  },
  requiresProductCondition: {
    type: Boolean
  },
  showsProductConditionField: {
    type: Boolean
  },
  forceLocationInput: {
    type: Boolean
  },
  maxImageUpload: {
    type: Number
  },
  pivotField: {
    type: new Schema({
      attributeId: {
        type: Schema.ObjectId,
        required: true
      },
      emptyErrorMessage: {
        type: String,
        trim: true
      },
      helperText: {
        type: String,
        trim: true
      },
      options: {
        type: [new Schema({
          label: {
            type: String,
            required: true
          },
          desc: {
            type: String
          },
          isDefault: {
            type: Boolean
          }
        })]
      }
    })
  },
  specFields: {
    type: [new Schema({
      attributeId: {
        type: Schema.ObjectId,
        required: true
      },
      isRequired: {
        type: Boolean
      },
      isPublished: {
        type: Boolean
      },
      type: {
        type: String
      },
      prefix: {
        type: String
      },
      suffix: {
        type: String
      },
      emptyErrorMessage: {
        type: String
      },
      helperText: {
        type: String
      },
      max: {
        type: Number
      },
      min: {
        type: Number
      },
      numberOfLines: {
        type: Number
      },
      maxLength: {
        type: Number
      },
      options: {
        type: [String]
      },
      isEnum: {
        type: Boolean
      },
      isMulti: {
        type: Boolean
      },
      isAutocomplete: {
        type: Boolean
      },
      includePivotFieldOptionIds: {
        type: [Schema.ObjectId]
      },
      excludePivotFieldOptionIds: {
        type: [Schema.ObjectId]
      }
    })],
    default: []
  },
  lastUpdatedBy: {
    type: Schema.ObjectId,
    required: true
  },
}, { timestamps: true })

const Category = model('Category', categorySchema)

module.exports = Category