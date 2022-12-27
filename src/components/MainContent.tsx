import { PropsWithChildren } from 'react'
import { styled } from 'styles/theme'

export default function MainContent({ children }: PropsWithChildren) {
  return (
    <ContentWapper>
      <main>{children}</main>
    </ContentWapper>
  )
}

const ContentWapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  '& main': {
    width: '100%',
    boxSizing: 'content-box',
    maxWidth: '$contentWidth',
    padding: '20px 20px 50px 20px',
  },
})
