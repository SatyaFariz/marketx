const CategoryModel = require('../database/models/Category')
const Dataloader = require('dataloader')
const { LRUMap } = require('lru_map')

module.exports = new Dataloader(ids => {

  const query = {
    parentId: {
      $in: ids
    }
  }

  return CategoryModel.find(query).then(docs => {
    return ids.map(id => docs.filter(doc => doc.parentId.equals(id)))
  })
  
}, { cacheMap: new LRUMap(100) })