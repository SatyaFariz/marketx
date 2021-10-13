const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} = require('graphql')

const Attribute = require('./Attribute')
const AttributeLoader = require('../dataloader/AttributeLoader')

module.exports = new GraphQLObjectType({
  name: 'Specification',
  fields: {
    id: { 
      type: GraphQLID
    },
    attribute: {
      type: Attribute,
      resolve: async root => await AttributeLoader.load(root.attributeId)
    },
    value: {
      type: GraphQLString,
    },
    isMulti: {
      type: GraphQLBoolean
    },
    prefix: {
      type: GraphQLString
    },
    suffix: {
      type: GraphQLString
    }
  }
})