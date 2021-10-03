const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat
} = require('graphql')

const SpecificationInput = require('./SpecificationInput')

module.exports = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    desc: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    isPublished: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    specs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SpecificationInput)))
    },
    rentalDurationId: {
      type: GraphQLString
    },
    productConditionId: {
      type: GraphQLString
    }
  }
})