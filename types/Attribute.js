const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const Image = require('./Image')

module.exports = new GraphQLObjectType({
  name: 'Attribute',
  fields: {
    id: { 
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
    },
    icon: {
      type: Image,
      resolve: root => root.icons[0]
    }
  }
})