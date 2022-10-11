import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import Table from 'components/Table';
import ChartLine from 'components/ChartLine';
import ChartColumn from 'components/ChartColumn';
import styles from 'styles/Price.module.scss';
import glass from '/public/glass.png';
import think from '/public/think.png';
import SelectBox from "components/SelectBox";
import News from "components/News";
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners'

const Pulse = require('react-reveal/Pulse');


export async function getServerSideProps() {
  // Fetch data from external API

  const respond = await fetch('https://j7c205.p.ssafy.io/api/deal/large', {
    method: 'get'
  })
  const largeData = await respond.json()
  // console.log(largeData)

  return { props: { largeData } }
}

type PriceProps = {
  data: any
  largeData: string[]
}


export default function Prices({ largeData }: PriceProps) {
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const [isSelect04, setIsSelect04] = useState<string>();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(()=>{
    setIsSelect02(undefined)
    setIsSelect03(undefined)
    setIsSelect04(undefined)
  }, [isSelect01])

  useEffect(()=>{
    setIsSelect03(undefined)
    setIsSelect04(undefined)
  }, [isSelect02])

  useEffect(()=>{
    setIsSelect04(undefined)
  }, [isSelect03])


  let isOrigin = '원산지'

  const { data: newsData } = useQuery(['newsData'], async () => {
    const res = await fetch(`https://j7c205.p.ssafy.io/api/news`, {
      method: 'GET',
    })
    const Newsdata = await res.json();
    return Newsdata
  })
  const cat01 = largeData;
  const { data: cat02 } = useQuery(['cat02', isSelect01], async () => {
    const res = await fetch(`https://j7c205.p.ssafy.io/api/deal/medium?large=${isSelect01}`)
    const data = await res.json()
    // console.log(data)
    return data
  })
  const { data: cat03 } = useQuery(['cat03', isSelect02], async () => {
    const res = await fetch(`https://j7c205.p.ssafy.io/api/deal/small?large=${isSelect01}&medium=${isSelect02}`)
    const data = await res.json()
    // console.log(data)
    return data
  })
  const { data: cat04 } = useQuery(['cat04', isSelect03], async () => {
    const res = await fetch(`https://j7c205.p.ssafy.io/api/deal/origin?large=${isSelect01}&medium=${isSelect02}&small=${isSelect03}`)
    const data = await res.json()

    if (data[0] == 'income') {
      data[0] = '수입산'
    } else if (data[0] == 'korea') {
      data[0] = '국내산'
    }
    if (data[1] == 'korea') {
      data[1] = '국내산'
    } else if (data[1] == 'income') {
      data[1] = '수입산'
    }
    return data
  })

  const { data: dealData } = useQuery(['dealData', [isSelect01, isSelect02, isSelect03, isSelect04]], async () => {
    if (isSelect04 === '국내산') {
      isOrigin = 'korea'
    } else {
      isOrigin = 'income'
    }
    const res = await fetch(`https://j7c205.p.ssafy.io/api/deal/?large=${isSelect01}&medium=${isSelect02}&origin=${isOrigin}&small=${isSelect03}`)
    const data = await res.json()
    return data
  })


  const tableColumns = ['날짜', '최고가', '최저가', '평균가']

  function Spinner() {
    return (
      <section className={styles.spinner}>
        <div>
          <Pulse ><h3>물가를 분석 중입니다</h3></Pulse>
          <BeatLoader color="#5C5ACD" />
        </div>
      </section>
    )
  }

  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (dealData !== undefined && dealData.length) {
      setIsShow(true)
      setTimeout(() => setLoading(false), 2500)
    }
  }, [dealData])

  const [isChange, setIsChange] = useState<boolean>(true)
  useEffect(() => {
    setIsChange(false)
    setLoading(true)
  }, [isSelect01, isSelect02, isSelect03, isSelect04])

  const [reset, setReset] = useState<boolean>(false)
  useEffect(() => {
    if (reset === true) {
      console.log('hihi')
    }
  }, [reset])

  return (
    <div className={styles.Container}>
      <Head>
        <title>물가분석 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.title}>
            <Image src={glass} alt='물가 분석 돋보기' quality={100} width={50} height={50} />
            <h1 className={styles.price_title}>물가분석</h1>
          </div>
          {/* 셀렉트 박스 */}
          <section className={styles.category} >
            <div className={styles.select01}>
            <SelectBox data={cat01} setState={setIsSelect01} title={isSelect01} altTitle="부류" isT={true} />
            </div>
            <div className={styles.select02}>
              {isSelect01 ? 
                <SelectBox data={cat02} setState={setIsSelect02} title={isSelect02} altTitle="품종" isT={true} />
                :
                <SelectBox data={cat02} setState={setIsSelect02} title={isSelect02} altTitle="품종" isT={false} />
              }
            </div>
            <div className={styles.select03}>
              {isSelect02 ? 
              <SelectBox data={cat03} setState={setIsSelect03} title={isSelect03} altTitle="품목" isT={true} />
              :
              <SelectBox data={cat03} setState={setIsSelect03} title={isSelect03} altTitle="품목" isT={false} />
              }
            </div>
            <div className={styles.select04
            }>
              {isSelect03 ? 
              <SelectBox data={cat04} setState={setIsSelect04} title={isSelect04} altTitle="원산지" isT={true} />
              : 
              <SelectBox data={cat04} setState={setIsSelect04} title={isSelect04} altTitle="원산지" isT={false} />
              }
            </div>
          </section>
        </header>

        {isShow === false ?
          <div className={styles.noPrices}>
            <Image src={think} width={150} height={150} quality={100} />
            <p> 어떤 재료의 물가를 알려드릴까요? </p>
          </div>
          :
          (loading === true ? <Spinner /> :
            <section className={styles.chart_section}>
              <div className={styles.main_name}>
                <h4>{isSelect03}</h4>
                <h4>의 평균 물가</h4>
              </div>
              <article className={styles.main_chart}>
                <ChartLine priceData={dealData} selectTitle={isSelect03} />
              </article>
              <hr className={styles.hr} />
              <div className={styles.sub_name}>
                <h4>{isSelect03}</h4>
                <h4>의 최저가 및 최고가</h4>
              </div>
              <section className={styles.sub_chart}>
                <article className={styles.column_chart}>
                  <ChartColumn selectTitle={isSelect03} priceData={dealData} />
                </article>
                <article className={styles.table_article}>
                  <div>
                    <Table dealData={dealData} tableColumns={tableColumns} ></Table>
                  </div>
                  <div className={styles.footer}>
                    <p></p>
                    <p>* 단위 : 원/100g</p>
                  </div>
                </article>
              </section>
            </section>)
        }
        <section>
          <div className={styles.news_section}>
            <Image src="/news.png" width={50} height={50} quality={100} />
            <p className={styles.news_title}>물가 관련 뉴스</p>
          </div>
          {newsData?.map((item: { [key: string]: string }, index: string) => <News key={index} data={item} />)}
        </section>
      </main>
    </div >
  )
}