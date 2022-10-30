import * as styles from './RoomsBarBtn.module.scss'

import { useState } from 'react'

import Link from 'next/link'

const RoomsBarBtn = ({ text, link, selected}) => {
  return (
    <Link href={link}>
      <div className={`${styles.main} ${(selected) ? styles.selected : ''}`} >
        <div className={styles.text} >{text}</div>
      </div>
    </Link>
  )
}

export default RoomsBarBtn