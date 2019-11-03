const path = require("path")
const startcase = require("lodash.startcase")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `Mdx`) return

  const { createNodeField } = actions
  const parent = getNode(node.parent)
  let value = parent.relativePath.replace(parent.ext, "")
  if (value === "index") {
    value = ""
  }

  createNodeField({
    name: `slug`,
    node,
    value: `/${value}`,
  })

  createNodeField({
    name: "id",
    node,
    value: node.id,
  })

  createNodeField({
    name: "title",
    node,
    value: node.frontmatter.title || startcase(node.name),
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              id
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.log(result.errors)
    return
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug ? node.fields.slug : "/",
      component: path.resolve("./src/templates/doc.js"),
      context: {
        id: node.fields.id,
      },
    })
  })
}
