const {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'SpecificationFieldInput',
  fields: {
    attributeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isRequired: { 
      type: GraphQLBoolean
    },
    type: { 
      type: GraphQLString
    },
    max: { 
      type: GraphQLFloat
    },
    isRequired: { 
      type: GraphQLFloat
    },
    options: {
      type: new GraphQLList(GraphQLString)
    },
    isEnum: {
      type: GraphQLBoolean
    },
    isMulti: {
      type: GraphQLBoolean
    },
    isAutocomplete: {
      type: GraphQLBoolean
    }
  }
})