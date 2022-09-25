import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/Recipe.module.scss';

import leafy from '/public/leafy_green.png';
import cooking from '/public/cooking.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export default function Recipe() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>레시피 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header>
          <h1 className={styles.recipe_title}>레시피 모아 보기</h1>
        </header>
        <section>
          <Container>
            <Row className='justify-content-sm-center;align-item-sm-center'>
              <Col>
                <Button id={styles.veggie_btn} onClick={() => router.push('/recipe/veggie')}>
                  <div>
                    <a id={styles.veggie_bold}>채식 단계</a>
                    <a>에</a>
                  </div>
                  <p>따른 레시피를 보여드려요</p>
                  <Image className={styles.leafy} src={leafy} alt="leafy_green" quality={100} width={100} height={100} />
                  <p>채식</p>
                </Button>
              </Col>
              <Col>
                <Button id={styles.fridge_btn} onClick={() => router.push('/recipe/fridge')}>
                  <div>
                    <a id={styles.fridge_bold}>원하는 재료</a>
                    <a>에</a>
                  </div>
                  <p>따른 레시피를 보여드려요</p>
                  <Image className={styles.cooking} src={cooking} alt="cooking pan" quality={100} width={100} height={100} />
                  <p>냉장고</p>
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  )
}