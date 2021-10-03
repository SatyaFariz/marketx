const {
  GraphQLEnumType,
} = require('graphql')

module.exports = new GraphQLEnumType({
  name: 'PostTypeEnum',
  values: {
    faq: {
      value: 'faq'
    },
    privacy_policy: {
      value: 'privacy_policy'
    },
    terms_of_service: {
      type: 'terms_of_service'
    },
    about_us: {
      type: 'about_us'
    }
  }
})