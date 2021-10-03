const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'SuspensionReason',
  fields: {
    id: { 
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    }
  }
})