const {
  // GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const ActionInfo = require('./ActionInfo')
const User = require('./User')

module.exports = new GraphQLObjectType({
  name: 'ActionOnUserPayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    user: {
      type: User
    }
  }
})