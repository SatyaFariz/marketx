const {
  // GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const ActionInfo = require('./ActionInfo')
const Store = require('./Store')

module.exports = new GraphQLObjectType({
  name: 'ActionOnStorePayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    store: {
      type: Store
    }
  }
})