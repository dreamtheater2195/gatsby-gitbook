import React, { useState, useContext } from "react"
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
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
          Roboto, "Helvetica Neue", Arial, sans-serif;
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

export const Context = React.createContext({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
})
export const useAppContext = () => useContext(Context)

const Root = ({ children }) => {
  const [open, setOpen] = useState(false)
  const context = {
    open,
    setOpen,
    toggleOpen: () => setOpen(!open),
  }
  return <Context.Provider value={context}>{children}</Context.Provider>
}

const Page = ({ children, location }) => {
  const data = useStaticQuery(query)
  const { title, description } = data.site.siteMetadata
  return (
    <Layout location={location}>
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

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)
