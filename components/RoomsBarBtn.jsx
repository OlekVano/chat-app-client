import * as styles from './RoomsBarBtn.module.scss'

import Link from 'next/link'

const RoomsBarBtn = ({ text, link }) => {
  return (
    <Link href={link}>
      <div className={styles.main}>
        <div className={styles.text} >{text}</div>
      </div>
    </Link>
  )
}

export default RoomsBarBtn