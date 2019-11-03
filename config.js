module.exports = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://gatsby-gitbook.netlify.com",
  },
  header: {
    logo:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/favicon.png",
    logoLink: "https://gatsby-gitbook.netlify.com",
    title: "Gatsby Gitbook Boilerplate",
    githubUrl: "https://github.com/dreamtheater2195/gatsby-gitbook",
    helpUrl: "",
    tweetText: "",
    links: [{ text: "", link: "" }],
  },
  sidebar: {
    forcedNavOrder: ["/introduction", "/codeblock"],
    links: [],
    ignoreIndex: true,
  },
  siteMetadata: {
    title: "Gatsby Gitbook",
    description: "Documentation built with mdx",
    ogImage: null,
    docsLocation:
      "https://github.com/dreamtheater2195/gatsby-gitbook/tree/master/content",
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
  },
}
