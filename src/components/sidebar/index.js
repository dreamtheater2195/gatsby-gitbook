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
    "& ul": {
      padding: 0,
      margin: 0,
    },
    "& > ul": {
      mt: 4,
    },
    ".item": {
      listStyle: "none",
      padding: 0,
    },
    ".firstLevel .item": {
      '.item': {
        ml: 2,
        borderLeft: '1px solid transparent',
        borderLeftColor: 'lightgray',
      }
    },
    ".active > a": {
      backgroundColor: "secondary",
    },
    "& a": {
      display: "flex",
      alignItems: 'center',
      justifyContent: 'space-between',
      color: "#fff",
      textDecoration: "none",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      width: "100%",
      py: 2,
      px: 3,
      "&:hover": {
        backgroundColor: "secondary",
      },
    },
    ".collapser": {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      mt: 2,
      zIndex: 1,
      "& svg": {
        fill: '#fff',
      }
    }
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
      <ul>
        <Tree edges={data.allMdx.edges}></Tree>
      </ul>
    </Sidebar>
  )
}
