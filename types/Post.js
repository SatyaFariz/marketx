const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
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
    draft: {
      type: GraphQLString
    },
    isDeleted: {
      type: GraphQLBoolean
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