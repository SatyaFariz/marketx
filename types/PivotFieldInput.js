const {
  GraphQLString,
  GraphQLBoolean,
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
    showsInProductDetail: {
      type: GraphQLBoolean
    },
    options: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PivotFieldOptionInput)))
    }
  }
})