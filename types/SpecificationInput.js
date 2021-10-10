const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'SpecificationInput',
  fields: {
    attributeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    value: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    isMulti: { 
      type: GraphQLBoolean
    }
  }
})