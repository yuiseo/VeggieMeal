import styles from 'styles/ChartLine.module.scss';
import dynamic from 'next/dynamic';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceDataProps {
  priceData: any;
  selectTitle?: any;
}
export default function ChartColumn({ priceData, selectTitle }: PriceDataProps) {
  let priceList: any = priceData && priceData.map(({ price }: any) => price)
  let PriceDate: any = priceData && priceData.map(({ dealDate }: any) => dealDate.slice(4, 6) + '월 ' + dealDate.slice(6, 8) + '일')
  return (
    <div className={styles.Container}>
      <ApexChart
        height={400}
        type='area'
        series={[
          {
            name: '',
            data: priceList === undefined ? [1] : priceList,
          }
        ]}
        options={{
          chart: {
            zoom: {
              enabled: false
            },
            // height: 300,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
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
          dataLabels: {
            enabled: false
          },
          labels: PriceDate,
          xaxis: {
            type: 'category',
            position: 'bottom',
          },
          yaxis: {
            labels: {
              // padding: 1,
              formatter: function (value) {
                return value.toLocaleString()
              }
            },
            forceNiceScale: true,
            max: function (max) {
              return Math.max(max) + 1
            },
            title: {
              text: "원/100g",
              offsetX: -5,
              style: {
                fontFamily: 'SUIT Variable'
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
          colors: ['#5C5ACD'],
          // title: {
          //   text: `"${selectTitle}"의 평균 물가(원/100g)`,
          //   align: 'left',
          //   margin: 10,
          //   offsetX: 0,
          //   offsetY: 0,
          //   floating: false,
          //   style: {
          //     fontSize: '23px',
          //     fontFamily: 'SUIT Variable',
          //     fontWeight: 'bold',
          //     color: '#263238'
          //   },
          // }
        }}
      >
      </ApexChart >
    </div>
  )
}