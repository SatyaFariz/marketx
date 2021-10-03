const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'ActionInfo',
  fields: {
    hasError: { 
      type: GraphQLBoolean
    },
    message: {
      type: GraphQLString
    },
  }
})