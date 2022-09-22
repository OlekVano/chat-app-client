import * as styles from './RoomHeader.module.scss'

import keyImg from '../public/images/key.png'
import leaveImg from '../public/images/leave.png'

import Image from 'next/image'

const RoomHeader = ({ leaveRoom, socket, id, copyKey }) => {
  return (
    <div className={styles.main} >
      <div className={styles.btnContainer} onClick={copyKey}>
        <Image 
          src={keyImg}
          objectFit='contain'
        >
        </Image>
      </div>
      <div className={styles.btnContainer} onClick={() => leaveRoom(socket, id)}>
        <Image 
          src={leaveImg}
          objectFit='contain'
        >
      </Image>
      </div>
    </div>
  )
}

export default RoomHeader