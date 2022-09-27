import Head from "next/head";
import Image from 'next/image';

import styles from 'styles/RecipeDetail.module.scss';
import Ingredient from 'components/Ingredient';
import YoutubeList from "components/YoutubeList";
import RecipeStep from "components/RecipeStep";

import hourglass from '/public/hourglass.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function FoodImage() {
  return (
    <>
      <div id={styles.img_box}>
        {/* <div id={styles.food_img} style={{ backgroundImage: `url(${})` }}> */}
        {/* 임시 이미지 */}
        <div id={styles.food_img}>
        </div>
      </div>
    </>
  )
}

export default function RecipeDetail() {

  return (
    <>
      <Head>
        <title>레시피 상세보기 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        {/* 모바일 뷰에서는 사진 제목 */}
        {/* 웹 뷰에서는 사진 제목 재료까지 */}
        <header className={styles.header}>
          <FoodImage />
          <div className={styles.header_title}>
            <h1 className={styles.mobile_title}>나물비빔밥</h1>

            {/* 모바일뷰에서 없어져야 합니다 */}
            <div className={styles.web_ingredient}>
              <h1>나물비빔밥</h1>
              <p>재료 목록</p>
              <p>
                나물 비빔밥에는 많은게 들어가죠 <br />
                정말로 많은게 들어가는데
                저는 사실 나물만 있는건 싫어해요 고기가 들어가는게 좋아요 <br />
                고기 대신에 버섯을 넣어도 좋습니다 짱 <br />
              </p>
            </div>
          </div>
        </header>

        {/* 모바일 뷰에서는 재료 Compo 재료 */}
        {/* 웹 뷰에서는 재료 Compo만 */}
        <section className={styles.ingredient_section}>
          <Ingredient />
          {/* 모바일 뷰에서만 나와야 합니다 */}
          <div className={styles.mobile_ingredient}>
            <p>재료 목록</p>
            <p>
              나물 비빔밥에는 많은게 들어가죠 <br />
              정말로 많은게 들어가는데
              저는 사실 나물만 있는건 싫어해요 고기가 들어가는게 좋아요 <br />
              고기 대신에 버섯을 넣어도 좋습니다 짱 <br />
            </p>
          </div>
        </section>

        {/* 만드는 방법 */}
        <section className={styles.step_section}>
          <section className={styles.step_title}>
            <Image src={hourglass} width={50} height={50} />
            <h3>만드는 방법</h3>
          </section>
          <RecipeStep />
        </section>

        {/* 유튜브 리스트 */}
        <section className={styles.youtube_section}>
          <h3>Youtube</h3>
          <div className={styles.youtube_intro}>
            <p>만드는 법이 감이 잘 안 오신다면,</p>
            <p>아래 영상들을 참고해 보세요!</p>
          </div>
          <Container>
            <Row>
              <Col>
                <YoutubeList />
              </Col>
              <Col>
                <YoutubeList />
              </Col>
              <Col>
                <YoutubeList />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </ >
  )
}