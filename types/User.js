const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql')

const Image = require('./Image')
const Store = require('./Store')
const StoreLoader = require('../dataloader/StoreLoader')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    isAdmin: {
      type: GraphQLBoolean
    },
    mobileNumber: {
      type: GraphQLString,
    },
    profilePicture: {
      type: Image
    },
    store: {
      type: Store,
      resolve: async (root) => await StoreLoader.load(root._id)
    }
  }
})