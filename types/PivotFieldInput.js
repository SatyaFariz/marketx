const {
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} = require('graphql')

const PivotFieldOptionInput = require('./PivotFieldOptionInput')

module.exports = new GraphQLInputObjectType({
  name: 'PivotFieldInput',
  fields: {
    attributeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    emptyErrorMessage: {
      type: GraphQLString
    },
    helperText: {
      type: GraphQLString
    },
    options: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PivotFieldOptionInput)))
    }
  }
})