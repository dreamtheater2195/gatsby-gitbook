/** @jsx jsx */
import { jsx, css, useColorMode } from "theme-ui"
import styled from "@emotion/styled"
import GitHubButton from "react-github-btn"
import { useStaticQuery, graphql } from "gatsby"
import { useAppContext } from "./../index"
import Link from "./link"
import Sidebar from "./sidebar"
import Twitter from "./../images/twitter"
import Help from "./../images/help"

const NavBarToggle = styled("button")(
  css({
    position: "relative",
    padding: 2,
    bg: "transparent",
    border: "1px solid",
    borderRadius: "small",
    borderColor: "text",
    cursor: "pointer",
    display: ["block", null, "none"],
  })
)

const IconBar = styled("span")(
  css({
    display: "block",
    width: "22px",
    height: "2px",
    marginTop: 1,
    borderRadius: "1px",
    backgroundColor: "text",
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
    padding: [3, null, 0],
    pl: 0,
    color: "text",
    textDecoration: "none",
  })
)

const StyledHeader = styled("header")(
  css({
    position: "relative",
    minHeight: "50px",
    borderBottom: "1px solid",
    borderBottomColor: "gray",
    bg: "background",
    padding: 3,
    zIndex: 1,
    "@media screen and (min-width: 768px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
)

const NavBarCollapse = styled("div")(props =>
  css({
    display: "block",
    overflowX: "visible",
    borderTop: props.open ? "1px solid transparent" : "none",
    boxShadow: props.open ? "inset 0 1px 0 rgba(255,255,255,.1)" : "none",
    borderColor: "lightgray",
    "@media screen and (min-width: 768px)": {
      borderTop: "none",
      boxShadow: "none",
    },
  })
)

const NavBarRight = styled("ul")(props =>
  css({
    display: props.open ? "flex" : "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
    listStyle: "none",
    "& li": {
      display: "inline-block",
    },
    "& li svg": {
      mb: "-3px",
      width: "20px",
      height: "20px",
      "& path": {
        fill: "text",
      },
      "&:hover": {
        opacity: 0.85,
      },
    },
    "& li a": {
      px: 2,
      py: 2,
    },
    ".githubBtn span span": {
      display: "flex",
      alignItems: "center",
    },
    "@media screen and (min-width: 768px)": {
      display: "flex",
    },
  })
)

const modes = ["light", "dark", "gray", "book"]

const Header = ({ location }) => {
  const [mode, setMode] = useColorMode()
  const { open, toggleOpen } = useAppContext()
  const cycleMode = () => {
    const i = (modes.indexOf(mode) + 1) % modes.length
    setMode(modes[i])
  }

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
    <StyledHeader>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavBarBrand to={finalLogoLink}>
          {logo.image !== "" ? (
            <Logo className="logo" src={logo.image} alt={"logo"} />
          ) : (
            <Logo className="logo" src={logoImg} alt={"logo"} />
          )}
          <div
            sx={{
              fontSize: [3, 3, 4],
            }}
            dangerouslySetInnerHTML={{ __html: headerTitle }}
          />
        </NavBarBrand>
        <NavBarToggle onClick={toggleOpen}>
          <IconBar></IconBar>
          <IconBar></IconBar>
          <IconBar></IconBar>
        </NavBarToggle>
      </div>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <NavBarCollapse open={open}>
          <div
            sx={{
              display: ["block", null, "none"],
            }}
          >
            <Sidebar location={location} open={open} />
          </div>
          <NavBarRight open={open}>
            {headerLinks.map((link, key) => {
              if (link.link && link.text) {
                return (
                  <li key={key}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: link.text }}
                    />
                  </li>
                )
              }
              return null
            })}
            {helpUrl !== "" ? (
              <li>
                <a href={helpUrl}>
                  <Help />
                </a>
              </li>
            ) : null}
            {tweetText !== "" ? (
              <li>
                <a
                  href={"https://twitter.com/intent/tweet?&text=" + tweetText}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter />
                </a>
              </li>
            ) : null}
            {githubUrl !== "" ? (
              <li
                className="githubBtn"
                sx={{
                  px: 2,
                  py: 2,
                }}
              >
                <GitHubButton
                  href={githubUrl}
                  data-show-count="true"
                  aria-label="Star on GitHub"
                >
                  Star
                </GitHubButton>
              </li>
            ) : null}
          </NavBarRight>
        </NavBarCollapse>
        <button
          title="Toggle Color Mode"
          sx={{
            appearance: "none",
            fontFamily: "inherit",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: "bold",
            border: "none",
            m: 2,
            p: 2,
            color: "text",
            bg: "gray",
            "&:focus": {
              outline: "2px solid",
            },
          }}
          onClick={cycleMode}
        >
          {mode}
        </button>
      </div>
    </StyledHeader>
  )
}
export default Header
