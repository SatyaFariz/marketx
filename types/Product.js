const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const Image = require('./Image')
const Unit = require('./Unit')
const UnitLoader = require('../dataloader/UnitLoader')
const Category = require('./Category')
const CategoryLoader = require('../dataloader/CategoryLoader')
const Specification = require('./Specification')
const User = require('./User')
const UserLoader = require('../dataloader/UserLoader')
const Store = require('./Store')
const Location = require('./Location')
const StoreLoader = require('../dataloader/StoreLoader')
const ProductCondition = require('./ProductCondition')
const ProductConditionLoader = require('../dataloader/ProductConditionLoader')
const AdministrativeAreaLoader = require('../dataloader/AdministrativeAreaLoader')

module.exports = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { 
      type: GraphQLID,
      resolve: root => root._id
    },
    name: {
      type: GraphQLString,
    },
    desc: {
      type: GraphQLString
    },
    price: {
      type: GraphQLFloat,
    },
    rentalDuration: {
      type: Unit,
      resolve: async root => root.rentalDurationId && await UnitLoader.load(root.rentalDurationId)
    },
    condition: {
      type: ProductCondition,
      resolve: async root => root.productConditionId && await ProductConditionLoader.load(root.productConditionId)
    },
    category: {
      type: new GraphQLList(Category),
      resolve: async root => {
        return await Promise.all(root.category.map(id => CategoryLoader.load(id)))
      }
    },
    merchantId: {
      type: GraphQLString,
      resolve: async root => root.merchantId
    },
    pivotFieldOptionId: {
      type: GraphQLString
    },
    merchant: {
      type: User,
      resolve: async root => await UserLoader.load(root.merchantId)
    },
    store: {
      type: Store,
      resolve: async root => await StoreLoader.load(root.merchantId)
    },
    isPublished: {
      type: GraphQLBoolean
    },
    isFeatured: {
      type: GraphQLBoolean
    },
    isDeleted: {
      type: GraphQLBoolean
    },
    isSuspended: {
      type: GraphQLBoolean
    },
    syncLocationWithStoreAddress: {
      type: GraphQLBoolean
    },
    stock: {
      type: GraphQLInt
    },
    listingType: {
      type: GraphQLString
    },
    mainImage: {
      type: Image,
      resolve: root => root.images[0]
    },
    images: {
      type: new GraphQLList(Image)
    },
    specs: {
      type: new GraphQLList(Specification)
    },
    location: {
      type: Location,
      resolve: async root => {
        const [provinceId, cityId, districtId] = root.administrativeAreaIds
        return {
          provinceId,
          cityId,
          districtId
        }
      }
    },
    createdAt: {
      type: GraphQLString,
      resolve: async root => root.createdAt.toISOString()
    },
    renewedAt: {
      type: GraphQLString,
      resolve: async root => root.renewedAt?.toISOString()
    },
    views: {
      type: GraphQLInt
    },
    leads: {
      type: GraphQLInt
    },
  }
})