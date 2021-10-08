const {
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')

const ActionInfo = require('./ActionInfo')
const Attribute = require('./Attribute')

module.exports = new GraphQLObjectType({
  name: 'CreateAttributesPayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    attributes: {
      type: new GraphQLList(Attribute)
    }
  }
})