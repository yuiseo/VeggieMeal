import styles from 'styles/RecipeList.module.scss';
import { useRouter } from 'next/router';

interface RecipeListPros {
  //bootstrap의 Col을 사용하기 위해 children을 any타입으로 지정
  children?: any;
  recipeId: number;
  name: string;
  time: string;
  category: string;
  cal: string;
  img: string;
}

export default function RecipeList({ recipeId, name, cal, time, category, img }: RecipeListPros) {
  const router = useRouter();
  return (
    <>
      <article className={styles.list_box} onClick={() => router.push(`/recipe/${recipeId}`)}>
        {/* 레시피 이미지 */}
        <div id={styles.list_img} style={{ backgroundImage: `url(${img})` }}></div>
        {/* 레시피 내용 */}
        <div id={styles.list_content}>
          <h4>{name}</h4>
          <p>{time} 소요</p>
          <p>{cal}</p>
        </div>
      </article>
    </>
  )
}