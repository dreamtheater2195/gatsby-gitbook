import React from 'react'
import Header from './header'
import styled from '@emotion/styled'
import { css } from 'theme-ui'

const Main = styled('div')(
  css({
    paddingTop: 2,
    paddingBottom: 3,
  })
)

export default ({ children }) => (
  <div>
    <Header/>
    <Main>
      {children}
    </Main>
  </div>
)
