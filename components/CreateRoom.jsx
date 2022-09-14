import * as styles from '../styles/rooms.module.scss'

import CreateForm from './CreateForm'

import daturaLogo from '../public/images/daturaLogo.png'

import Image from 'next/image'

const CreateRoom = ({ socket, joinRooms, addRoom }) => {
  return (
    <div className={styles.main} >
      <div className={styles.tabImage}>
        <Image src={daturaLogo}></Image>
      </div>
      <CreateForm socket={socket} joinRooms={joinRooms} addRoom={addRoom} />
    </div>
  )
}

export default CreateRoom