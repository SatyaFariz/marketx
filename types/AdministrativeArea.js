const {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'AdministrativeArea',
  fields: {
    administrativeAreaId: {
      type: GraphQLInt,
      resolve: root => root.administrative_area_id
    },
    name: {
      type: GraphQLString
    },
  }
})