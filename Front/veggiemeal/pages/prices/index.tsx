import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import Table from 'components/Table';
import ChartLine from 'components/ChartLine';
import ChartColumn from 'components/ChartColumn';
import styles from 'styles/Price.module.scss';
import glass from '/public/glass.png';
import SelectBox from "components/SelectBox";
import News from "components/News";
import { useQuery } from 'react-query';

// const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
// const PriceSelectBox = dynamic(() => import('components/PriceSelectBox'))
// import PriceSelectBox from "components/PriceSelectBox";

// const BACK_URL = 'https://j7c205.p.ssafy.io/api/deal/'

export async function getServerSideProps() {
  // Fetch data from external API
  const keyword = encodeURI("물가");
  const newHeader: HeadersInit = new Headers();
  newHeader.set("X-Naver-Client-Id", "zPEQIIbwNxiP18_gyNbN");
  newHeader.set("X-Naver-Client-Secret", "W1O4_DezL1");
  const res = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${keyword}`, {
    method: 'GET',
    headers: newHeader
  })
  const data = await res.json();

  const respond = await fetch('https://j7c205.p.ssafy.io/api/deal/large', {
    method: 'get'
  })
  const largeData = await respond.json()
  console.log(largeData)

  return { props: { data, largeData } }
}

type PriceProps = {
  data: any
  largeData: string[]
}


export default function Prices({ data, largeData }: PriceProps) {
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const [isSelect04, setIsSelect04] = useState<string>();
  const [isShow, setIsShow] = useState<boolean>(false);

  let isOrigin = '원산지'
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



  const tableColumns = ['날짜', '최고가(원)', '최저가(원)', '평균가(원)']

  const tableData = [
    {
      data_id: 1,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 2,
      date: '9월 8일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 3,
      date: '9월 9일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 4,
      date: '9월 10일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 5,
      date: '9월 11일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    // {
    //   data_id: 6,
    //   date: '9월 12일',
    //   max_val: 6700,
    //   min_val: 3000,
    //   val: 5000,
    // },
    // {
    //   data_id: 7,
    //   date: '9월 13일',
    //   max_val: 6700,
    //   min_val: 3000,
    //   val: 5000,
    // 
  ]

  useEffect(() => {
    if (dealData !== undefined && dealData.length) {
      setIsShow(true)
    }
  }, [dealData])
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
            <SelectBox data={cat01} setState={setIsSelect01} title="부류" />
            <SelectBox data={cat02} setState={setIsSelect02} title="품종" />
            <SelectBox data={cat03} setState={setIsSelect03} title="품목" />
            <SelectBox data={cat04} setState={setIsSelect04} title="원산지" />
          </section>
        </header>

        {isShow === false ?
          <div className={styles.noPrices}>
            <Image src="/think.png" width={150} height={150} quality={100} />
            <p> 어떤 재료의 물가를 알려드릴까요? </p>
          </div>
          :
          <section className={styles.chart_section}>
            <article className={styles.main_chart}>
              <ChartLine priceData={dealData} selectTitle={isSelect03} />
            </article>

            <section className={styles.sub_chart}>
              <article className={styles.column_chart}>
                <ChartColumn selectTitle={isSelect03} priceData={dealData} />
              </article>
              <article className={styles.table_article}>
                <Table dealData={dealData} tableColumns={tableColumns} ></Table>
              </article>
            </section>
          </section>
        }
        <section>
          <div className={styles.news_section}>
            <Image src="/news.png" width={50} height={50} quality={100} />
            <p className={styles.news_title}>물가 관련 뉴스</p>
          </div>
          {data['items'].map((item: { [key: string]: string }, index: string) => <News key={index} data={item} />)}
        </section>
      </main>
    </div >
  )
}