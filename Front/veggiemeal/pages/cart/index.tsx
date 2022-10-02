import Head from "next/head";
import styles from 'styles/Cart.module.scss';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import Button from 'components/Button';
import Mart from 'components/Mart';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import "swiper/css"; //basic
import { useQueries, UseQueryResult } from "react-query";
import {cart} from 'states/cart';
import { useRecoilState } from "recoil";



export default function Cart() {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [mart, setMart] = useState<string>("none");
  const [ingre, setIngre] = useRecoilState<any>(cart);
  const [emartList, setEmartList] = useState<(string | number)[][]>();
  const [emartPrices, setEmartPrices] = useState<number>(calPrice(emartList));
  const [hpList, setHpList] = useState<(string | number)[][]>();
  const [hpPrices, setHpPrices] = useState<number>(calPrice(hpList));
  const [cheaper, setCheaper] = useState<string>();
  const [activeKey, setActiveKey] = useState<number[]>();
  const [isIn, setIsIn] = useState<boolean>(false);
  function isInCheck(mart:any, value:any){
    mart?.map((item:(string|number)[]) => {
      if(item[0] === value){
        setIsIn(true)
        return true
      }
    })
    return false
  }
  const ingreE = useQueries(
    ingre?.map((ing:any) => {
      return {
        queryKey: [`emart_${ing[0]}`, ing[0]],
        queryFn: async () => {
          const res = await fetch(`https://j7c205.p.ssafy.io/api/mart?ingredientId=${ing[0]}&mart=0`)
          const data = await res.json()
          return data
        }
      }
    }) ?? []
  )
  const ingreH = useQueries(
    ingre?.map((ing:any) => {
      return {
        queryKey: [`homeplus_${ing[0]}`, ing[0]],
        queryFn: async () => {
          const res = await fetch(`https://j7c205.p.ssafy.io/api/mart?ingredientId=${ing[0]}&mart=1`)
          const data = await res.json()
          return data
        }
      }
    }) ?? []
  )

  function calPrice(data:(string | number)[][] | undefined){
    if(data !== undefined){
        let result = data?.reduce((acc, item)=> acc += Number(item[1]), 0)
        return result
    }else{
        return 0
    }
  }

  function whatIsCheaper(emart:number | undefined, hp:number | undefined){
    if(emart !== undefined && hp !== undefined){
      if(emart < hp){
        return "emart"
      } else if (emart > hp){
        return "homeplus"
      }else{
        return "same"
      }
    }
  }
  useEffect(()=>{
    setIsBrowser(true)
  }, [])

  useEffect(()=>{
    let result = calPrice(emartList);
    setEmartPrices(result)
    setCheaper(whatIsCheaper(result, hpPrices))
  }, [emartList])

  useEffect(()=>{
    let result = calPrice(hpList);
    setHpPrices(result)
    setCheaper(whatIsCheaper(emartPrices, result))
  }, [hpList])

  function ProductLst(productList:any, idx:number){
    const product:any = productList[idx].data;
    return(
      <>
      {product.map((res:any, index:any) => <div key={index}  className={styles.ingre_list}>
      <div style={{display:'flex'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5C5ACD" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10px" fontWeight="bold">{index+1}</text>
        </svg>
          {/* itemName으로 추후 수정! */}
          <p>{res['ingreName']}</p>
        </div>
        <div className={styles.ingre_price}>
          {/* itemPrice로 추후 수정! */}
          <p>{"7500".replace(/\B(?=(\d{3})+(?!\d))/g, ',')+"원"}</p>
          {mart === 'emart' ? (
            emartList?.includes([res['ingreName'], "7500"])
             ? <>{/* 선택했을 때 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#29B973" className="bi bi-check-circle" viewBox="0 0 16 16"
           onClick={()=>{
            let isIn = [res['ingreName'], 7500]
            setEmartList(emartList?.filter((item) => item !== isIn))
               }}>
             <circle cx="8" cy="8" r="8" fill="white"/>
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
             <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
           </svg></> : <> {/* 선택 안 했을 때 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#29B973" className="bi bi-circle" viewBox="0 0 16 16"
          onClick={()=>{
            if(emartList){
              setEmartList([...emartList, [res['ingreName'], 7500]])
            }else{
            setEmartList([[res['ingreName'], 7500]])
          }}}>
            <circle cx="8" cy="8" r="8" fill="white"/>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          </svg></>
          ) : (
            hpList?.includes([res['ingreName'], "7500"]) ? <>{/* 선택했을 때 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#29B973" className="bi bi-check-circle" viewBox="0 0 16 16"
           onClick={()=>{
            let isIn = [res['ingreName'], 7500]
            setHpList(hpList?.filter((item) => item !== isIn))
           }}>
             <circle cx="8" cy="8" r="8" fill="white"/>
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
             <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
           </svg></> : <> {/* 선택 안 했을 때 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#29B973" className="bi bi-circle" viewBox="0 0 16 16"
          onClick={()=>{
            if(hpList){
              setHpList([...hpList, [res['ingreName'], 7500]])
            }else{
            setHpList([[res['ingreName'], 7500]])
          }}}>
            <circle cx="8" cy="8" r="8" fill="white"/>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          </svg></>
          )}
        </div>
    </div>)
    }
      </>
    )
  }

  return (
    <>
    {isBrowser?
    <>
      <Head>
        <title>장바구니 | 베지밀</title>
      </Head>
      <main className={`main ${styles.cart_main}`}>
        <section style={{display:'flex', justifyContent:'center'}}>
        <div className={styles.cart_section}>
          <div className={styles.section_title}>
            <Image src="/basket.png" width={50} height={50} quality={100} />
            <p>장바구니</p>
          </div>
          <div className={styles.cart_btn}>
            <div className={mart === 'emart' ? `${styles.choice_mart}` : 'not_choice_mart'}
            onClick={()=>{setMart("emart")}}>
              <Button content="이마트" bgColor="gray" />
            </div>
            <div className={mart === 'homeplus' ? `${styles.choice_mart}` : 'not_choice_mart'}
            onClick={()=>{setMart("homeplus")}}>
              <Button content="홈플러스" bgColor="gray" />
            </div>
          </div>
          <article className={styles.cart_article}>
            <div className={styles.cart_info}>
              <p>선택하신 재료는 총</p>
              <p className={styles.cart_info_purple}>{ingre?.length}개</p>
              <p>입니다.</p>
            </div>
            {mart !== "none" ? 
            <>
            {ingre.map((item:any, index:any) => <div key={index}>
                <div className={styles.ingre_content}>
                  {activeKey?.includes(Number(index)) ? 
                  <>
                  <div className={styles.ingre_title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5C5ACD" className="bi bi-caret-down-fill" viewBox="0 0 16 16"
                    onClick={()=>{setActiveKey(activeKey.filter(item => item !== Number(index)))}}>
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                    <p>{item[1]}</p>
                  </div>
                    {mart === 'emart' ?
                    ProductLst(ingreE, index)
                    :
                    ProductLst(ingreH, index)
                    }
                  </>
                  :
                  <>
                  <div className={styles.ingre_title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5C5ACD" className="bi bi-caret-right-fill" viewBox="0 0 16 16"
                    onClick={()=>{activeKey ? setActiveKey([...activeKey, Number(index)]) : setActiveKey([Number(index)])}}>
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                    <p>{item[1]}</p>
                  </div>
                  </>
                  }
                </div>
              </div>)}
            </>
            :
            <>
              <div className={styles.no_mart}>
                <p>마트를 골라주세요!</p>
              </div>
              <ul className={styles.ingreLi}>
              {ingre?.map((item:any, index:any) => <li key={index} style={{marginBottom:'10px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="#29B973" className="bi bi-circle-fill" viewBox="0 0 16 16"
              style={{marginRight:'10px'}}>
                <circle cx="8" cy="8" r="8"/>
              </svg>
              <span>{item[1]}</span>
              </li>)}
              </ul>
            </>
            }
          </article>
        </div>
        </section>
        <section className={styles.mart_sections}>
          <div className={styles.mart_section}>
            <div className={styles.section_title} style={{marginBottom:'30px'}}>
              <Image src="/scale.png" width={50} height={50} quality={100} />
              <p>마트별 가격 비교</p>
            </div>
            <div className={styles.mart_div}>
            <Mart title="emart" price={emartPrices} isCheap={cheaper} data={emartList} />
            <Mart title="homeplus" price={hpPrices} isCheap={cheaper} data={hpList} />
            </div>
            <Swiper
            id={styles.mart_swiper}
            spaceBetween={3}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            // observeParents={true}
            >
              <SwiperSlide style={{marginRight:'3px'}}>
                <Mart title="emart" price={emartPrices} isCheap={cheaper} data={emartList} />
              </SwiperSlide>
              <SwiperSlide>
                <Mart title="homeplus" price={hpPrices} isCheap={cheaper} data={hpList} />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      </main>
    </>
    :
    null}
    </>
  )
}