const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, {
  polling: false
})

module.exports = bot