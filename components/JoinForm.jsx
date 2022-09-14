import * as styles from './JoinCreateForm.module.scss'

import { API_URL } from '../consts'

import Btn1 from './Btn1'

const JoinForm = ({ socket, joinRooms, addRoom }) => {
  const joinRoom = async () => {
    const id = document.getElementById('id-input').value.trim()
    const password = document.getElementById('password-input').value.trim()
    const key = document.getElementById('key-input').value.trim()

    const url = `${API_URL}/rooms/verify`

    const json = {
      rooms: [
        {
          id: id,
          password: password
        }
      ]
    }
    
    const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        "Content-type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(json) // body data type must match "Content-Type" header
    });
    
    if (res.status === 200) {
      const res_json = await res.json()
      if (res_json.length === 0 || res_json[0] !== id) return
      joinRooms(socket, [{id: id, password: password}])
      addRoom({id: id, password: password, name: id, messages: [], key: key})
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputName}>ID</div>
      <input id='id-input' className={styles.input}
      	spellCheck='false'
      	autoCapitalize='false'
      	autoComplete='false'
      	autoCorrect='false'
      	type='text'>
      </input>
      <div className={styles.inputName}>Password</div>
      <input id='password-input' className={styles.input}
      	spellCheck='false'
      	autoCapitalize='false'
      	autoComplete='false'
      	autoCorrect='false'
      	type='text'>
      </input>
      <div className={styles.inputName}>Key</div>
      <input id='key-input' className={styles.input}
      	spellCheck='false'
      	autoCapitalize='false'
      	autoComplete='false'
      	autoCorrect='false'
      	type='text'>
      </input>
      <div className={styles.buttonContainer}>
				<Btn1 text='Join' func={async () => await joinRoom()} />
      </div>
    </form>
  )
}

export default JoinForm