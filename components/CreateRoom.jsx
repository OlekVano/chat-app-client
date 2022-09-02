import * as styles from '../styles/rooms.module.scss'

import CreateForm from './CreateForm'

import daturaLogo from '../public/images/daturaLogo.png'

import Image from 'next/image'

const CreateRoom = ({ socket, joinRooms, rooms, setRooms }) => {
  return (
		<div className={styles.main} >
			<div className={styles.tabImage}>
      	<Image src={daturaLogo}></Image>
      </div>
			<CreateForm socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms} />
		</div>
  )
}

export default CreateRoom