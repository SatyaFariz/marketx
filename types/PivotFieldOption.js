const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'PivotFieldOption',
  fields: {
    id: { 
      type: GraphQLID
    },
    isDefault: {
      type: GraphQLBoolean
    },
    label: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    }
  }
})