const {
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
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
    min: { 
      type: GraphQLFloat
    },
    numberOfLines: { 
      type: GraphQLInt
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
    },
    prefix: {
      type: GraphQLString
    },
    suffix: {
      type: GraphQLString
    }
  }
})