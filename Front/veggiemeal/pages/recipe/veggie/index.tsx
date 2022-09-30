import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";
import styles from 'styles/Veggie.module.scss';
import { getVeggieRecipe } from "pages/api/getVeggieRecipe";
const RecipeList = dynamic(() => import('components/RecipeList'))
const SelectBox = dynamic(() => import('components/SelectBox'))
// import RecipeList from 'components/RecipeList';
// import SelectBox from "components/SelectBox";

import leafy from '/public/leafy_green.png';
import flexi from '/public/veggieStep/flexi.png';
import lacto from '/public/veggieStep/lacto.png';
import lactoOvo from '/public/veggieStep/lactoOvo.png';
import ovo from '/public/veggieStep/ovo.png';
import pesco from '/public/veggieStep/pesco.png';
import pollo from '/public/veggieStep/pollo.png';
import vegan from '/public/veggieStep/vegan.png';
import VeggieModal from "components/VeggieModal";
import Col from 'react-bootstrap/Col';
import { useQuery } from "react-query";

export default function Veggie() {
  const [isShow, setIsShow] = useState<boolean>(false);
  //카테고리
  const veggieCategory = ['비건', '락토 베지테리언', '오보 베지테리언', '락토 오보 베지테리언', '페스코 베지테리언', '폴로 베지테리언', '플렉시테리언']
  const veggieDict = {
    '비건':'vegan',
    '락토 베지테리언':'lacto', 
    '오보 베지테리언':'ovo', 
    '락토 오보 베지테리언':'lac_ovo',
    '페스코 베지테리언':'pesca',
    '폴로 베지테리언':'pollo',
    '플렉시테리언':'flexi'
  }
  
  const [category, setCategory] = useState<string>('채식단계');
  const [categoryName, setCategoryName] = useState<string>();
  const {data:recipe_list} = useQuery(['recipe_list', category], async ()=>{
    const res = await fetch(`https://j7c205.p.ssafy.io/api/recipe/category?category=${category}`, {
      method:'get'
  })
  const data = await res.json()
  return data
  })

  useEffect(()=>{
    for(let [step, res] of Object.entries(veggieDict)){
      if (res === category){
        setCategoryName(step)
        break
      }
    }
  }, [category])

  // select 박스 선택시에만 레시피 목록이 뜨도록 설정하기 위해 Component 분리
  function Recipes() {
    return (
      <>
        <div className={styles.veggie_list_title}>
          <h3>{'{'} </h3>
          <h3>{categoryName}</h3>
          <h3> {'}'}</h3>
          <h3>레시피 목록</h3>
        </div>
        <section className={styles.recipe_container}>
          {recipe_list?.map((item:any, index:string) => <RecipeList key={index} {...item}><Col sm={12} md={6}  /></RecipeList>)}
        </section>
      </>
    )
  }

  return (
    <>
    {isShow ? 
      <VeggieModal setShow={setIsShow} />
      : null}
      <div className={styles.container}>
        <Head>
          <title>채식 레시피 | 베지밀</title>
        </Head>

        <main className={styles.main}>
          <header className={styles.header}>
            <Image src={leafy} alt='leafy' quality={100} width={50} height={50} />
            <h1 className={styles.veggie_title}>채식을 부탁해</h1>
          </header>
          <section className={styles.veggie_intro}>
            <p>채식 단계를 선택해주세요! </p>
            <p>그에 맞는 레시피를 보여드릴게요. </p>
          </section>
          <section className={styles.pick_veggie}>
            {/* web일때 select 박스 */}
            <div className={styles.web_select}>
              <SelectBox data={veggieCategory} setState={setCategory} title={category} dict={veggieDict}  />
            </div>
            {/* 비건 단계 */}
            <div id={styles.veggie_imgs}>
              {category === 'vegan' && (<div className={styles.veggie}><Image src={vegan} alt='비건' quality={100} width={390} height={70} /></div>)}
              {category === 'lacto' && (<div className={styles.veggie}><Image src={lacto} alt='락토 베지테리언' quality={100} width={390} height={70} /></div>)}
              {category === 'ovo' && (<div className={styles.veggie}><Image src={ovo} alt='오보 베지테리언' quality={100} width={390} height={70} /></div>)}
              {category === 'lac_ovo' && (<div className={styles.veggie}><Image src={lactoOvo} alt='락토 오보 베지테리언' quality={100} width={390} height={70} /></div>)}
              {category === 'pesca' && (<div className={styles.veggie}><Image src={pesco} alt='페스코 베지테리언' quality={100} width={390} height={70} /></div>)}
              {category === 'pollo' && (<div className={styles.veggie}><Image src={pollo} alt='폴로 베지테리언' quality={100} width={390} height={70} /></div>)}
              {category === 'flexi' && (<div className={styles.veggie}><Image src={flexi} alt='플렉시테리언' quality={100} width={390} height={70} /></div>)}
              {category === '채식단계' && (<div className={styles.veggie}><Image src={flexi} alt='플렉시테리언' quality={100} width={390} height={70} /></div>)}

              {/* 모달창을 위한 물음표 */}
              <div className={styles.question} onClick={()=>{setIsShow(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#FFB500" className="bi bQquestionCircle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
              </div>
            </div>
            {/* mobile일때 select 박스 */}
            <div className={styles.mobile_select}>
              <SelectBox data={veggieCategory} setState={setCategory} title={category} dict={veggieDict} />
            </div>
          </section>
          <section id={styles.veggie_list}>
            {category != '채식단계' ? <Recipes /> : 
            <div className={styles.noVeggie}>
              <Image src="/think.png" width={150} height={150} quality={100} />
              <p> 어떤 단계의 채식 레시피를 알려드릴까요? </p>
            </div>}
          </section>
        </main>
      </div >
    </>
  )
}