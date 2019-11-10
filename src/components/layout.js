import React from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import RightSidebar from "./rightSidebar"
import styled from "@emotion/styled"
import { css } from "theme-ui"

const Main = styled("div")(
  css({
    flex: 1,
    minWidth: 0,
    maxWidth: "750px",
    margin: "0 auto",
    py: 4,
    px: 3,
  })
)

const Wrapper = styled.div`
  display: flex;
`

const LeftSideBarWrapper = styled("div")(
  css({
    display: ["none", null, "block"],
    minWidth: "250px",
    maxWidth: "300px",
    borderRight: "1px solid",
    borderRightColor: "gray",
  })
)

const RightSideBarWrapper = styled("div")(
  css({
    display: ["none", null, null, "block"],
    width: "250px",
  })
)

export default ({ children, location }) => (
  <div>
    <Header location={location} />
    <Wrapper>
      <LeftSideBarWrapper>
        <Sidebar location={location} open />
      </LeftSideBarWrapper>
      <Main>{children}</Main>
      <RightSideBarWrapper>
        <RightSidebar location={location} />
      </RightSideBarWrapper>
    </Wrapper>
  </div>
)
