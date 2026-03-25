/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require('path');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {      
      # blog posts replaced with keyboardkeys contentt type
      allContentfulKeyboardKey {
        edges {
          node {
            keyId
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allContentfulKeyboardKey.edges.forEach(({ node }) => {
    createPage({
      path: `/key/${encodeURIComponent(node.keyId)}`,
      component: require.resolve('./src/templates/key-page.js'),
      context: { keyId: node.keyId },
    })
  })
}
