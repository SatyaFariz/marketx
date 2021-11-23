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
    options: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PivotFieldOptionInput)))
    }
  }
})