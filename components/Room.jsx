import { useEffect, useState } from 'react'
import * as styles from './Room.module.scss'

const Room = ({ id, rooms, socket }) => {
  const [password, setPassword] = useState()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].id === id) {
        setPassword(rooms[i].password)
        setMessages(rooms[i].messages)
        break
      }
    }
  }, [id])

  const sendMessage = () => {
    const input = document.getElementById('message-input')
    const text = input.value.trim()

    if (text === '') return

    socket.send(JSON.stringify({
      message: text,
      id: id,
      password: password,
      from: '<Anonymous />'
    }))

    input.value = ''
  }

  return (
    <div className={styles.main}>
      <div className={styles.messagesContainer}>
        {
        messages.map(({from, text}, i) => {
          return <div className={styles.messageContainer} key={i}>
            <span className={styles.from}>{from}:</span>
            <span className={styles.text}>{text}</span>
          </div>
        })}
      </div>
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