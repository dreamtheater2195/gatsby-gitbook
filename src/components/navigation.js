/** @jsx jsx */
import { jsx, css } from "theme-ui"
import styled from "@emotion/styled"
import Link from "./link"

const Wrapper = styled("div")(
  css({
    display: "flex",
    flexDirection: "column",
    my: 4,
  })
)

const Button = styled(Link)(
  css({
    cursor: "pointer",
    margin: 0,
    padding: 0,
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: "background",
    color: "text",
    border: "1px solid",
    borderColor: "gray",
    boxShadow: "0 3px 8px 0 rgba(116,129,141,.1)",
    textDecoration: "none",
    transition: "border .2s ease 0s",
    "&:hover": {
      color: "secondary",
      borderColor: "secondary",
      textDecoration: "none",
      ".arrow": {
        color: "text",
      },
    },
  })
)
const Arrow = styled("div")(
  css({
    color: "midgray",
    flex: "0 0 auto",
    fontSize: 4,
    transition: "color 0.2s ease 0s",
  })
)

const Title = styled("span")(
  css({
    fontSize: 2,
    fontWeight: "bold",
  })
)

const Navigation = ({ mdx, nav }) => {
  let currentIndex
  nav.forEach((el, index) => {
    if (el && el.url === mdx.fields.slug) {
      currentIndex = index
    }
  })
  const nextInfo = {}
  const previousInfo = {}
  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url
      nextInfo.title = nav[0].title
    }
    previousInfo.url = null
    previousInfo.title = null
    currentIndex = -1
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null
    previousInfo.url = null
    previousInfo.title = null
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null
    nextInfo.title = null
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null
    previousInfo.title = nav[currentIndex - 1]
      ? nav[currentIndex - 1].title
      : null
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url
    nextInfo.title = nav[currentIndex + 1].title
    if (nav[currentIndex - 1]) {
      previousInfo.url = nav[currentIndex - 1].url
      previousInfo.title = nav[currentIndex - 1].title
    }
  }
  return (
    <Wrapper>
      {previousInfo.url && currentIndex >= 0 ? (
        <Button to={nav[currentIndex - 1].url} sx={{ mb: [3, null, 0] }}>
          <Arrow sx={{ m: 0, p: 3 }} className="arrow">
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </Arrow>
          <div sx={{ m: 0, p: 3, flex: 1, textAlign: "right" }}>
            <div>
              <span sx={{ color: "midgray", fontSize: 0, lineHeight: 1.5 }}>
                Previous
              </span>
            </div>
            <div>
              <Title>{nav[currentIndex - 1].title}</Title>
            </div>
          </div>
        </Button>
      ) : null}
      {nextInfo.url && currentIndex >= 0 ? (
        <Button to={nav[currentIndex + 1].url}>
          <div sx={{ m: 0, p: 3, flex: 1 }}>
            <div>
              <span sx={{ color: "midgray", fontSize: 0, lineHeight: 1.5 }}>
                Next
              </span>
            </div>
            <div>
              <Title>
                {nav[currentIndex + 1] && nav[currentIndex + 1].title}
              </Title>
            </div>
          </div>
          <Arrow sx={{ m: 0, p: 3 }} className="arrow">
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </Arrow>
        </Button>
      ) : null}
    </Wrapper>
  )
}

export default Navigation
