import * as styles from './Footer.module.scss'

import menu from '../public/images/menu.png'
import join from '../public/images/join.png'
import create from '../public/images/create.png'

import FooterBtn from './FooterBtn'

const Footer = ({ path }) => {
  return (
    <div className={styles.main}>
      <FooterBtn image={menu} link='/rooms' path={path} />
      <FooterBtn image={join} link='/rooms/join' path={path} />
      <FooterBtn image={create} link='/rooms/create' path={path} />
    </div>
  )
}

export default Footer