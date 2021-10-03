const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { 
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString,
      resolve: root => root.updatedAt.toISOString()
    }
  }
})