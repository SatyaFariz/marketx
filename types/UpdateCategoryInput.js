const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
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
    maxImageUpload: {
      type: GraphQLInt
    },
    rentalDurationIds: {
      type: new GraphQLList(GraphQLString)
    },
    specFields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SpecificationFieldInput)))
    }
  }
})