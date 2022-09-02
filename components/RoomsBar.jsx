import { useEffect } from 'react'
import * as styles from './RoomsBar.module.scss'

import RoomsBarBtn from './RoomsBarBtn'

const RoomsBar = ({ rooms }) => {
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
      <div>
        {rooms.map(({name, id}, i) => {
		      return <RoomsBarBtn
            text={name}
            link={`./${id}`}
            /*key={rooms.indexOf({name: name, id: id})}*/
            key={i}
          />
	      })}
      </div>
    </div>
  )
}

export default RoomsBar