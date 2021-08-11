const { createRemoteFileNode } = require('gatsby-source-filesystem')
const jsonHotels = require('../../../static/data/hotels.json')

module.exports = async ({
  actions: { createNode },
  node,
  createNodeId,
  cache,
  store,
}) => {
  const hotels = JSON.parse(JSON.stringify(jsonHotels)).result_

  await Promise.all(
    hotels.map(async (hotel) => {
      const fileNode = await createRemoteFileNode({
        url: hotel.image,
        cache,
        store,
        createNode,
        createNodeId,
        name: 'hotelInfoItem',
      })
      fileNode.internal.content = hotel.image

      if (fileNode) {
        node.localFile___NODE = fileNode.id
      }

      return fileNode
    })
  )
}
