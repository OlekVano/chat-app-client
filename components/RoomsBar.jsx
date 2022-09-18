import { useEffect } from 'react'
import * as styles from './RoomsBar.module.scss'

import RoomsBarBtn from './RoomsBarBtn'

const RoomsBar = ({ rooms, selected_id }) => {
  return (
    <div className={styles.main} >
      <RoomsBarBtn
				text='Join Room'
        link='./join'
      />
      <RoomsBarBtn
			  text='Create Room'
        link='./create'
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