import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import { Global, css } from "@emotion/core"
import Layout from "./components/layout"
import normalize from "./normalize"
const style = (
  <Global
    styles={css`
      ${normalize}
      body {
        margin: 0;
        font-family: "system-ui, sans-serif";
        line-height: 1.5;
      }
    `}
  />
)

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const Page = ({ children }) => {
  const data = useStaticQuery(query)
  const { title, description } = data.site.siteMetadata
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {style}
      {children}
    </Layout>
  )
}

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)
