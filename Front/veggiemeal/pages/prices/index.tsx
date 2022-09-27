import Head from "next/head";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from "react";

import styles from 'styles/Price.module.scss';
import glass from '/public/glass.png';

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const PriceSelectBox = dynamic(() => import('components/PriceSelectBox'))
// import PriceSelectBox from "components/PriceSelectBox";



export default function Prices() {
  const [isSelect01, setIsSelect01] = useState<string>();
  const [isSelect02, setIsSelect02] = useState<string>();
  const [isSelect03, setIsSelect03] = useState<string>();
  const cat01 = ['과일', '채소', '정육', '계란', '수산/건어물', '우유/유제품', '쌀/잡곡'];
  const cat02 = ['감자/고구마', '두부/콩나물/숙주나물', '상추/깻잎/쌈채소', '무/당근', '버섯', '배추/양배추/브로콜리', '시금치/나물'];
  const cat03 = ['감자', '고구마'];

  function Chart1() {
    return (
      <ApexChart
        series={[
          {
            type: 'line',
            name: '물가 평균',
            data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
          },
          {
            type: 'bar',
            name: "뭐 넣기로 했죠",
            data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
          },
        ]}
        options={{
          chart: {
            height: 1000,
            width: 1000,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
          labels: ['9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일',],
          xaxis: {
            type: 'category'
          },
          yaxis: {
            max: function (max) {
              return Math.max(max) + 1000
            },
            forceNiceScale: true,
            min: 0,
            labels: {
              formatter: function (value) {
                return value.toLocaleString()
              }
            }
          },
          stroke: {
            curve: "smooth",
            // width: 4,
          },
          colors: ['#29B973', '#5C5ACD']
        }}
      >
      </ApexChart>
    )
  }

  function Chart2() {
    return (
      <ApexChart
        type='area'
        series={[
          {
            name: '물가 평균',
            data: [3000, 1000, 2000, 6000, 8000, 500, 10000, 700],
          }
        ]}
        options={{
          chart: {
            height: 1000,
            width: 1000,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
          dataLabels: {
            enabled: false
          },
          labels: ['9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일',],
          xaxis: {
            type: 'category'
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value.toLocaleString()
              }
            }
          },
          colors: ['#5C5ACD']
        }}
      >
      </ApexChart>
    )
  }

  function Table() {
    const dumidata = [
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
      {
        date: '9월 7일',
        max_val: 6700,
        min_val: 3000,
        val: 5000,
      },
    ]
    return (
      <>
        <table width="500" height="300" align="center">
          <thead>
            <tr>
              <th>날짜(주중)</th>
              <th>최고가(원)</th>
              <th>최저가(원)</th>
              <th>평균가(원)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9월 7일</td>
              <td>3,500</td>
              <td>3,500</td>
              <td>3,500</td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td>9월 8일</td>
              <td>3,500</td>
              <td>3,500</td>
              <td>3,500</td>
            </tr>
            <tr>
              <td>9월 9일</td>
              <td>3,500</td>
              <td>3,500</td>
              <td>3,500</td>
            </tr>
            <tr>
              <td>9월 10일</td>
              <td>3,500</td>
              <td>3,500</td>
              <td>3,500</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <div>
      <Head>
        <title>물가분석 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <Image src={glass} alt='magnifying glass' quality={100} width={50} height={50} />
          <h1 className={styles.price_title}>물가분석</h1>
        </header>

        {/* 셀렉트 박스 */}
        <section className={styles.category}>
          <PriceSelectBox data={cat01} setState={setIsSelect01} title="부류" />
          <PriceSelectBox data={cat02} setState={setIsSelect02} title="품종" />
          <PriceSelectBox data={cat03} setState={setIsSelect03} title="품목" />
        </section>

        {/* 차트 섹션 */}
        <section className={styles.chart_section}>
          <h3>차트입니다</h3>
          <Chart1 />
        </section>
        <section>
          <article>
            <h3>차트이름</h3>
            <Chart2 />
          </article>
          <article>
            <Table />
          </article>
        </section>
      </main>
    </div>
  )
}