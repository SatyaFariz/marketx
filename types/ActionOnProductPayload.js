const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')
const { idToCursor } = require('../utils/relayCursor')

const ActionInfo = require('./ActionInfo')
const Product = require('./Product')

module.exports = new GraphQLObjectType({
  name: 'ActionOnProductPayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    product: {
      type: Product,
    },
    cursor: {
      type: GraphQLString,
      resolve: root => root?.product?.id && idToCursor(root.product?.id)
    }
  }
})