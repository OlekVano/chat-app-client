import * as styles from './Btn1.module.scss'

import Link from 'next/link'

const Btn1 = ({ text, func={}, href='' }) => {
  if (href === '') return <input type='button' value={text} onClick={func} className={styles.main} />
  return <Link href={href}><input type='button' value={text} href='./rooms/create' className={styles.main} /></Link>
}

export default Btn1