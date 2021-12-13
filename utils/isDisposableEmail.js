const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://open.kickbox.com'
})

const isDisposableEmail = async (email) => {
  const emailReg = /^([\w-\.]+@(([\w-]+\.)+[\w-]{2,4}))?$/
  const domain = email.match(emailReg)[2]

  const res = await instance.get(`/v1/disposable/${domain}`)
  const { disposable } = res.data
  
  return {
    email,
    domain,
    disposable
  }
}

module.exports = isDisposableEmail