const {
  GraphQLEnumType,
} = require('graphql')

module.exports = new GraphQLEnumType({
  name: 'UserActionEnum',
  values: {
    login: {
      value: 'login'
    },
    register: {
      value: 'register'
    },
    edit_profile: {
      value: 'edit_profile'
    }
  }
})