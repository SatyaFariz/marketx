const { 
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const { withFilter } = require('graphql-subscriptions')


module.exports = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    test: {
      type: GraphQLString,
      subscribe: withFilter((root, args, { pubsub }) => pubsub.asyncIterator('TEST'), (payload, args, ctx) => {
        return true
      }),
    }
    // newNotification: {
    //   type: ActionOnNotificationPayload,
    //   subscribe: withFilter((root, args, { pubsub }) => pubsub.asyncIterator('NEW_NOTIFICATION'), (payload, args, ctx) => {
    //     const { to } = payload
    //     const { user } = ctx.session

    //     if(user && to.map(item => item.toString()).includes(user.id.toString()))
    //       return true
        
    //     return false
        
    //   }),
    //   resolve: (root) => {
    //     return {
    //       notification: { id: root._id.toString(), ...root, createdAt: new Date(root.createdAt) }
    //     }
    //   }
    // }, 
  })
})


