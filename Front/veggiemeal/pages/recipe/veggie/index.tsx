import Head from "next/head";
import Image from 'next/image';
import leafy from '/public/leafy_green.png';
import styles from 'styles/veggie.module.scss'

export default function Veggie() {
  return (
    <div className={styles.container}>
      <Head>
        <title>채식 레시피 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.recipe_header}>
          <h1 className={styles.recipe_title}>채식을 부탁해</h1>
          <p>채식 단계를 선택해주세요!</p>
          <p>그에 맞는 레시피를 보여드릴게요.</p>
        </header>
      </main>
    </div>
  )
}