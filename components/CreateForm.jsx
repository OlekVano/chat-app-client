import * as styles from './JoinCreateForm.module.scss'

import { API_URL } from '../consts'

import Btn1 from './Btn1'

const CreateForm = ({ socket, joinRooms, addRoom }) => {
  const randomKey = (len) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < len; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  const createRoom = async () => {
    const password = document.getElementById('password-input').value.trim()

    const url = `${API_URL}/rooms/create`

    const json = {
      password: password
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
    
    if (res.status !== 200) return 
    
    const id = (await res.json())._id
    joinRooms(socket, [{id: id, password: password}])
    addRoom({id: id, password: password, name: id, messages: [], key: randomKey(12)})
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputName}>Password</div>
      <input id='password-input' className={styles.input}
      	spellCheck='false'
      	autoCapitalize='false'
      	autoComplete='false'
      	autoCorrect='false'
      	type='text'>
      </input>
      <div className={styles.buttonContainer}>
				<Btn1 text='Create' func={async () => await createRoom()} />
      </div>
    </form>
  )
}

export default CreateForm