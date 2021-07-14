const { createRemoteFileNode } = require('gatsby-source-filesystem')

module.exports = async ({ actions: {
    createNode,
    createNodeField
  },
  node,
  createNodeId,
  cache,
  store,
  getNodesByType
}) => {
  if (node.internal.type !== `MarkdownRemark`) return

  const regex = /^<hotel-info-item.*image="(.[^"]+)".*><\/hotel-info-item>$/gm
  const tags = getNodesByType('MarkdownRemark')
  .map(e => e.rawMarkdownBody.match(regex))
  .filter(e => !!e)
  .flat()

  if (! tags) return

  const images = tags.map(e => e.match(/image="([^"]*)"/)[1])
  if (! images) return

  await Promise.all(
    images.map(async url => {
      const fileNode = await createRemoteFileNode({
        url: url,
        cache,
        store,
        createNode,
        createNodeId,
        name: 'hotelInfoItem'
      })
      fileNode.internal.content = url

      if (fileNode) {
        node.localFile___NODE = fileNode.id
      }

      return fileNode
    })
  )
}