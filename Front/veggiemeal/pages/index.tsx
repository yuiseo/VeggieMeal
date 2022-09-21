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
        <header>
          <h1 className={styles.slogan}>더 건강하고 <br /> 더 경제적인 <br /> 당신의 식사를 위해</h1>
          <div className={styles.main_img}>
          <Image src="/background.png" layout='fill' />
          </div>
        </header>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
