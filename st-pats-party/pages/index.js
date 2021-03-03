import Head from 'next/head'
import dynamic from 'next/dynamic'

const PresenceComponent = dynamic(() => import('../components/PresenceComponent'), { ssr: false});
const VideoComponent = dynamic(() => import('../components/VideoComponent'), { ssr: false});

const name = 'Welcome to St Patricks Party';

export default function Home() {
  return (
    <div className="font-sans container mx-auto content-center">
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex justify-center">
          {name}
        </h1>
        <VideoComponent />
        <PresenceComponent/>
      </main>
    </div>
  )
}
