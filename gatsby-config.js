const config = require("./config")

module.exports = {
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
        ],
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/content/`,
      },
    },
  ],
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
  },
}
