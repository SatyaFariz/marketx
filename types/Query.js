const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql')
const { forwardConnectionArgs } = require('graphql-relay')
const { GraphQLEmail } = require('graphql-custom-types')

const Post = require('./Post')
const PostModel = require('../database/models/Post')
const PostTypeEnum = require('./PostTypeEnum')
const Category = require('./Category')
const CategoryModel = require('../database/models/Category')
const Unit = require('./Unit')
const UnitModel = require('../database/models/Unit')
const User = require('./User')
const UserModel = require('../database/models/User')
const Product = require('./Product')
const ProductModel = require('../database/models/Product')
const ProductConnection = require('./ProductConnection')
const Attribute = require('./Attribute')
const AttributeModel = require('../database/models/Attribute')
const Store = require('./Store')
const StoreModel = require('../database/models/Store')
const AdministrativeArea = require('./AdministrativeArea')
const SuspensionReason = require('./SuspensionReason')
const SuspensionReasonModel = require('../database/models/SuspensionReason')
const ProductCondition = require('./ProductCondition')
const ProductConditionModel = require('../database/models/ProductCondition')

const relayConnectionFrom = require('../utils/relayConnectionFrom')
const searchProducts = require('../utils/searchProducts')
const getAdministrativeAreas = require('../utils/getAdministrativeAreas')

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: {
    mobileNumberExists: {
      type: GraphQLBoolean,
      args: {
        mobileNumber: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { mobileNumber }) => {
        const user = await UserModel.findOne({ mobileNumber })
        return user !== null
      }
    },
    emailExists: {
      type: GraphQLBoolean,
      args: {
        email: { type: new GraphQLNonNull(GraphQLEmail) }
      },
      resolve: async (_, { email }) => {
        const user = await UserModel.findOne({ email })
        return user !== null
      }
    },
    me: {
      type: User,
      resolve: async (_, __, { session: { user }}) => {
        if(user)
          return await UserModel.findById(user.id)

        return null
      }
    },
    attributes: {
      type: new GraphQLList(Attribute),
      resolve: async () => {
        return await AttributeModel.find({})
      }
    },
    categories: {
      type: new GraphQLList(Category),
      args: {
        hasChild: { type: GraphQLBoolean }
      },
      resolve: async (_, { hasChild }) => {
        const categories = await CategoryModel.find({})

        if(hasChild === false) {
          let keyValue = {}
          categories.forEach(category => {
            if(category.parentId) {
              keyValue[category.parentId.toString()] = true
            } else {
              const id = category._id.toString()
              if(!keyValue[id]) {
                keyValue[id] = false
              }
            }
          })

          return categories.filter(category => !keyValue[category._id.toString()])
        }
        
        return categories
      }
    },
    category: {
      type: Category,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }) => await CategoryModel.findById({ _id: id })
    },
    rentalDurations: {
      type: new GraphQLList(Unit),
      resolve: async () => {
        return await UnitModel.find({})
      }
    },
    product: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }) => await ProductModel.findById({ _id: id })
    },
    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }) => await UserModel.findById({ _id: id })
    },
    store: {
      type: Store,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }) => await StoreModel.findById({ _id: id })
    },
    featuredProducts: {
      type: new GraphQLList(Product),
      resolve: async () => {

        const match = {
          isFeatured: true,
          isPublished: true,
          isDeleted: { $ne: true },
          isSuspended: { $ne: true }
        }

        return await ProductModel.aggregate([
          { $match : match },
          { $sample : { size: 10 } }
        ])
      }
    },
    search: {
      type: ProductConnection,
      args: {
        q: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLString },
        storeId: { type: GraphQLString },
        published: { type: GraphQLBoolean },
        ...forwardConnectionArgs
      },
      resolve: async (_, { first, after, q, categoryId, storeId }, { session: { user }}) => {
        return await relayConnectionFrom(first, async (limit) => {
          return await searchProducts({ q, limit, after, categoryId, storeId, user })
        })
      }
    },
    administrativeAreas: {
      type: new GraphQLList(AdministrativeArea),
      args: {
        parentId: { type: GraphQLInt }
      },
      resolve: async (_, args) => {
        return await getAdministrativeAreas(args)
      }
    },
    suspensionReasons: {
      type: new GraphQLList(SuspensionReason),
      resolve: async () => await SuspensionReasonModel.find({})
    },
    productConditions: {
      type: new GraphQLList(ProductCondition),
      resolve: async () => await ProductConditionModel.find({})
    },
    posts: {
      type: new GraphQLList(Post),
      args: {
        type: { type: new GraphQLNonNull(PostTypeEnum) },
        limit: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (_, { limit, type }, { session: { user }}) => {
        const query = { type, isPublished: true }
        if(user?.isAdmin) delete query.isPublished
        
        return await PostModel.find(query, null, { limit })
      }
    }
  }
})