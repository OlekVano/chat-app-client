import { useEffect } from 'react'
import * as styles from './RoomsBar.module.scss'

import RoomsBarBtn from './RoomsBarBtn'

const RoomsBar = ({ rooms, selected_id }) => {
  return (
    <div className={`${styles.main} ${selected_id === '/rooms' ? styles.full : ''}`}>
      <RoomsBarBtn
				text='Join Room'
        link='./join'
        selected={selected_id === 'join'}
        id={selected_id}
      />
      <RoomsBarBtn
			  text='Create Room'
        link='./create'
        selected={selected_id === 'create'}
        id={selected_id}
      />
      <div className={styles.slider}>
        {rooms.map(({name, id}, i) => {
		      return <RoomsBarBtn
            text={name}
            link={`./${id}`}
            selected={id === selected_id}
            key={i}
          />
	      })}
      </div>
    </div>
  )
}

export default RoomsBar