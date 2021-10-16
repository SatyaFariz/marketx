const {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')


module.exports = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: {
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