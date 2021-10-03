const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'UpdateProfileInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    mobileNumber: { 
      type: GraphQLString
    }
  }
})