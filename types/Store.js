const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} = require('graphql')

const Address = require('./Address')
const Image = require('./Image')

module.exports = new GraphQLObjectType({
  name: 'Store',
  fields: {
    id: { 
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
    },
    whatsappNumber: {
      type: GraphQLString
    },
    whatsappUrl: {
      type: GraphQLString,
      resolve: root => `https://wa.me/${root.whatsappNumber}`
    },
    merchantId: {
      type: GraphQLString
    },
    address: {
      type: Address
    },
    profilePicture: {
      type: Image
    },
    isVerified: {
      type: GraphQLBoolean
    },
    banner: {
      type: Image
    }
  }
})