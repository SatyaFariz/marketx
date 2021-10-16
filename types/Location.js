const {
  GraphQLObjectType
} = require('graphql')

const AdministrativeArea = require('./AdministrativeArea')
const AdministrativeAreaLoader = require('../dataloader/AdministrativeAreaLoader')

module.exports = new GraphQLObjectType({
  name: 'Location',
  fields: {
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