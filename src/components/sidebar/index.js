/** @jsx jsx */
import { css, jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { ExternalLink } from "react-feather"
import Tree from "./tree"
import config from "./../../../config"
const Sidebar = styled("aside")(props =>
  css({
    width: "100%",
    height: props.open ? "100vh" : "1px",
    position: "sticky",
    top: "0px",
    overflow: "auto",
    bg: "background",
    transition: "height 200ms ease-out",
  })
)

const ListItem = styled(props => (
  <li {...props}>
    <a href={props.to} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  </li>
))(
  css({
    listStyle: "none",
    "& a": {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      color: "text",
      py: 2,
      px: 3,
      "&:hover": {
        opacity: 0.85,
      },
    },
  })
)

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))(
  css({
    listStyle: "none",
    padding: "0.5rem 0",
    "& hr": {
      margin: 0,
      padding: 0,
      border: 0,
      borderBottom: "1px solid",
      borderBottomColor: "gray",
    },
  })
)

const List = styled("ul")(
  css({
    padding: 0,
    margin: 0,
    mt: 4,
  })
)

export default ({ location, open }) => {
  const data = useStaticQuery(graphql`
    query {
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
    }
  `)
  return (
    <Sidebar open={open}>
      <List>
        <Tree edges={data.allMdx.edges}></Tree>
        <Divider />
        {config.sidebar.links.map((link, key) => {
          if (link.link && link.text) {
            return (
              <ListItem key={key} to={link.link}>
                {link.text}
                <ExternalLink size={14} />
              </ListItem>
            )
          }
          return null
        })}
      </List>
    </Sidebar>
  )
}
