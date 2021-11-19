const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'UserSession',
  fields: {
    userId: { 
      type: GraphQLString,
      resolve: root => root.id
    },
    storeId: {
      type: GraphQLString,
    },
    isAdmin: {
      type: GraphQLBoolean
    }
  }
})