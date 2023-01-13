import { styled } from 'styles/theme'

export default function Home() {
  return (
    <Description>
      방문해 주셔서 감사합니다🙇‍♀️
      <br />
      블로그는 단장 중이에요🥹
      <br />
      꾸준히 만들어 나갈 예정이니, 많관부🪴
    </Description>
  )
}

const Description = styled('div', {
  textAlign: 'center',
  fontSize: '1.2rem',
  paddingTop: 50,
  lineHeight: '2rem',
})
