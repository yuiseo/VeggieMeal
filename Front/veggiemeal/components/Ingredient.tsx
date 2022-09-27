import Image from 'next/image';

import { useRouter } from 'next/router';
import styles from 'styles/Ingredient.module.scss';

import glass from '/public/glass.png';
import basket from '/public/basket.png';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Ingredient() {
  const router = useRouter();
  const [isText, setIsText] = useState<string>('담기')
  const [isNumber, setIsNumber] = useState<number>(1)
  if (isNumber < 10) {
    isNumber == isNumber
  }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.box_title}>
          <div className={styles.number}>
            <p>{isNumber}</p>
          </div>
          <h4>재료이름</h4>
        </div>
        <Button className={styles.button_box}>
          <p>장바구니 {isText}</p>
        </Button>

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
    </>
  )
}

