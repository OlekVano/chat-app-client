import * as styles from './Room.module.scss'

import { useEffect, useState, useRef } from 'react'

import Messages from './Messages'
import RoomHeader from './RoomHeader'
import Btn2 from './Btn2'

const Room = ({ id, rooms, socket, encrypt, leaveRoom }) => {
  const [password, setPassword] = useState()
  const [messages, setMessages] = useState([])
  const [key, _setKey] = useState(null)

  const keyRef = useRef(key)
  const setKey = (data) => {
    keyRef.current = data
    _setKey(data)
  }

  const copyKey = () => {
    navigator.clipboard.writeText(key)
  }

  useEffect(() => {
    const eventHandler = (event) => {
      if (event.key !== 'Enter') return
      sendMessage()
    }

    const input = document.getElementById('message-input')

    input.addEventListener('keypress', eventHandler)
    return () => {
      input.removeEventListener('keypress', eventHandler)
    }
  })

  useEffect(() => {
    const room = rooms.find(e => e.id === id)
    setPassword(room.password)
    setMessages(room.messages)
    setKey(room.key)

    const input = document.getElementById('message-input')
    input.focus()
  }, [id])

  const sendMessage = () => {
    if (key === null) return

    const input = document.getElementById('message-input')
    const text = input.value.trim()

    if (text === '' || text === null) return

    socket.send(JSON.stringify({
      action: 'messageSend',
      message: encrypt(text, key),
      id: id,
      password: password,
      from: '<Anonymous />'
    }))

    input.value = ''
  }

  return (
    <div className={styles.main}>
      <RoomHeader roomName={id} leaveRoom={leaveRoom} socket={socket} id={id} copyKey={copyKey} />
      <Messages messages={messages} />
      <div className={styles.inputs}>
        <input id='message-input' className={styles.input}
          spellCheck='true'
          autoCapitalize='true'
          autoComplete='false'
          autoCorrect='true'
          type='text' />
        {/*<input type='button' value='Send' onClick={sendMessage} className={styles.send} />*/}
        <Btn2 func={sendMessage} text='Send' />
      </div>
    </div>
  )
}

export default Room