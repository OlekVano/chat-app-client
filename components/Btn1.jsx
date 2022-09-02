import * as styles from './Btn1.module.scss'

const Btn1 = ({ text, func={} }) => {
  return (
    <input type='button' value={text} onClick={func} className={styles.main}  />
  )
}

export default Btn1