const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.ADMINISTRATIVE_AREA_SERVICE_URL
})

const getAdministrativeAreas = async (args) => {
  try {
    let query = ''
    if(args?.ids) {
      query = `?ids=${args.ids.join(',')}`
    } else if(args?.parentId) {
      query = `?parentId=${args.parentId}`
    }
    const response = await instance.get(`/api/administrative_areas${query}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports = getAdministrativeAreas