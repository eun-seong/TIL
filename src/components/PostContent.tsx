import { PropsWithChildren } from 'react'

import classes from './PostContent.module.scss'

export default function PostContent({ children }: PropsWithChildren) {
  return <div className={classes['post-content']}>{children}</div>
}
