import Head from "next/head";
import Image from 'next/image';

import styles from 'styles/RecipeDetail.module.scss';
import IngredientSlider from 'components/IngredientSlider';
import YoutubeList from "components/YoutubeList";
import RecipeStep from "components/RecipeStep";

import hourglass from '/public/hourglass.png';
import kakaoicon from '/public/kakaoicon.png';
import { useRouter } from 'next/router';


// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

interface YoutubeProps {
  data: any;
  recipeData: any;
}

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
// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'
// const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

let data: any;
export async function getServerSideProps() {
  if (!data) {
    const res = await fetch(
      `${YOUTUBE_SEARCH_API}?part=snippet&q=${'나물비빔밥'}&maxResults=6&key=${process.env.YOUTUBE_API_KEY}`
    );
    data = await res.json();
  }

  // const respond = await fetch(`https://j7c205.p.ssafy.io/api/recipe/id?recipeId=$`, {
  //   method: 'get'
  // })
  // const recipeData = await respond.json()
  return {
    props: {
      data,
      // recipeData
    }
  };
}
export default function RecipeDetail({ data, recipeData }: YoutubeProps) {
  const router = useRouter();
  // console.log('data', data);
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
            <div className={styles.mobile_icon_title}>
              <h1 className={styles.mobile_title}>나물비빔밥</h1>
              <img src='/kakaoicon.png' />
            </div>
            <p className={styles.mobile_description}>여기에 디스크립션이 있다고 생각하기</p>

            {/* 모바일뷰에서 없어져야 합니다 */}
            <div className={styles.web_ingredient}>
              <div className={styles.web_icon_title}>
                <h1>나물비빔밥</h1>
                <img src='/kakaoicon.png' />
              </div>
              <p>여기에 디스크립션이 있다고 생각하기</p>
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

        <section className={styles.ingredient_slider}>
          <IngredientSlider />
        </section>
        {/* 모바일 뷰에서는 재료 Compo 재료 */}
        {/* 웹 뷰에서는 재료 Compo만 */}
        <section className={styles.ingredient_section}>
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
            <Image src={hourglass} quality={100} width={40} height={40} />
            <h3>만드는 방법</h3>
          </section>
          <RecipeStep />
        </section>

        {/* 유튜브 리스트 */}
        <section className={styles.youtube_section}>
          <h1>Youtube</h1>
          <div className={styles.youtube_intro}>
            <p>만드는 법이 감이 잘 안 오신다면,</p>
            <p>아래 영상들을 참고해 보세요!</p>
          </div>
          <div className={styles.Container}>
            {data.items.map(({ id, snippet = {} }: any) => {
              const { videoId } = id;
              const { channelTitle, title, thumbnails = {} }: any = snippet;
              const { medium } = thumbnails;
              return (
                <YoutubeList key={id} channelTitle={channelTitle} title={title} high={medium} videoId={videoId}></YoutubeList>
              )
            })}
          </div>
        </section>
      </main>
    </ >
  )
}

