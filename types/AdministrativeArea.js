const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} = require('graphql')

const AdministrativeAreaLoader = require('../dataloader/AdministrativeAreaLoader')

const AdministrativeArea = new GraphQLObjectType({
  name: 'AdministrativeArea',
  fields: () => ({
    administrativeAreaId: {
      type: GraphQLInt,
      resolve: root => root.administrative_area_id
    },
    name: {
      type: GraphQLString
    },
    ancestors: {
      type: new GraphQLList(AdministrativeArea),
      resolve: async root => {
        const parentIds = JSON.parse(root.parent_ids).slice(1)
        return await Promise.all(parentIds.map(id => AdministrativeAreaLoader.load(id)))
      }
    }
  })
})

module.exports = AdministrativeArea