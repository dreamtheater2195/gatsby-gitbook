/** @jsx jsx */
import { jsx, css } from "theme-ui"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import Link from "./link"

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
    <div
      sx={{
        position: "relative",
        minHeight: "50px",
        boxShadow: "-1px 0px 4px 1px rgba(0,119,204,.4)",
        bg: "text",
        padding: 3,
        zIndex: 1,
      }}
    >
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavBarBrand to={finalLogoLink}>
          {logo.image !== "" ? (
            <Logo src={logo.image} alt={"logo"} />
          ) : (
            <Logo src={logoImg} alt={"logo"} />
          )}
          <div
            className={"headerTitle"}
            dangerouslySetInnerHTML={{ __html: headerTitle }}
          />
        </NavBarBrand>
        <NavBarToggle>
          <IconBar></IconBar>
          <IconBar></IconBar>
          <IconBar></IconBar>
        </NavBarToggle>
      </div>
    </div>
  )
}
export default Header
