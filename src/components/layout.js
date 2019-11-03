import React from "react"
import Header from "./header"
import styled from "@emotion/styled"
import { css } from "theme-ui"

const Main = styled("div")(
  css({
    py: 4,
    px: 3,
  })
)

export default ({ children, location }) => (
  <div>
    <Header location={location} />
    <Main>{children}</Main>
  </div>
)
