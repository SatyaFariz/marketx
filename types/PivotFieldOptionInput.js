const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'PivotFieldOptionInput',
  fields: {
    label: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isDefault: {
      type: GraphQLBoolean
    },
    desc: {
      type: GraphQLString
    }
  }
})