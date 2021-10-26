const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')

const ActionInfo = require('./ActionInfo')

module.exports = new GraphQLObjectType({
  name: 'SendVerificationCodePayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    emailOrNumber: {
      type: new GraphQLList(GraphQLString)
    },
    isNumberNotRegisteredOnWhatsapp: {
      type: GraphQLBoolean
    },
    isEmailOrNumberRegistered: {
      type: GraphQLBoolean
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