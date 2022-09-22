import Head from "next/head";
import Image from "next/image";
import styles from 'styles/Fridge.module.scss';

export default function Fridge() {
  return (
    <>
      <Head>
        <title>냉장고 레시피 | 베지밀</title>
      </Head>
      <main>
        <header className={styles.header}>
          <Image src="/cooking.png" width={50} height={50} />
          <h1 className={styles.main_title}>냉장고를 부탁해</h1>
        </header>
        <section className={styles.main_intro}>
          <p>지금 냉장고 속에 있는 재료나, 원하는 재료를 선택해주세요! </p>
          <p>그에 맞는 레시피를 보여드릴게요. </p>
        </section>
        <section className={styles.choice}></section>
      </main>
    </>
  )
}