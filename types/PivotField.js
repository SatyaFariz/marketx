const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const Attribute = require('./Attribute')
const AttributeLoader = require('../dataloader/AttributeLoader')
const PivotFieldOption = require('./PivotFieldOption')

module.exports = new GraphQLObjectType({
  name: 'PivotField',
  fields: {
    id: { 
      type: GraphQLID
    },
    attribute: {
      type: Attribute,
      resolve: async root => await AttributeLoader.load(root.attributeId)
    },
    emptyErrorMessage: {
      type: GraphQLString
    },
    helperText: {
      type: GraphQLString
    },
    options: {
      type: new GraphQLList(PivotFieldOption)
    }
  }
})