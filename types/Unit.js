const {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Unit',
  fields: {
    id: { 
      type: GraphQLID
    },
    display: {
      type: GraphQLString,
      resolve: root => root.value > 1 ? `${root.value} ${root.name}` : root.name
    },
    name: {
      type: GraphQLString
    },
    value: {
      type: GraphQLFloat
    }
  }
})