import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from 'styles/Fridge.module.scss';
import SelectBox  from "components/SelectBox";
import RecipeList from "components/RecipeList";
import { useQuery } from "react-query";
import {fridgeIngre} from 'states/fridge';
import { useRecoilState } from "recoil";
import dynamic from 'next/dynamic';


type FridgeProps={
  data:string[]
}

export async function getServerSideProps() {
  const res = await fetch('https://j7c205.p.ssafy.io/api/ingredient/large', {
    method:'get'
  })
  const data = await res.json()
  return { props: { data } }
}

export default function Fridge({data}:FridgeProps) {
  const [ingre, setIngre] = useRecoilState<any>(fridgeIngre);
  const [searchItem, setSearchItem] = useState<string>("");
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const cat01 = data;
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [reset, setReset] = useState<string>();

  useEffect(()=>{
    setIsBrowser(true)
  }, [])

  useEffect(()=>{
  }, [isSelect01])

  // useEffect(()=>{
  //   if(localStorage){
  //     const localItem:any = localStorage.getItem("recoil-persist");
  //     setIngre(JSON.parse(localItem).ingre)
  //   }
  // }, [])

  const {data:cat02} = useQuery(['cat02', isSelect01], async ()=>{
    const res = await fetch(`https://j7c205.p.ssafy.io/api/ingredient/medium?large=${isSelect01}`)
    const data = await res.json()
    return data
  });
  const {data:cat03} = useQuery(['cat03', isSelect02], async ()=>{
    const res = await fetch(`https://j7c205.p.ssafy.io/api/ingredient/name?medium=${isSelect02}`)
    const data = await res.json()
    return data
  });
  const {data:recipe_list} = useQuery(['recipe_list', ingre], async() => {
    // const ingre_list = ingre?.reduce((acc:any, cur:any) => { return acc += `ingredient=${cur}`}, "")
    const res = await fetch(`https://j7c205.p.ssafy.io/api/recipe/ingredient?ingredient=${ingre}`)
    const data = await res.json()
    return data
  }, {
    enabled: Boolean(ingre.length)
  })
  const {data:isIn} = useQuery(['isIn', searchItem], async() => {
    const res = await fetch(`https://j7c205.p.ssafy.io/api/ingredient?keyword=${searchItem}`)
    const data = await res.json()
    return data
  })

  function isIngre(item: string) {
    if(ingre.length < 3){
      if (!ingre?.includes(item)) {
        if (ingre) {
          setIngre([...ingre, item])
        } else {
          setIngre([item])
        }
      } else if (ingre?.includes(item)) {
        alert("이미 선택하신 재료입니다.")
      }
    }else{
      alert("재료는 3개 이상 추가할 수 없습니다.")
    }
  }

  function removeIngre(item: string) {
    setIngre(ingre?.filter((ing:any) => ing !== item))
  }
  return (
    <>
    { isBrowser ?
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
            <p>지금 냉장고 속에 있는 재료나, 원하는 재료를 <strong>3개까지만</strong> 선택해주세요! </p>
            <p>그에 맞는 레시피를 보여드릴게요. </p>
          </section>
          <section className={styles.main_intro_mobile}>
            <p>지금 냉장고 속에 있는 재료나, 원하는 재료를</p>
            <p><strong>3개까지만</strong> 선택해주세요! </p>
            <p>그에 맞는 레시피를 보여드릴게요. </p>
          </section>

          <section className={styles.choice}>
            <div className={styles.ingre_div}>
              {ingre ? ingre.map((item:any, index:any) => 
              <div key={index} className={styles.choice_ingre}>
                <span>{item}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16"
                onClick={()=>{removeIngre(item)}} style={{cursor:'pointer'}}>
                  <path stroke="white" strokeWidth="1" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </div>) : null}
            </div>
          </section>
          <section className={styles.search}>
            <form className={styles.form} onSubmit={(e) => {
              e.preventDefault();
              if (isIn) {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#5C5ACD" className="bi bi-search" viewBox="0 0 16 16"
              style={{cursor:'pointer'}}>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </form>
          </section>
          <section className={styles.category_sec_web}>
            <div className={`${styles.category} me-3`}>
              <p className={styles.category_title}>대분류</p>
              <ul className={styles.ingre_ul}>
                {cat01?.map((item:string, index:number) => <li key={index} className={isSelect01 === item ? `${styles.choice_li}` : 'not_choice'}
                  onClick={() => { setIsSelect01(item) }}>{item}</li>)}
              </ul>
            </div>
            <div className={`${styles.category} me-3`}>
              <p className={styles.category_title}>중분류</p>
              <ul className={styles.ingre_ul}>
                {cat02?.map((item:string, index:number) => <li key={index} className={isSelect02 === item ? `${styles.choice_li}` : 'not_choice'}
                  onClick={() => { setIsSelect02(item) }}>{item}</li>)}
              </ul>
            </div>
            <div className={styles.category}>
              <p className={styles.category_title}>소분류</p>
              <ul className={styles.ingre_ul}>
                {cat03?.map((item:string, index:number) => <li key={index} className={isSelect03 === item ? `${styles.choice_li}` : 'not_choice'}
                  onClick={() => {
                    setIsSelect03(item)
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
            {ingre.length !== 0 && recipe_list?.length !== 0 ? <>
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
                    {recipe_list ? 
                      recipe_list.map((item:{
                        'cal':string,
                        'img':string,
                        'name':string,
                        'recipeId':number,
                        'time':string
                      }, index:string) =><RecipeList key={index} {...item}></RecipeList>)
                    :
                    null
                    }
                  </div>
              </> : null}
            {ingre.length === 0 ? <div className={styles.noVeggie}>
              <Image src="/think.png" width={150} height={150} quality={100} />
              <p> 어떤 재료의 레시피를 원하시나요? </p>
            </div> : null}
            {ingre.length !== 0 && recipe_list?.length === 0 ? (
              <div className={styles.noVeggie}>
                <Image src="/sorry.png" width={150} height={150} />
                <p>선택하신 재료들로 만들 수 있는 요리가 없어요.</p>
              </div>
  )
            :  null}
          </section>
        </main>
      </>
    :
  null}
    </>
  )
}