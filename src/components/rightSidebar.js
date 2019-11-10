/** @jsx jsx */
import { jsx, css } from "theme-ui"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import config from "./../../config"

const Sidebar = styled("aside")(
  css({
    height: "100vh",
    overflow: "auto",
    position: "sticky",
    top: 0,
    pl: 4,
  })
)

const Title = styled("div")(
  css({
    color: "#9daab6",
    fontSize: 0,
    lineHeight: 1,
    fontWeight: "heading",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    py: 2,
    pl: 3,
    pr: 4,
    borderLeft: "1px solid",
    borderLeftColor: "gray",
  })
)

const ListItem = styled(({ children, to, ...props }) => (
  <li {...props}>
    <a href={to}>{children}</a>
  </li>
))(
  css({
    listStyle: "none",
    borderLeft: "1px solid",
    borderLeftColor: "gray",
    "& a": {
      display: "block",
      fontSize: 0,
      fontWeight: 500,
      color: "#5C6975",
      textDecoration: "none",
      py: 2,
      pl: 3,
      pr: 4,
      "&:hover": {
        color: "text",
      },
    },
  })
)

const RightSideBar = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            tableOfContents
          }
        }
      }
    }
  `)
  const { allMdx } = data
  let navItems
  if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
    allMdx.edges.map((item, index) => {
      if (
        item &&
        (item.node.fields.slug === location.pathname ||
          config.gatsby.pathPrefix + item.node.fields.slug ===
            location.pathname) &&
        item.node.tableOfContents.items
      ) {
        navItems = item.node.tableOfContents.items.map((innerItem, index) => {
          const itemId = innerItem.title
            ? innerItem.title.replace(/\s+/g, "").toLowerCase()
            : "#"
          return (
            <ListItem key={index} to={`#${itemId}`} level={1}>
              {innerItem.title}
            </ListItem>
          )
        })
        return null
      }
      return null
    })
  }
  if (navItems && navItems.length) {
    return (
      <Sidebar>
        <ul
          sx={{
            p: 0,
            mt: 4,
            mb: 2,
          }}
        >
          <Title>CONTENTS</Title>
          {navItems}
        </ul>
      </Sidebar>
    )
  } else {
    return null
  }
}

export default RightSideBar
