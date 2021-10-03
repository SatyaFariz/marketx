const { mysqlConnection } = require('../lib')
const Dataloader = require('dataloader')
const { LRUMap } = require('lru_map')

module.exports = new Dataloader(ids => {
  const sql = `SELECT administrative_area_id, name FROM administrative_area WHERE administrative_area_id IN(${ids.join(',')})`
  return new Promise(resolve => {
    mysqlConnection.query(sql, function (error, results, fields) {
      resolve(
        ids.map(id => results.find(area => area.administrative_area_id === id))
      )
    })
  })
  
}, { cacheMap: new LRUMap(100) })