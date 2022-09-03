import * as styles from '../styles/home.module.scss'

import Header from '../components/Header'
import Btn1 from '../components/Btn1'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import daturaLogo from '../public/images/daturaLogo.png'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Datura</title>
        <meta name='description' content='The first trully anonymous messaging app' />
        <link rel='icon' href='/images/daturaLogo.png' />
      </Head>
      <main>
        <div className='roomsPage'>
          <Header />
          <div className='roomsPageContainer'>
            <div className={`roomsPageMain ${styles.mainContainer}`}>
              <div className={styles.halfContainer} >
                <div className={styles.logoContainer}>
                  <Image src={daturaLogo}></Image>
                </div>
              </div>
              <div className={styles.halfContainer} >
                <h1 className={styles.title} >Datura</h1>
                <h2 className={styles.subtitle} >The first trully anonymous messaging app</h2>
                <Btn1 text='Try it!' href='./rooms/create' />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}