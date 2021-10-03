const mysql = require('mysql')
const url = require('url')

const chunks = url.parse(process.env.MYSQL_URL, true)
const auth = chunks.auth.split(':')
const db = chunks.path.substr(1)

pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql',
  user            : auth[0],
  password        : auth[1],
  database        : db,
  port            : parseInt(chunks.port, 10)
})

module.exports = pool