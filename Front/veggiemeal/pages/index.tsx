import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>베지밀</title>
        <meta name="description" content="더 건강하고 더 경제적인 당신의 식사를 위해" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        안냥?
      </main>

      <footer className={styles.footer}>
        안냥?
      </footer>
    </div>
  )
}

export default Home
