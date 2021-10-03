
const cursorToId = cursor => {
  return new Buffer(cursor, 'base64').toString('binary')
}

const idToCursor = id => {
  return new Buffer(id.toString(), 'binary').toString('base64')
}

const timestampToCursor = time => {
  return idToCursor(time.getTime())
}

const cursorToTimestamp = (cursor) => {
  const ms = parseInt(cursorToId(cursor), 10)
  return new Date(ms)
}

module.exports = { 
  cursorToId, 
  idToCursor, 
  timestampToCursor,
  cursorToTimestamp
}