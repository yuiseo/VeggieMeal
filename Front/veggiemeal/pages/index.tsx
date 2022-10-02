import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Button from 'components/Button';
import Image from 'next/image';
import Link from 'next/link';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>베지밀</title>
        <meta name="description" content="더 건강하고 더 경제적인 당신의 식사를 위해" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.header_title}>
            <div>
              <h1 className={styles.slogan}>더 건강하고 <br /> 더 경제적인 <br /> 당신의 식사를 위해</h1>
              <div id={styles.menu_btn}>
                <Link href="/recipe">
                  <div style={{ marginRight: '20px' }}>
                    <Button content="레시피 모아 보기" bgColor="black" />
                  </div>
                </Link>
                <Link href="/prices">
                  <Button content="물가 분석 보러 가기" bgColor="black" />
                </Link>
              </div>
            </div>
            <svg id={styles.under_icon} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
          <div className={styles.main_gradient} />
          <div className={styles.main_img} />
        </header>
        <section id="first_section_web" className={styles.section_bg_web}>
          <div className={styles.section_web}>
            <div>
              <h2>그거 아세요?</h2>
              <p>한 끼의 채식이 <br />
                지구에 아주 큰 도움이 된다는 것!</p>
              <p>한 사람이 <br />
                <strong>일년 중 딱 하루</strong>만 채식해도 <br />
                <strong>1년에 나무 15그루</strong>를 심는 효과를 낼 수 있어요.
              </p>
            </div>
            <Image src="/main_first_section.png" width={400} height={400} quality={100} />
          </div>
        </section>
        <section id="first_section_mobile" className={styles.section_bg_mobile}>
          <div className={styles.section_mobile}>
            <div>
              <h2>그거 아세요?</h2>
              <Image src="/main_first_section.png" width={300} height={300} quality={100} />
              <p>한 끼의 채식이 <br />
                지구에 아주 큰 도움이 된다는 것!</p>
              <p>한 사람이 <br />
                <strong>일년 중 딱 하루</strong>만 채식해도 <br />
                <strong>1년에 나무 15그루</strong>를 심는 효과를 낼 수 있어요.
              </p>
            </div>
          </div>
        </section>
        <section id="second_section_web" className={`${styles.section_bg_web} ${styles.section_gray}`}>
          <div className={styles.introduce_web}>
            <div>
              <div className={styles.second_logo}>
                <p>Veggie + Meal  =  </p>
                <Image src="/Logo_icon.png" width={85} height={80} />
              </div>
              <Image src="/main_cook.png" width={900} height={350} />
              <div className={styles.second_content}>
                <h2>그래서 베지밀은...</h2>
                <p>VeggieMeal은 <br />
                  <strong>채식주의자</strong>란 뜻의
                  <span className={styles.vg_word}>Veggie</span>와 <br />
                  <strong>식사</strong>란 뜻의 <span className={styles.vg_word}>Meal</span>을 합친 용어예요.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="second_section_mobile" className={`${styles.section_bg_mobile} ${styles.section_gray}`}>
          <div className={styles.section_mobile}>
            <div>
              <div className={styles.second_logo}>
                <p>Veggie + Meal</p>
                <p>=</p>
                <Image src="/Logo_icon.png" width={55} height={55} />
              </div>
              <div className={styles.second_cookimg} />
              {/* <Image src="/main_cook.png" width={900} height={350} /> */}
              <div className={styles.second_content}>
                <h2>그래서 베지밀은...</h2>
                <p>VeggieMeal은 <br />
                  <strong>채식주의자</strong>란 뜻의
                  <span className={styles.vg_word}>Veggie</span>와 <br />
                  <strong>식사</strong>란 뜻의 <span className={styles.vg_word}>Meal</span>을 합친 용어예요.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="third_section_web" className={styles.section_bg_web}>
          <div className={styles.section_web}>
            <div>
              <h2>레시피 추천</h2>
              <div className={styles.section_img}>
                <Image src="/sandwich.png" width={200} height={200} quality={100} />
              </div>
              <p>채식 단계에 따른 레시피도,<br />
                지금 냉장고 속 재료의 레시피도<br />
                베지밀이 모두모두 알려드려요! </p>
            </div>
            <div className={styles.mockup}>
              <Image src="/mockup/recipe01.png" width={200} height={430} quality={100} />
              <Image src="/mockup/recipe02.png" width={200} height={430} quality={100} />
            </div>
          </div>
        </section>
        <section id="third_section_mobile" className={styles.section_bg_mobile}>
          <div className={styles.section_mobile}>
            <div>
              <h2>레시피 추천</h2>
              <div className={styles.section_img}>
                <Image src="/sandwich.png" width={280} height={280} quality={100} />
              </div>
              <p>채식 단계에 따른 레시피도,<br />
                지금 냉장고 속 재료의 레시피도<br />
                베지밀이 모두모두 알려드려요! </p>
            </div>
          </div>
        </section>
        <section id="fourth_section_web" className={styles.gray_bg_web}>
          <div className={styles.section_web}>
            <div>
              <h2>물가 분석</h2>
              <div className={styles.section_img}>
                <Image src="/graph.png" width={200} height={200} quality={100} />
              </div>
              <p>여러분의 지갑, 절대 지켜!<br />
                베지밀과 함께라면<br />
                건강한 식사와 두둑한 지갑<br />
                모두 챙겨 드립니다. </p>
            </div>
            <div className={styles.mockup}>
              <Image src="/mockup/prices01.png" width={200} height={430} quality={100} />
              <Image src="/mockup/prices02.png" width={200} height={430} quality={100} />
            </div>
          </div>
        </section>
        <section id="fourth_section_mobile" className={styles.gray_bg_mobile}>
          <div className={styles.section_mobile}>
            <div >
              <h2>물가 분석</h2>
              <div className={styles.section_img}>
                <Image src="/graph.png" width={280} height={280} quality={100} />
              </div>
              <p>여러분의 지갑, 절대 지켜!<br />
                베지밀과 함께라면<br />
                건강한 식사와 두둑한 지갑<br />
                모두 챙겨 드립니다. </p>
            </div>
          </div>
        </section>
        <section id="fifth_section_web" className={styles.section_bg_web}>
          <div className={styles.section_web}>
            <div>
              <h2>장바구니</h2>
              <div className={styles.section_img}>
                <Image src="/cart.png" width={200} height={200} quality={100} />
              </div>
              <p>여러 레시피를 보며 담아두신<br />
                신선한 재료들,<br />
                어디서 사야 제일 저렴할지<br />
                베지밀이 알려드릴게요. </p>
            </div>
            <div className={styles.mockup}>
              <Image src="/mockup/cart01.png" width={200} height={430} quality={100} />
              <Image src="/mockup/cart02.png" width={200} height={430} quality={100} />
            </div>
          </div>
        </section>
        <section id="fitfh_section_mobile" className={styles.section_bg_mobile}>
          <div className={styles.section_mobile}>
            <div>
              <h2>장바구니</h2>
              <div className={styles.section_img}>
                <Image src="/cart.png" width={280} height={280} quality={100} />
              </div>
              <p>여러 레시피를 보며 담아두신<br />
                신선한 재료들,<br />
                어디서 사야 제일 저렴할지<br />
                베지밀이 알려드릴게요. </p>
            </div>
          </div>
        </section>
        <div className={styles.gray_bg} />

      </main>

    </div>
  )
}

export default Home
