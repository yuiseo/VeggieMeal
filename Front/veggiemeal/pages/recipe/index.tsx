import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/Home.module.scss'
import Button from 'react-bootstrap/Button';
import leafy from '/public/leafy_green.png';
import cooking from '/public/cooking.png';

export default function Recipe() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>레시피 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header>
          <h1>레시피 모아보기</h1>
        </header>
        <section>
          <Button
            className='btn'
            onClick={() => router.push('/recipe/veggie')}>
            <a>채식 단계</a>
            <a>에 따른 레시피를 보여드려요</a>
            <Image
              src={leafy}
              alt="leafy_green"
            />
            <h2>채식</h2>
          </Button>
          <Button
            className="btn"
            onClick={() => router.push('/recipe/fridge')}>
            <a>원하는 재료</a>
            <a>에 따른 레시피를 보여드려요</a>
            <Image
              src={cooking}
              alt="cooking pan"
            />
            <h2>냉장고</h2>
          </Button>
        </section>
      </main>
    </div >
  )
}