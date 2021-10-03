const StoreModel = require('../database/models/Store')
const Dataloader = require('dataloader')
const { LRUMap } = require('lru_map')

module.exports = new Dataloader(ids => {

  const query = {
    merchantId: {
      $in: ids
    }
  }

  return StoreModel.find(query).then(docs => {
    return ids.map(id => docs.find(doc => doc.merchantId.equals(id)))
  })
  
}, { cacheMap: new LRUMap(100) })