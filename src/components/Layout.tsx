import { PropsWithChildren } from 'react'
import { styled } from 'styles/theme'

import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutWrapper>
      <NotFooter>
        <Header />
        <MainContent>{children}</MainContent>
      </NotFooter>
      <Footer />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled('div', {
  height: '100%',

  '&>*': {
    width: '100%',
  },
})

const NotFooter = styled('div', {
  height: 'auto',
  minHeight: '100%',
  paddingBottom: '$sizes$footerHeight',

  '&>*': {
    width: '100%',
  },
})
