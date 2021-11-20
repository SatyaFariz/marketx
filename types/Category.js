const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType
} = require('graphql')

const Image = require('./Image')
const SpecificationField = require('./SpecificationField')
const CategoryLoader = require('../dataloader/CategoryLoader')
const SubcategoriesLoader = require('../dataloader/SubcategoriesLoader')

const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { 
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
    },
    code: {
      type: GraphQLString
    },
    path: {
      type: GraphQLString
    },
    level: {
      type: GraphQLInt
    },
    maxImageUpload: {
      type: GraphQLInt
    },
    isPublished: {
      type: GraphQLBoolean
    },
    requiresProductCondition: {
      type: GraphQLBoolean
    },
    showsProductConditionField: {
      type: GraphQLBoolean
    },
    forceLocationInput: {
      type: GraphQLBoolean
    },
    listingType: {
      type: GraphQLString
    },
    icon: {
      type: Image,
      resolve: (root) => {
        return root.icons[0]
      }
    },
    ancestors: {
      type: new GraphQLList(Category),
      resolve: async (root) => {
        return await Promise.all(root.ancestorIds.map(id => CategoryLoader.load(id)))
      }
    },
    children: {
      type: new GraphQLList(Category),
      resolve: async (root) => await SubcategoriesLoader.load(root._id)
    },
    specFields: {
      type: new GraphQLList(SpecificationField)
    },
    rentalDurationIds: {
      type: new GraphQLList(GraphQLString)
    }
  })
})

module.exports = Category