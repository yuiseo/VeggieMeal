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
    <div className="container">
      <Head>
        <title>레시피 | 베지밀</title>
      </Head>

      <main>
        <header>
          <h1 className={styles.recipe_title}>레시피 모아 보기</h1>
        </header>
        <section>
          <Container>
            <Row className='justify-content-sm-center;align-item-sm-center'>
              <Col>
                <Button id={styles.veggie_btn} onClick={() => router.push('/recipe/veggie')}>
                  <p>채식 단계에</p>
                  <p>따른 레시피를 보여드려요</p>
                  <Image className={styles.leafy} src={leafy} alt="leafy_green" quality={100} width={70} height={70} />
                  <p>채식</p>
                </Button>
              </Col>
              <Col>
                <Button id={styles.fridge_btn} onClick={() => router.push('/recipe/fridge')}>
                  <p>원하는 재료에</p>
                  <p>따른 레시피를 보여드려요</p>
                  <Image className={styles.cooking} src={cooking} alt="cooking pan" quality={100} width={70} height={70} />
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