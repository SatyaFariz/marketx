const axios = require('axios')
const redisClient = require('../lib/redis')

const instance = axios.create({
  baseURL: process.env.ADMINISTRATIVE_AREA_SERVICE_URL
})

const getAdministrativeAreas = async (args) => {
  const endpoint = '/api/administrative_areas'
  try {
    let query = ''
    if(args?.ids) {
      query = `?ids=${args.ids.join(',')}`
    } else if(args?.parentId) {
      query = `?parentId=${args.parentId}`
    } else {
      const redisKey = endpoint
      const redisData = await new Promise(resolve => {
        redisClient.get(redisKey, async (err, cache) => {
          if(err) console.log(err)
          else {
            resolve(cache)
          }
        })
      })
      if(redisData) {
        redisClient.set(redisKey, redisData)
        const data = JSON.parse(redisData)
        return data
      } else {
        const response = await instance.get(`${endpoint}${query}`)
        const { data } = response
        redisClient.set(redisKey, JSON.stringify(data))
        return data
      }
    }

    const response = await instance.get(`${endpoint}${query}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports = getAdministrativeAreas