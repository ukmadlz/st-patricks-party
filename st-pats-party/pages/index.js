import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.ably.io/lib/ably.min-1.js"></script>
        <script src="/ably.js"></script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to St Patricks Party
        </h1>
      </main>
    </div>
  )
}
