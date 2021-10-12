const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'CategorySpecificationFieldInput',
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
    }
  }
})