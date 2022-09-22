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
          <Image src="/cooking.png" width={150} height={150} />
          <h1>냉장고를 부탁해</h1>
        </header>
      </main>
    </>
  )
}