import classes from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <div>Copyright {new Date().getFullYear()}. LEE EUN SEONG </div>
        <div> All right reserved.</div>
      </div>
    </footer>
  )
}
