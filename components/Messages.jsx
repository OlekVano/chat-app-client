import * as styles from './Messages.module.scss'

const Messages = ({ messages }) => {
  return (
    <div className={styles.messagesContainer} id='messagesContainer'>
      {
      messages.map(({from, text}, i) => {
        return <div className={styles.messageContainer} key={i}>
          <span className={styles.from}>{from}:</span>
          <span className={styles.text}>{text}</span>
        </div>
      })}
      </div>
  )
}

export default Messages