const {
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const ActionInfo = require('./ActionInfo')

module.exports = new GraphQLObjectType({
  name: 'SendVerificationCodePayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    cooldownExpiry: {
      type: GraphQLString,
      resolve: root => root.cooldownExpiry?.toISOString()
    },
    expiry: {
      type: GraphQLString,
      resolve: root => root.expiry?.toISOString()
    }
  }
})