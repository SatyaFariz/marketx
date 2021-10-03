const {
  connectionDefinitions
} = require('graphql-relay')

const Product = require('./Product')

const { connectionType: ProductConnection } = connectionDefinitions({ nodeType: Product })

module.exports = ProductConnection