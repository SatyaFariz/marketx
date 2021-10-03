const CategoryModel = require('../database/models/Category')
const Dataloader = require('dataloader')
const { LRUMap } = require('lru_map')

module.exports = new Dataloader(ids => {

  const query = {
    _id: {
      $in: ids
    }
  }

  return CategoryModel.find(query).then(docs => {
    return ids.map(id => docs.find(doc => doc._id.equals(id)))
  })
  
}, { cacheMap: new LRUMap(100) })