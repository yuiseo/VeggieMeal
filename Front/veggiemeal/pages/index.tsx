import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Button from 'components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import { useRef } from 'react';

const Fade = require('react-reveal/Fade');
const Roll = require('react-reveal/Roll');
const LightSpeed = require('react-reveal/LightSpeed');
const Flip = require('react-reveal/Flip');


const Home: NextPage = () => {
  const currentRef = useRef<null | HTMLElement>(null);
  const currentMobileRef = useRef<null | HTMLElement>(null);
  const sparkle = useSpring({
    loop:{reverse:true},
    from: {opacity:0.8, y:0},
    to:{opacity:0, y:10},
    config:{
      duration:1500
    }
  })
  
  return (
    <>
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
              <Fade top>
                <h1 className={styles.slogan}>더 건강하고 <br /> 더 경제적인 <br /> 당신의 식사를 위해</h1>                
              </Fade>
              <div id={styles.menu_btn}>
                <Link href="/recipe">
                  <div style={{ marginRight: '20px' }}>
                    <Button content="레시피 모아 보기" bgColor="black" />
                  </div>
                </Link>
                <Link href="/prices">
                  <div>
                    <Button content="물가 분석 보러 가기" bgColor="black" />
                  </div>
                </Link>
              </div>
            </div>
            <animated.svg id={styles.under_icon} xmlns="http://www.w3.org/2000/svg" width="60" height="50" fill="black" className="bi bi-chevron-double-down" viewBox="0 0 16 16"
            style={sparkle} onClick={()=>{
              currentRef.current?.scrollIntoView({behavior:'smooth'});
              currentMobileRef.current?.scrollIntoView({behavior:'smooth'});
            }}>
              <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </animated.svg>
          </div>
          <div className={styles.main_gradient} />
          <div className={styles.main_img} />
        </header>
          <section ref={currentRef} id="first_section_web" className={styles.section_bg_web}>
            <div className={styles.section_web}>
              <Fade left duration={1500}>
                <div>
                  <h2>그거 아세요?</h2>
                  <p>한 끼의 채식이 <br />
                    지구에 아주 큰 도움이 된다는 것!</p>
                  <p>한 사람이 <br />
                    <strong>일년 중 딱 하루</strong>만 채식해도 <br />
                    <strong>1년에 나무 15그루</strong>를 심는 효과를 낼 수 있어요.
                  </p>
                </div>
              </Fade>
              <Fade left duration={1500}>
                <Image alt="지구 아이콘과 요리사 아이콘" src="/main_first_section.png" width={400} height={400} quality={100} />
              </Fade>
            </div>
          </section>
          <section ref={currentMobileRef} id="first_section_mobile" className={styles.section_bg_mobile}>
            <div className={styles.section_mobile}>
              <Fade top duration={1500}>
                <div>
                  <h2>그거 아세요?</h2>
                  <Image alt="지구 아이콘과 요리사 아이콘" src="/main_first_section.png" width={300} height={300} quality={100} />
                  <p>한 끼의 채식이 <br />
                    지구에 아주 큰 도움이 된다는 것!</p>
                  <p>한 사람이 <br />
                    <strong>일년 중 딱 하루</strong>만 채식해도 <br />
                    <strong>1년에 나무 15그루</strong>를 심는 효과를 낼 수 있어요.
                  </p>
                </div>
              </Fade>
            </div>
          </section>
          <section id="second_section_web" className={`${styles.section_bg_web} ${styles.section_gray}`}>
            <div className={styles.introduce_web}>
              <div>
                <Fade top duration={1500}>
                  <div className={styles.second_logo}>
                    <p>Veggie + Meal  =  </p>
                    <Image alt="베지밀의 로고로, 그릇에서 새싹이 피어오르는 모습" src="/Logo_icon.png" width={85} height={80} />
                  </div>
                </Fade>
                <Image alt="채소를 냄비에 잘라넣고 있는 여성" src="/main_cook.png" width={900} height={350} />
                <Fade top duration={1500}>
                  <div className={styles.second_content}>
                    <h2>그래서 베지밀은...</h2>
                    <p>VeggieMeal은 <br />
                      <strong>채식주의자</strong>란 뜻의
                      <span className={styles.vg_word}>Veggie</span>와 <br />
                      <strong>식사</strong>란 뜻의 <span className={styles.vg_word}>Meal</span>을 합친 용어예요.</p>
                  </div>
                </Fade>
              </div>
            </div>
          </section>
        <section id="second_section_mobile" className={`${styles.section_bg_mobile} ${styles.section_gray}`}>
          <div className={styles.section_mobile}>
              <div>
                <Fade top duration={1500}>
                  <div className={styles.second_logo}>
                    <p>Veggie + Meal</p>
                    <p>=</p>
                    <Image alt="베지밀의 로고로, 그릇에서 새싹이 피어오르는 모습" src="/Logo_icon.png" width={55} height={55} />
                  </div>
                </Fade>
                <div className={styles.second_cookimg} />
                {/* <Image src="/main_cook.png" width={900} height={350} /> */}
                <Fade top duration={1500}>
                  <div className={styles.second_content}>
                    <h2>그래서 베지밀은...</h2>
                    <p>VeggieMeal은 <br />
                      <strong>채식주의자</strong>란 뜻의
                      <span className={styles.vg_word}>Veggie</span>와 <br />
                      <strong>식사</strong>란 뜻의 <span className={styles.vg_word}>Meal</span>을 합친 용어예요.</p>
                  </div>
                </Fade>
              </div>
          </div>
        </section>
        <section id="third_section_web" className={styles.section_bg_web}>
          <div className={styles.section_web}>
            <div>
              <h2>레시피 추천</h2>
              <div className={styles.section_img}>
                <Roll top duration={1500}>
                  <Image alt="샌드위치를 형상화한 아이콘, 빵에 토마토, 상추, 치즈가 들어있다." src="/sandwich.png" width={200} height={200} quality={100} />
                </Roll>
              </div>
              <p>채식 단계에 따른 레시피도,<br />
                지금 냉장고 속 재료의 레시피도<br />
                베지밀이 모두모두 알려드려요! </p>
            </div>
            <Fade right duration={1500}>
              <div className={styles.mockup}>
                <Image alt="베지밀의 레시피 추천 서비스의 모바일 환경 첫번째 이미지" src="/mockup/recipe01.png" width={200} height={430} quality={100} />
                <Image alt="베지밀의 레시피 추천 서비스의 모바일 환경 두번째 이미지" src="/mockup/recipe02.png" width={200} height={430} quality={100} />
              </div>
            </Fade>
          </div>
        </section>
        <section id="third_section_mobile" className={styles.section_bg_mobile}>
          <div className={styles.section_mobile}>
            <div>
              <h2>레시피 추천</h2>
              <Roll top duration={1500}>
                <div className={styles.section_img}>
                  <Image alt="샌드위치를 형상화한 아이콘, 빵에 토마토, 상추, 치즈가 들어있다." src="/sandwich.png" width={280} height={280} quality={100} />
                </div>
              </Roll>
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
                <Flip top duration={1500}>
                  <Image alt="우상향하는 그래프를 형상화한 아이콘" src="/graph.png" width={200} height={200} quality={100} />
                </Flip>
              </div>
              <p>여러분의 지갑, 절대 지켜!<br />
                베지밀과 함께라면<br />
                건강한 식사와 두둑한 지갑<br />
                모두 챙겨 드립니다. </p>
            </div>
            <Fade right duration={1500}>
              <div className={styles.mockup}>
                <Image alt="베지밀의 물가분석 서비스의 모바일 환경 첫번째 이미지" src="/mockup/prices01.png" width={200} height={430} quality={100} />
                <Image alt="베지밀의 물가분석 서비스의 모바일 환경 두번째 이미지" src="/mockup/prices02.png" width={200} height={430} quality={100} />
              </div>
            </Fade>
          </div>
        </section>
        <section id="fourth_section_mobile" className={styles.gray_bg_mobile}>
          <div className={styles.section_mobile}>
            <div >
              <h2>물가 분석</h2>
              <Fade left duration={1500}>
                <div className={styles.section_img}>
                  <Image alt="우상향하는 그래프를 형상화한 아이콘" src="/graph.png" width={280} height={280} quality={100} />
                </div>
              </Fade>
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
              <LightSpeed left duration={1500}>
                <div className={styles.section_img}>
                  <Image alt="장을 볼 때 쓰는 장바구니 카트를 형상화한 아이콘" src="/cart.png" width={200} height={200} quality={100} />
                </div>
              </LightSpeed>
              <p>여러 레시피를 보며 담아두신<br />
                신선한 재료들,<br />
                어디서 사야 제일 저렴할지<br />
                베지밀이 알려드릴게요. </p>
            </div>
            <Fade right duration={1500}>
              <div className={styles.mockup}>
                <Image alt="베지밀의 장바구니 서비스의 모바일 환경 첫번째 이미지" src="/mockup/cart01.png" width={200} height={430} quality={100} />
                <Image alt="베지밀의 장바구니 서비스의 모바일 환경 두번째 이미지" src="/mockup/cart02.png" width={200} height={430} quality={100} />
              </div>
            </Fade>
          </div>
        </section>
        <section id="fitfh_section_mobile" className={styles.section_bg_mobile}>
          <div className={styles.section_mobile}>
            <div>
              <h2>장바구니</h2>
              <LightSpeed left duration={1500}>
                <div className={styles.section_img}>
                  <Image alt="장을 볼 때 쓰는 장바구니 카트를 형상화한 아이콘" src="/cart.png" width={280} height={280} quality={100} />
                </div>
              </LightSpeed>
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
    <footer>
      <div className={styles.footer_div}>
        <div className={styles.teamNames}>
          <span>자</span>
          <span>:</span>
          <span>란다</span>
        </div>
        <p className={styles.teamMember} style={{fontSize:'15px'}}>김윤주 | 김영서 | 유이서 | 이기영 | 정지원 | 정호진</p>
        <p className={styles.teamMember}>Copyright © jaranda. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Home
