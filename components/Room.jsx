import { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import * as styles from './Room.module.scss'

import keyImg from '../public/images/key.png'

import Image from 'next/image'

const Room = ({ id, rooms, socket }) => {
  const [password, setPassword] = useState()
  const [messages, setMessages] = useState([])
  const [key, _setKey] = useState(null)

  const keyRef = useRef(key)
  const setKey = (data) => {
    keyRef.current = data
    _setKey(data)
  }

  useEffect(() => {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].id === id) {
        setPassword(rooms[i].password)
        setMessages(rooms[i].messages)
        setKey(rooms[i].key)
        break
      }
    }
  }, [id])



  const encrypt = (text, key) => {
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
    const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
    const applyKeyToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
  
    return text
      .split('')
      .map(textToChars)
      .map(applyKeyToChar)
      .map(byteHex)
      .join('');
  };

  const copyKey = () => {
    navigator.clipboard.writeText(keyRef.current)
  }

  const sendMessage = () => {
    if (key === null) return

    const input = document.getElementById('message-input')
    const text = input.value.trim()

    if (text === '' || text === null) return

    socket.send(JSON.stringify({
      message: encrypt(text, key),
      id: id,
      password: password,
      from: '<Anonymous />'
    }))

    input.value = ''
  }

  return (
    <div className={styles.main}>
      <div className={styles.keyContainer} onClick={copyKey}>
        <Image 
          src={keyImg}
          objectFit='contain'
        >
        </Image>
      </div>
      <Messages messages={messages} />
      <div className={styles.inputs}>
        <input id='message-input' className={styles.input}
          spellCheck='true'
          autoCapitalize='true'
          autoComplete='false'
          autoCorrect='true'
          type='text'>
        </input>
        <input type='button' value='Send' onClick={sendMessage} className={styles.send} />
      </div>
    </div>
  )
}

export default Room