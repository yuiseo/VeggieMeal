import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from "react";

import Table from 'components/Table';
import ChartLine from 'components/ChartLine';
import ChartColumn from 'components/ChartColumn';
import styles from 'styles/Price.module.scss';
import glass from '/public/glass.png';

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const PriceSelectBox = dynamic(() => import('components/PriceSelectBox'))
// import PriceSelectBox from "components/PriceSelectBox";



export default function Prices() {
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
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 3,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 4,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 5,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 6,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
    {
      data_id: 7,
      date: '9월 7일',
      max_val: 6700,
      min_val: 3000,
      val: 5000,
    },
  ]


  return (
    <div>
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
          <section className={styles.category}>
            <PriceSelectBox data={cat01} setState={setIsSelect01} title="부류" />
            <PriceSelectBox data={cat02} setState={setIsSelect02} title="품종" />
            <PriceSelectBox data={cat03} setState={setIsSelect03} title="품목" />
            <PriceSelectBox data={cat04} setState={setIsSelect04} title="원산지" />
          </section>
        </header>



        <section className={styles.chart_section}>
          {/* 차트 섹션 */}
          <article className={styles.main_chart}>
            <h3>차트입니다</h3>
            <ChartLine />
          </article>

          <section className={styles.sub_chart}>
            <article>
              <h3>차트이름</h3>
              <ChartColumn />
            </article>
            <article className={styles.table_article}>
              <Table tableData={tableData} tableColumns={tableColumns} ></Table>
            </article>
          </section>
        </section>
      </main>
    </div >
  )
}