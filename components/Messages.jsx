import { useEffect, useState } from 'react'
import * as styles from './Messages.module.scss'

const Messages = ({ id, rooms, socket }) => {
	const [password, setPassword] = useState()

	useEffect(() => {
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].id === id) {
				setPassword(rooms[i].password)
			}
		}
	}, [])

	const sendMessage = () => {
		const text = document.getElementById('message-input').value.trim()

		socket.send(JSON.stringify({
			message: text,
			id: id,
			password: password,
			from: '<Anonymous />'
		}))
	}

  return (
    <div className={styles.main}>
			<div className={styles.messagesContainer}>
				{rooms.find((item => item.id === id)).messages.map(({from, text}, i) => {
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

export default Messages