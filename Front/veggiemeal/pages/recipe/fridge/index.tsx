import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from 'styles/Fridge.module.scss';
import SelectBox  from "components/SelectBox";
import RecipeList from "components/RecipeList";

export default function Fridge() {
  const [ingre, setIngre] = useState<string[]>();
  const [searchItem, setSearchItem] = useState<string>("");
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const cat01 = ['과일', '채소', '정육', '계란', '수산/건어물', '우유/유제품', '쌀/잡곡'];
  const cat02 = ['감자/고구마', '두부/콩나물/숙주나물', '상추/깻잎/쌈채소', '무/당근', '버섯', '배추/양배추/브로콜리', '시금치/나물'];
  const cat03 = ['감자', '고구마'];
  const dumidata = [
    {
      recipeId: 1,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU=',
    },
    {
      recipeId: 2,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 3,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 4,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 5,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 6,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 7,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },

  ]

  function isIngre(item: string) {
    if (!ingre?.includes(item)) {
      if (ingre) {
        setIngre([...ingre, item])
      } else {
        setIngre([item])
      }
    } else if (ingre?.includes(item)) {
      alert("이미 선택하신 재료입니다.")
    }
  }

  function removeIngre(item: string) {
    setIngre(ingre?.filter(ing => ing !== item))
  }

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
        <section className={styles.choice}>
          {ingre ? ingre.map((item, index) => 
          <div key={index} className={styles.choice_ingre}>
            <span>{item}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16"
            onClick={()=>{removeIngre(item)}}>
              <path stroke="white" strokeWidth="1" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </div>) : null}
        </section>
        <section className={styles.search}>
          <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            if (cat03.includes(searchItem)) {
              isIngre(searchItem)
            } else {
              alert('검색어가 존재하지 않습니다. 다시 검색해주세요.')
            }
            setSearchItem("")
          }}>
            <input className={styles.searchbar} placeholder="재료를 입력해주세요" value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value)
              }}></input>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#5C5ACD" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </form>
        </section>
        <section className={styles.category_sec_web}>
          <div className={`${styles.category} me-3`}>
            <p className={styles.category_title}>대분류</p>
            <ul className={styles.ingre_ul}>
              {cat01.map((item, index) => <li key={index} className={isSelect01 === String(index) ? `${styles.choice_li}` : 'not_choice'}
                onClick={() => { setIsSelect01(String(index)) }}>{item}</li>)}
            </ul>
          </div>
          <div className={`${styles.category} me-3`}>
            <p className={styles.category_title}>중분류</p>
            <ul className={styles.ingre_ul}>
              {cat02.map((item, index) => <li key={index} className={isSelect02 === String(index) ? `${styles.choice_li}` : 'not_choice'}
                onClick={() => { setIsSelect02(String(index)) }}>{item}</li>)}
            </ul>
          </div>
          <div className={styles.category}>
            <p className={styles.category_title}>소분류</p>
            <ul className={styles.ingre_ul}>
              {cat03.map((item, index) => <li key={index} className={isSelect03 === String(index) ? `${styles.choice_li}` : 'not_choice'}
                onClick={() => {
                  setIsSelect03(String(index))
                  isIngre(item)
                }}>{item}</li>)}
            </ul>
          </div>
        </section>
        <section className={styles.category_sec_mobile}>
          <SelectBox data={cat01} setState={setIsSelect01} title="대분류" />
          <SelectBox data={cat02} setState={setIsSelect02} title="중분류" />
          <SelectBox data={cat03} setState={setIsSelect03} title="소분류" another={isIngre} />
        </section>
        <section className={styles.recipe_list}>
            {ingre ?
            <>
              <div className={styles.recipe_list_title}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="#29B973" className="bi bi-circle-fill me-3" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
              </svg> */}
                <p className={styles.title_purple}>선택된 재료</p>
                <p>가 포함된 레시피 목록</p>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="#29B973" className="bi bi-circle-fill ms-3" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg> */}
                </div>
                  <div className={styles.recipe_container}>
                        {dumidata.map((item) =><RecipeList key={`recipeId`} {...item}></RecipeList>)}
                  </div>
            </> 
            :
            <div className={styles.noVeggie}>
            <Image src="/think.png" width={150} height={150} quality={100} />
            <p> 어떤 재료의 레시피를 원하시나요? </p>
          </div>
            }
        </section>
      </main>
    </>
  )
}