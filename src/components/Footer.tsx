import { styled } from 'styles/theme'

export default function Footer() {
  return (
    <SFooter>
      <div>
        <div>Copyright {new Date().getFullYear()}. LEE EUN SEONG </div>
        <div> All right reserved.</div>
      </div>
    </SFooter>
  )
}

const SFooter = styled('footer', {
  padding: 15,
  color: '$gray600',
  width: '100%',
  fontSize: '0.85rem',
  height: '$footerHeight',
  position: 'relative',
  transform: 'translateY(-100%)',

  '&>div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
})
