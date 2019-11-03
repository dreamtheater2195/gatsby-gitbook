/** @jsx jsx */
import { css, jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Tree from "./tree"

const Sidebar = styled("aside")(props =>
  css({
    width: "100%",
    height: props.open ? "100vh" : "1px",
    position: "sticky",
    top: "0px",
    overflow: "auto",
    bg: "text",
    transition: "height 200ms ease-out",
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
      <ul
        sx={{
          padding: 0,
          margin: 0,
          mt: 4,
        }}
      >
        <Tree edges={data.allMdx.edges}></Tree>
      </ul>
    </Sidebar>
  )
}
