const {
  GraphQLID,
  GraphQLList,
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
      type: new GraphQLList(GraphQLString)
    },
    whatsappUrl: {
      type: GraphQLString,
      resolve: root => `https://wa.me/${root.whatsappNumber.find(n => !n.startsWith('0'))}`
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