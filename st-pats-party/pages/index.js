import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const PresenceComponent = dynamic(() => import('../components/PresenceComponent'), { ssr: false});
const VideoComponent = dynamic(() => import('../components/VideoComponent'), { ssr: false});

const name = 'Welcome to St Patricks Party';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {name}
        </h1>
        <VideoComponent />
        <PresenceComponent/>
      </main>
    </div>
  )
}
