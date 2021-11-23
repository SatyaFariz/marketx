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
    type: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    options: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
    },
    isRequired: { 
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    isAutocomplete: {
      type: GraphQLBoolean
    },
    isEnum: {
      type: GraphQLBoolean
    },
    isMulti: {
      type: GraphQLBoolean
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
    maxLength: { 
      type: GraphQLInt
    },
    prefix: {
      type: GraphQLString
    },
    suffix: {
      type: GraphQLString
    },
    emptyErrorMessage: {
      type: GraphQLString
    },
    helperText: {
      type: GraphQLString
    },
    includePivotFieldOptionIds: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString))
    },
    excludePivotFieldOptionIds: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString))
    },
  }
})