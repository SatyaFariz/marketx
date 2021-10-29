const {
  GraphQLObjectType
} = require('graphql')

const ActionInfo = require('./ActionInfo')
const Post = require('./Post')

module.exports = new GraphQLObjectType({
  name: 'ActionOnPostPayload',
  fields: {
    actionInfo: { 
      type: ActionInfo
    },
    post: {
      type: Post
    }
  }
})