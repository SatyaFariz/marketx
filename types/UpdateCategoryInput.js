const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const CategorySpecificationFieldInput = require('./CategorySpecificationFieldInput')

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
    specFields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CategorySpecificationFieldInput)))
    }
  }
})