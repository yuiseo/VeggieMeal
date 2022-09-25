import Image from 'next/image';

import { useRouter } from 'next/router';
import styles from 'styles/Ingredient.module.scss';

import glass from '/public/glass.png';
import basket from '/public/basket.png';
import { Button } from 'react-bootstrap';

export default function Ingredient() {
  const router = useRouter();
  return (
    <>
      <div className={styles.box}>
        <h4>재료이름</h4>
        <div className={styles.button_box}>
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
      </div>
    </>
  )
}

