/** @jsx jsx */
import { jsx, css } from "theme-ui"
import { useState } from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import Link from "./link"
import Sidebar from "./sidebar"

const NavBarToggle = styled("button")(
  css({
    position: "relative",
    padding: 2,
    bg: "transparent",
    border: "1px solid transparent",
    borderRadius: "small",
    borderColor: "background",
    cursor: "pointer",
  })
)

const IconBar = styled("span")(
  css({
    display: "block",
    width: "22px",
    height: "2px",
    marginTop: 1,
    borderRadius: "1px",
    backgroundColor: "background",
    "&:first-of-type": {
      marginTop: 0,
    },
  })
)

const Logo = styled("img")(
  css({
    width: "40px",
    mr: 3,
    display: "inline-block",
  })
)

const NavBarBrand = styled(Link)(
  css({
    display: "flex",
    alignItems: "center",
    lineHeight: 1.5,
    fontSize: 3,
    padding: 3,
    pl: 0,
    color: "#fff",
    textDecoration: "none",
  })
)

const Header = ({ location }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  const data = useStaticQuery(graphql`
    query headerTitleQuery {
      site {
        siteMetadata {
          headerTitle
          githubUrl
          helpUrl
          tweetText
          logo {
            link
            image
          }
          headerLinks {
            link
            text
          }
        }
      }
    }
  `)
  const logoImg = require("./../images/logo.svg")
  const {
    site: {
      siteMetadata: {
        headerTitle,
        githubUrl,
        helpUrl,
        tweetText,
        logo,
        headerLinks,
      },
    },
  } = data
  const finalLogoLink = logo.link !== "" ? logo.link : "/"
  return (
    <header
      sx={{
        position: "relative",
        minHeight: "50px",
        boxShadow: "-1px 0px 4px 1px rgba(255,255,255,.4)",
        bg: "text",
        padding: 3,
        zIndex: 1,
      }}
    >
      <div
        className="navBarHeader"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavBarBrand className="navBarBrand" to={finalLogoLink}>
          {logo.image !== "" ? (
            <Logo className="logo" src={logo.image} alt={"logo"} />
          ) : (
            <Logo className="logo" src={logoImg} alt={"logo"} />
          )}
          <div
            className="headerTitle"
            dangerouslySetInnerHTML={{ __html: headerTitle }}
          />
        </NavBarBrand>
        <NavBarToggle className="navBarToggle" onClick={toggleOpen}>
          <IconBar></IconBar>
          <IconBar></IconBar>
          <IconBar></IconBar>
        </NavBarToggle>
      </div>
      <div
        className="navBarCollapse"
        sx={{
          display: "block",
          overflowX: "visible",
          borderTop: open ? "1px solid transparent" : 'none',
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.1)",
          borderColor: "lightgray",
        }}
      >
        <div
          sx={{
            display: "block",
            "@media (min-width: 768px)": {
              display: "none",
            },
          }}
        >
          <Sidebar location={location} open={open} />
        </div>
      </div>
    </header>
  )
}
export default Header
