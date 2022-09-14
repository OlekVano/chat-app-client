import * as styles from '../styles/rooms.module.scss'

import JoinForm from './JoinForm'

import daturaLogo from '../public/images/daturaLogo.png'

import Image from 'next/image'

const JoinRoom = ({ socket, joinRooms, addRoom }) => {
  return (
    <div className={styles.main} >
      <div className={styles.tabImage}>
        <Image src={daturaLogo}></Image>
      </div>
      <JoinForm socket={socket} joinRooms={joinRooms} addRoom={addRoom} />
    </div>
  )
}

export default JoinRoom