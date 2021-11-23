const {
  GraphQLID,
  GraphQLList,
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
    options: {
      type: new GraphQLList(PivotFieldOption)
    }
  }
})