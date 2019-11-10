/** @jsx jsx */
import React from "react" // eslint-disable-line
import { jsx, css } from "theme-ui"
import styled from "@emotion/styled"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import Link from "../components/link"
import Navigation from "../components/navigation"
import config from "./../../config"

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        docsLocation
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
        title
      }
      parent {
        ... on File {
          relativePath
        }
      }
      body
      frontmatter {
        metaTitle
        metaDescription
      }
    }
  }
`
const Edit = styled(Link)(
  css({
    fontSize: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    px: 3,
    py: 1,
    backgroundColor: "background",
    color: "text",
    border: "1px solid rgb(211, 220, 228)",
    borderRadius: "small",
    boxShadow: "rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;",
    textDecoration: "none",
    "& img": {
      width: "20px",
      mr: 2,
    },
  })
)
export default props => {
  const {
    mdx,
    allMdx,
    site: {
      siteMetadata: { docsLocation },
    },
  } = props.data

  const gitHub = require("./../images/github.svg")

  const forcedNavOrder = config.sidebar.forcedNavOrder
  const navItems = allMdx.edges
    .map(({ node }) => node.fields.slug)
    .filter(slug => slug !== "/")
    .sort()
    .reduce(
      (acc, cur) => {
        if (forcedNavOrder.find(url => url === cur)) {
          return { ...acc, [cur]: [cur] }
        }

        const prefix = cur.split("/")[1]

        if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] }
        } else {
          return { ...acc, items: [...acc.items, cur] }
        }
      },
      { items: [] }
    )

  const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur])
    }, [])
    .concat(navItems.items)
    .map(slug => {
      const { node } = allMdx.edges.find(
        ({ node }) => node.fields.slug === slug
      )

      return { title: node.fields.title, url: node.fields.slug }
    })

  //meta
  const metaTitle = mdx.frontmatter.metaTitle
  const metaDescription = mdx.frontmatter.metaDescription
  let canonicalUrl = config.gatsby.siteUrl
  canonicalUrl =
    config.gatsby.pathPrefix !== "/"
      ? canonicalUrl + config.gatsby.pathPrefix
      : canonicalUrl
  canonicalUrl = canonicalUrl + mdx.fields.slug
  return (
    <>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {metaTitle ? (
          <meta property="twitter:title" content={metaTitle} />
        ) : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div
        className="titleWrapper"
        sx={{
          display: "flex",
          alignItems: ["flex-start", null, "center"],
          flexDirection: ["column", null, "row"],
          justifyContent: ["flex-start", null, "space-between"],
          pb: [3, null, 4],
          borderBottom: "1px solid",
          borderColor: "gray",
          mb: 3,
        }}
      >
        <h1
          sx={{
            pl: 3,
            mt: 0,
            mb: [null, null, 0],
            borderLeft: "2px solid",
            borderColor: "text",
          }}
          className="title"
        >
          {mdx.fields.title}
        </h1>
        <Edit to={`${docsLocation}/${mdx.parent.relativePath}`}>
          <img src={gitHub} alt="Github logo" /> Edit on GitHub
        </Edit>
      </div>
      <MDXRenderer children={mdx.body} />
      <Navigation mdx={mdx} nav={nav} />
    </>
  )
}
