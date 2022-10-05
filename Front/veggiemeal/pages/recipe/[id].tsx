import Head from "next/head";
import Image from 'next/image';

import styles from 'styles/RecipeDetail.module.scss';
import IngredientSlider from 'components/IngredientSlider';
import YoutubeList from "components/YoutubeList";
import RecipeStep from "components/RecipeStep";
import { useState, useEffect } from 'react';
import hourglass from '/public/hourglass.png';
import { useRouter } from 'next/router';

interface YoutubeProps {
  data: any;
  recipeData: any;
  stepData: any;
}
interface FoodImgProps {
  img: string;
}
function FoodImage({ img }: FoodImgProps) {
  return (
    <>
      <div id={styles.img_box}>
        {/* <div id={styles.food_img} style={{ backgroundImage: `url(${})` }}> */}
        {/* 임시 이미지 */}
        <div style={{ backgroundImage: `url(${img})` }} id={styles.food_img}>
        </div>
      </div>
    </>
  )
}

const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'
let data: any;
let name: string;
export async function getServerSideProps(context: any) {
  const recipeId = context.query;
  // console.log('data', data)
  // console.log('id', recipeId.id)
  const respond = await fetch(`https://j7c205.p.ssafy.io/api/recipe/id?recipeId=${recipeId.id}`, {
    method: 'get'
  });
  const recipeData = await respond.json();
  // console.log(name)
  if (recipeData.recipe.name !== name || !data) {
    const res = await fetch(
      `${YOUTUBE_SEARCH_API}?part=snippet&q=${recipeData.recipe.name}만들기&maxResults=6&key=${process.env.YOUTUBE_API_KEY}`
    );
    name = recipeData.recipe.name
    data = await res.json();
    // if (!data) {
    // }
  }

  // const step = await fetch(`https://j7c205.p.ssafy.io/api/recipe/process?recipeId=${recipeId.id}`, {
  //   method: 'get'
  // });
  // const stepData = await step.json();

  return {
    props: {
      data,
      recipeData,
      // stepData,
    }
  };
}
export default function RecipeDetail({ data, recipeData }: YoutubeProps) {
  const router = useRouter();
  // console.log('data', data);
  // console.log('recipedata', recipeData)
  // const ingredientList = recipeData.ingredient.map(({ name, capacity }: any) => name + ' ' + capacity)
  return (
    <>
      <Head>
        <title>레시피 상세보기 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        {/* 모바일 뷰에서는 사진 제목 */}
        {/* 웹 뷰에서는 사진 제목 재료까지 */}
        <header className={styles.header}>
          <FoodImage img={recipeData.recipe.img} />
          <div className={styles.header_title}>
            <div className={styles.mobile_icon_title}>
              <h1 className={styles.mobile_title}>{recipeData.recipe.name}</h1>
            </div>
            <p className={styles.mobile_description}>{recipeData.recipe.description}</p>
          </div>

          {/* 모바일뷰에서 없어져야 합니다 */}
          <div className={styles.web_ingredient}>
            <div className={styles.web_icon_title}>
              <h1>{recipeData.recipe.name}</h1>
            </div>
            <p>{recipeData.recipe.description}</p>
            <p>재료 목록</p>
            <div style={{ maxWidth: '500px' }}>
              {recipeData.ingredient.map((item: any, index: string) =>
                Number(index) === recipeData.ingredient.length - 1 ?
                  <span key={index}>{item['name']} {item['capacity']}</span>
                  :
                  <span key={index}>{item['name']} {item['capacity']},&nbsp;</span>
              )}
            </div>
          </div>
        </header>

        <section className={styles.ingredient_slider}>
          <IngredientSlider ingredientList={recipeData.ingredient} />
        </section>
        {/* 모바일 뷰에서는 재료 Compo 재료 */}
        {/* 웹 뷰에서는 재료 Compo만 */}
        <section className={styles.ingredient_section}>
          {/* 모바일 뷰에서만 나와야 합니다 */}
          <div className={styles.mobile_ingredient}>
            <p>재료 목록</p>
            <div style={{ maxWidth: '500px' }}>
              {recipeData.ingredient.map((item: any, index: string) =>
                Number(index) === recipeData.ingredient.length - 1 ?
                  <span key={index}>{item['name']} {item['capacity']}</span>
                  :
                  <span key={index}>{item['name']} {item['capacity']},&nbsp;</span>
              )}
            </div>
          </div>
        </section>

        {/* 만드는 방법 */}
        <section className={styles.step_section}>
          <section className={styles.step_title}>
            <Image src={hourglass} quality={100} width={40} height={40} />
            <h3>만드는 방법</h3>
          </section>
          {recipeData.process.map((item: any, index: number) => <RecipeStep key={index} {...item} />)}
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
                <YoutubeList key={videoId} channelTitle={channelTitle} title={title} high={medium} videoId={videoId}></YoutubeList>
              )
            })}
          </div>
        </section>
      </main>
    </ >
  )
}

