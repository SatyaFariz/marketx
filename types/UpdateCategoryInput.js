const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const SpecificationFieldInput = require('./SpecificationFieldInput')

module.exports = new GraphQLInputObjectType({
  name: 'UpdateCategoryInput',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isPublished: { 
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    showsProductConditionField: { 
      type: GraphQLBoolean
    },
    requiresProductCondition: { 
      type: GraphQLBoolean
    },
    forceLocationInput: { 
      type: GraphQLBoolean
    },
    specFields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SpecificationFieldInput)))
    }
  }
})