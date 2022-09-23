import Head from "next/head";
import styles from 'styles/Cart.module.scss';
import Btn from 'components/Button';

export default function Cart() {
  return (
    <>
      <Head>
        <title>장바구니 | 베지밀</title>
      </Head>
      <main className={styles.main}>
        <Btn content="test입니다" bgColor="black" textSize="large"></Btn>
      </main>
    </>
  )
}