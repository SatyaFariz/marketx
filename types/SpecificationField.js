const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType,
} = require('graphql')

const Attribute = require('./Attribute')
const AttributeLoader = require('../dataloader/AttributeLoader')

module.exports = new GraphQLObjectType({
  name: 'SpecificationField',
  fields: {
    id: { 
      type: GraphQLID
    },
    attribute: {
      type: Attribute,
      resolve: async root => await AttributeLoader.load(root.attributeId)
    },
    isRequired: {
      type: GraphQLBoolean,
    },
    type: {
      type: GraphQLString
    },
    max: {
      type: GraphQLInt
    },
    min: {
      type: GraphQLInt
    },
    options: {
      type: new GraphQLList(GraphQLString)
    },
    isEnum: {
      type: GraphQLBoolean
    },
    isAutocomplete: {
      type: GraphQLBoolean
    }
  }
})