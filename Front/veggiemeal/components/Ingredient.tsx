import Image from 'next/image';

import { useRouter } from 'next/router';
import styles from 'styles/Ingredient.module.scss';

import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { Ingredient } from 'states/Ingredient';

interface Ingredient {
  ingredientId: number;
  name: string;
  index: number;
  cart:(string | number)[][];
  setCart:any;
}

export default function Ingredient({ ingredientId, name, index, cart, setCart }: Ingredient) {

  const [isIn, setIsIn] = useState<boolean>(false);

  useEffect(()=>{
    cart.map((item:(string|number)[]) => {
      if(item[0] === ingredientId){
        setIsIn(true)
      }
    })
  }, [])
  
  return (
    <div className={styles.Container}>
      <div className={styles.Box}>

        {/* 재료 이름 */}
        <div className={styles.box_title}>
          {/* 숫자 */}
          {index + 1 < 10 ?
            <div className={styles.number}><p>0{index + 1}</p></div>
            : <div className={styles.number}><p>{index + 1}</p></div>}
          {/* 제목 */}
          <h4>{name}</h4>
        </div>

        {/* 버튼 */}
        {isIn ?
          <div className={styles.button_in_box}
          onClick={() => {
            setCart(cart.filter((item:(string | number)[]) => item[0] !== ingredientId))
            setIsIn(false)
          }}><p>장바구니 빼기</p></div>
          :
          <div className={styles.button_out_box} onClick={() => { 
            if(cart.length === 0){
              setCart([[ingredientId, name]])
            }else{
              setCart([...cart, [ingredientId, name]])
            }
            setIsIn(true)
           }}><p>장바구니 담기</p></div>
        }


        {/* <div onClick={() => { setIsClick(!isClick) }}> */}
        {/* {isClick === false ?
            <Button className={styles.button_in_box}><p>장바구니 담기</p></Button>
            :
            <Button className={styles.button_out_box}><p>장바구니 빼기</p></Button>
          }
          </div>  */}
        {/*
        <div>
        <Button className={styles.price_box} onClick={() => router.push('/prices')}>
            <div><Image src={glass} quality={100} width={45} height={45} /></div>
            <p>물가분석</p>
            <p>보기</p>
          </Button>
          <Button className={styles.basket_box}>
            <div><Image src={basket} quality={100} width={45} height={45} /></div>
            <p>장바구니</p>
            <p>담기</p>
          </Button> 
        </div>
        */}
      </div>
    </div>
  )
}

