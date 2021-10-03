const {
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType
} = require('graphql')

const AdministrativeArea = require('./AdministrativeArea')
const AdministrativeAreaLoader = require('../dataloader/AdministrativeAreaLoader')

module.exports = new GraphQLObjectType({
  name: 'Address',
  fields: {
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat
    },
    fullAddress: {
      type: GraphQLString
    },
    province: {
      type: AdministrativeArea,
      resolve: async (root) => await AdministrativeAreaLoader.load(root.provinceId)
    },
    city: {
      type: AdministrativeArea,
      resolve: async (root) => await AdministrativeAreaLoader.load(root.cityId)
    },
    district: {
      type: AdministrativeArea,
      resolve: async (root) => await AdministrativeAreaLoader.load(root.districtId)
    }
  }
})