import classes from './Header.module.scss'

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes['header__title']}>EUN</div>
    </header>
  )
}
