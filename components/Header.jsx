import * as styles from './Header.module.scss'

import Image from 'next/image'
import Link from 'next/link'

import daturaString from '../public/images/daturaString.png'

const Header = () => {
  return (
    <div className={styles.header}>
    	<div className={styles.logoContainer}>
				<Link href='./'>
					<div>
    	  		<Image src={daturaString}
    	  		  height='100%'
    	  		  width='100%'
    	  		  objectFit='contain'
    	  		/>
					</div>
				</Link>
    	</div>
    </div>
  )
}

export default Header