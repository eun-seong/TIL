import { PropsWithChildren } from 'react'

import classes from './Layout.module.scss'

import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={classes.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
