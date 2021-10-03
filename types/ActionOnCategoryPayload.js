const {
  GraphQLObjectType
} = require('graphql')

const ActionInfo = require('./ActionInfo')
const Category = require('./Category')

module.exports = new GraphQLObjectType({
  name: 'ActionOnCategoryPayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    category: {
      type: Category
    }
  }
})