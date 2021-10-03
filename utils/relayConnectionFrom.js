const { idToCursor } = require('./relayCursor')

module.exports = async (first, fetchData) => {
  const limit = first + 1
  const data = await fetchData(limit)
  let { length } = data

  let hasNextPage = false
  let endCursor = null

  if(length > 0) {
    if(length > first) {
      hasNextPage = true
      data.pop()
      length--
    }

    const lastItem = data[length - 1]

    endCursor = idToCursor(lastItem._id)

    const edges = data.map(item => ({
      cursor: idToCursor(item._id),
      node: item
    }))

    const pageInfo = { hasNextPage, endCursor }

    return { edges, pageInfo }
  }

  return {
    edges: [],
    pageInfo: { hasNextPage, endCursor }
  }
}