import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const PresenceComponent = dynamic(() => import('../components/PresenceComponent'), { ssr: false});
const VideoComponent = dynamic(() => import('../components/VideoComponent'), { ssr: false});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to St Patricks Party
        </h1>
        <VideoComponent />
        <PresenceComponent/>
      </main>
    </div>
  )
}
