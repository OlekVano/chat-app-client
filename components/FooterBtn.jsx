import * as styles from './FooterBtn.module.scss'

import Image from 'next/image'
import Link from 'next/link'

const FooterBtn = ({ image, link, path }) => {
  return (
    <div className={`${styles.main} ${path === link ? styles.highlighted : ''}`}><Link href={link}><Image src={image} height='30px' objectFit='contain'></Image></Link></div>
  )
}

export default FooterBtn