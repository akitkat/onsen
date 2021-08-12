const { createRemoteFileNode } = require('gatsby-source-filesystem')
const jsonHotels = require('../../../static/data/hotels.json')

module.exports = async ({
  actions: { createNode },
  createNodeId,
  getCache,
  store,
}) => {
  const hotels = JSON.parse(JSON.stringify(jsonHotels)).result_

  await Promise.all(
    hotels.map(async (hotel) => {
      try {
        const fileNode = await createRemoteFileNode({
          url: hotel.image,
          getCache,
          store,
          createNode,
          createNodeId,
          name: 'hotelInfoItem',
        })
        fileNode.internal.content = hotel.image
        return fileNode
      } catch (e) {
        console.error(e)
      }
    })
  )
}
