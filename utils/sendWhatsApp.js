const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.WHATSAPP_SERVICE_URL,
  headers: {
    'X-API-KEY': process.env.WHATSAPP_SERVICE_API_KEY
  }
})

const sendWhatsApp = async ({ number, message }) => {
  try {
    const response = await instance.post(`/api/send?number=${number}&message=${message}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports = sendWhatsApp