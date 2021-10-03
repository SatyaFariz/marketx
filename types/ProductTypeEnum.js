const {
  GraphQLEnumType,
} = require('graphql')

module.exports = new GraphQLEnumType({
  name: 'ProductTypeEnum',
  values: {
    for_rent: {
      value: 'for_rent'
    },
    for_sale: {
      value: 'for_sale'
    },
    service: {
      value: 'service'
    }
  }
})