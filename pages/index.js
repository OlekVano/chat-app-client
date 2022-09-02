import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>chat-app</title>
        <meta name='description' content='Anonymous chat application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>Hello</div>
      </main>
    </div>
  )
}
