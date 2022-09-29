import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from "react";
import Table from 'components/Table';
import ChartLine from 'components/ChartLine';
import ChartColumn from 'components/ChartColumn';
import styles from 'styles/Price.module.scss';
import glass from '/public/glass.png';
import SelectBox from "components/SelectBox";
import News from "components/News";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const PriceSelectBox = dynamic(() => import('components/PriceSelectBox'))
// import PriceSelectBox from "components/PriceSelectBox";

export async function getServerSideProps() {
  // Fetch data from external API
  const keyword = encodeURI("물가");
  const newHeader: HeadersInit = new Headers();
  newHeader.set("X-Naver-Client-Id", "zPEQIIbwNxiP18_gyNbN" );
  newHeader.set("X-Naver-Client-Secret", "W1O4_DezL1");
  const res = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${keyword}`, {
      method:'GET',
      headers:newHeader
  })
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } }
}

type PriceProps={
  data:any
}


export default function Prices({data}:PriceProps) {
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const [isSelect04, setIsSelect04] = useState<string>();
  const cat01 = ['과일', '채소', '정육', '계란', '수산/건어물', '우유/유제품', '쌀/잡곡'];
  const cat02 = ['감자/고구마', '두부/콩나물/숙주나물', '상추/깻잎/쌈채소', '무/당근', '버섯', '배추/양배추/브로콜리', '시금치/나물'];
  const cat03 = ['감자', '고구마'];
  const cat04 = ['국산', '수입산'];
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
    {
      data_id: 6,
      date: '9월 12일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 7,
      date: '9월 13일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
  ]


  return (
    <div className={styles.Container}>
      <Head>
        <title>물가분석 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.title}>
            <Image src={glass} alt='magnifying glass' quality={100} width={50} height={50} />
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
        <section className={styles.chart_section}>
          {/* 차트 섹션 */}
          <article className={styles.main_chart}>
            <ChartLine />
          </article>

          <section className={styles.sub_chart}>
            <article>
              <ChartColumn />
            </article>
            <article className={styles.table_article}>
              <Table tableData={tableData} tableColumns={tableColumns} ></Table>
            </article>
          </section>
        </section>
        <section>
          <div className={styles.news_section}>
            <Image src="/news.png" width={50} height={50} quality={100} />
            <p className={styles.news_title}>물가 관련 뉴스</p>
          </div>
          {data['items'].map((item:{[key:string]:string}, index:string)=><News key={index} data={item} />)}
        </section>
      </main>
    </div >
  )
}