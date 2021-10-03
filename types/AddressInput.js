const {
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')


module.exports = new GraphQLInputObjectType({
  name: 'AddressInput',
  fields: {
    fullAddress: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lat: { 
      type: GraphQLFloat
    },
    lng: { 
      type: GraphQLFloat
    },
    provinceId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    cityId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    districtId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  }
})