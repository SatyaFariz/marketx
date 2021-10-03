const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'ProductCondition',
  fields: {
    id: { 
      type: GraphQLID
    },
    display: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    }
  }
})