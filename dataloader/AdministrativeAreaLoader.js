const Dataloader = require('dataloader')
const { LRUMap } = require('lru_map')

const getAdministrativeAreas = require('../utils/getAdministrativeAreas')

module.exports = new Dataloader(ids => {
  return new Promise(async resolve => {
    const areas = await getAdministrativeAreas({ ids })
    resolve(ids.map(id => areas.find(area => area.administrative_area_id === id)))
  })
  
}, { cacheMap: new LRUMap(100) })