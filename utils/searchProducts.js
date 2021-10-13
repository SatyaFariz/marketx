const { cursorToId } = require('./relayCursor')
const ProductModel = require('../database/models/Product')
const { isMongoId } = require('validator')

module.exports = async ({ q, limit, after, categoryId, published, storeId, user }) => {
  const options = { 
    sort: { sequence: -1 }, 
    limit: limit 
  }

  q = q.trim()

  const query = {
    isDeleted: { $ne: true },
    isSuspended: { $ne: true },
    isPublished: true
  }
  
  if(q.length === 0) {

    if(after)
      query.sequence = { $lt: cursorToId(after) }

    if(categoryId)
      query.category = categoryId

    if(storeId) {
      query.storeId = storeId
      if(user?.storeId === storeId) {
        delete query.isSuspended
        delete query.isPublished
      }
    }

    if(typeof published === 'boolean')
      query.published = published

    return await ProductModel.find(query, null, options)
  } else {

    if(isMongoId(q)) {
      query._id = q
    } else {
      query['$text'] = { $search: q }
    }

    if(after)
      query.sequence = { $lt: cursorToId(after) }

    if(categoryId)
      query.category = categoryId

    if(storeId) {
      query.storeId = storeId
      if(user?.storeId === storeId) {
        delete query.isSuspended
        delete query.isPublished
      }
    }

    if(typeof published === 'boolean')
      query.published = published

    return await ProductModel.find(query, null, options)
  }
}