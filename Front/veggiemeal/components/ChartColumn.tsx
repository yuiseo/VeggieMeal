import styles from 'styles/ChartColumn.module.scss';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceDataProps {
  selectTitle?: any;
  priceData: any;
}
export default function ChartLine({ selectTitle, priceData }: PriceDataProps) {
  let maxPrice: any = priceData && priceData.map(({ max }: any) => max)
  let minPrice: any = priceData && priceData.map(({ min }: any) => min)
  let PriceDate: any = priceData && priceData.map(({ dealDate }: any) => dealDate.slice(4, 6) + '월 ' + dealDate.slice(6, 8) + '일')
  const realData: any[] = [
    {
      type: 'bar',
      name: '최저가',
      data: minPrice === undefined ? [1] : minPrice,
    },
    {
      type: 'bar',
      name: '최고가',
      data: maxPrice === undefined ? [1] : maxPrice,
    },
  ]

  return (
    <div className={styles.Container}>
      <ApexChart
        height={300}
        series={realData}
        options={{
          noData: {
            text: '데이터가 없어요',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '14px',
              fontFamily: 'SUIT Variable'
            }
          },

          chart: {
            // width: 300,
            // height: 300,
            zoom: {
              enabled: false
            },
            // type: 'bar',
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },

          plotOptions: {
            bar: {
              barHeight: '100%',
              columnWidth: '20%',
              horizontal: false,
              rangeBarOverlap: true,
              // borderRadius: 10,
              // dataLabels: {
              //   position: 'center',
              //   maxItems: 7,
              // }
            },
          },
          stroke: {
            width: 3
          },
          // dataLabels: {
          //   enabled: true,
          //   // formatter: function (val) {
          //   //   return val
          //   // },
          //   offsetY: -15,

          // },
          labels: PriceDate,
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            type: 'category',
            // min: PriceDate[0],
            // max: PriceDate[0],
            // max: 9,
          },
          yaxis: {
            max: function (max) {
              return Math.max(max) + 100
            },
            min: 0,
            forceNiceScale: true,
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            title: {
              text: "원/100g",
            },

            labels: {
              show: true,
              // padding: 1,
              // align: 'left',
              formatter: function (value) {
                return value.toLocaleString()
              }
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "원/100g"
              }
            }
          },
          colors: ['#29B973', '#5C5ACD'],
          title: {
            // text: `"${selectTitle}"의 최저가 및 최고가(원/100g)`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '23px',
              fontWeight: 'bold',
              fontFamily: 'SUIT Variable',
              color: '#263238'
            },
          },
        }
        }
      >
      </ApexChart>
    </div >
  )
}