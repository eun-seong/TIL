import { styled } from 'styles/theme'

export default function Header() {
  return (
    <SHeader>
      <HeaderBox>
        <Title>EUN</Title>
      </HeaderBox>
    </SHeader>
  )
}

const SHeader = styled('header', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '50px',
  borderBottom: '1px solid $colors$gray200',
})

const HeaderBox = styled('div', {
  width: '$contentWidth',
})
const Title = styled('div', {
  fontSize: '1.2rem',
  fontWeight: 'bold',
})
