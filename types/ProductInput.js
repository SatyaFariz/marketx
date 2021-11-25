const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat
} = require('graphql')

const SpecificationInput = require('./SpecificationInput')
const LocationInput = require('./LocationInput')

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
    syncLocationWithStoreAddress: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    location: {
      type: LocationInput
    },
    specs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SpecificationInput)))
    },
    rentalDurationId: {
      type: GraphQLString
    },
    productConditionId: {
      type: GraphQLString
    },
    pivotFieldOptionId: {
      type: GraphQLString
    },
  }
})