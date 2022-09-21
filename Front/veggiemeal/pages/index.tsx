import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Button from 'react-bootstrap/Button';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>베지밀</title>
        <meta name="description" content="더 건강하고 더 경제적인 당신의 식사를 위해" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
        <div className={styles.header_title}>
          <h1 className={styles.slogan}>더 건강하고 <br /> 더 경제적인 <br /> 당신의 식사를 위해</h1>
          <div id={styles.menu_btn}>
            <Button className="me-3">레시피 모아 보기</Button>
            <Button>물가 분석 보러 가기</Button>
          </div>
        </div>
          <div className={styles.main_gradient} />
          <div className={styles.main_img} />
        </header>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
