import * as styles from './Btn2.module.scss'

import Link from 'next/link'

const Btn2 = ({ text, func, href='' }) => {
  if (href === '') {
    return <input type='button' value={text} onClick={func} className={styles.main} />
  }
  return <Link href={href}><input type='button' value={text} href='./rooms/create' className={styles.main} /></Link>
}

export default Btn2